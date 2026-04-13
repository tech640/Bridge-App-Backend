const otpService = require("../services/otpService");
const authModel = require("../models/authModel");
const jwt = require("jsonwebtoken");

const requestOtp = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        await otpService.sendOtp(email);

        return res.json({
            success: true,
            message: "OTP sent to email"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP required"
            });
        }

        await otpService.verifyOtp(email, otp);

        let user = await authModel.getUserByEmail(email);

        if (!user) {
            user = await authModel.createUserByEmail(email);
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.json({
            success: true,
            message: "Login successful",
            token
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = { requestOtp, verifyOtp };