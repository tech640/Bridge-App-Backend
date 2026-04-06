const userModel = require("../models/userModel");
const authModel = require("../models/authModel");
const jwtUtils = require("../utils/jwt");

// login (بدون OTP حالياً)
const login = async (req, res) => {
  try {
    const { name, phone, role_id } = req.body;

    let user = await userModel.findUserByPhone(phone);

    if (!user) {
      user = await userModel.createUser(name, phone, role_id);
    }

    const accessToken = jwtUtils.generateAccessToken(user);
    const refreshToken = jwtUtils.generateRefreshToken(user);

    await authModel.saveRefreshToken(user.id, refreshToken);

    res.json({ accessToken, refreshToken, user });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// refresh token
const refresh = async (req, res) => {
  try {
    const { token } = req.body;

    const stored = await authModel.findToken(token);
    if (!stored) return res.sendStatus(403);

    const decoded = require("jsonwebtoken").verify(
      token,
      process.env.JWT_SECRET
    );

    const newAccess = jwtUtils.generateAccessToken({ id: decoded.id });

    res.json({ accessToken: newAccess });

  } catch {
    res.sendStatus(403);
  }
};

module.exports = { login, refresh };