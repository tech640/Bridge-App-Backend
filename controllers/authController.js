const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const authModel = require("../models/authModel");
const jwtUtils = require("../utils/jwt");

// ✅ CHECK USER
const checkUser = async (req, res) => {
  const { email, phone } = req.body;

  try {
    const user = await userModel.findUserByEmailOrPhone(email, phone);

    res.json({ exists: !!user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ REGISTER
const register = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      gender_preference,
      date_of_birth,
    } = req.body;

    const existing = await userModel.findUserByEmailOrPhone(email, phone);
    if (existing) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await userModel.createUser({
      name,
      email,
      phone,
      password: hashed,
      gender_preference,
      date_of_birth,
    });

    const accessToken = jwtUtils.generateAccessToken(user);
    const refreshToken = jwtUtils.generateRefreshToken(user);

    await authModel.saveRefreshToken(user.id, refreshToken);

    res.json({ user, accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ LOGIN
const login = async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    const user = await userModel.findUserByEmailOrPhone(email, phone);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(400).json({ error: "Wrong password" });
    }

    const accessToken = jwtUtils.generateAccessToken(user);
    const refreshToken = jwtUtils.generateRefreshToken(user);

    await authModel.saveRefreshToken(user.id, refreshToken);

    res.json({ user, accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ REFRESH
const refresh = async (req, res) => {
  try {
    const { token } = req.body;

    const stored = await authModel.findToken(token);
    if (!stored) return res.sendStatus(403);

    const decoded = require("jsonwebtoken").verify(
      token,
      process.env.JWT_SECRET
    );

    const newAccess = jwtUtils.generateAccessToken({
      id: decoded.id,
      role_id: decoded.role,
    });

    res.json({ accessToken: newAccess });
  } catch {
    res.sendStatus(403);
  }
};

module.exports = {
  checkUser,
  register,
  login,
  refresh,
};