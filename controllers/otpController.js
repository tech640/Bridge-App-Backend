const otpService = require('../services/otpService');
const authModel = require('../models/authModel');
const jwt = require('jsonwebtoken');

/**
 * 1) REQUEST OTP
 */
const requestOtp = async (req, res) => {
    try {
        const { phone } = req.body;

        console.log("BODY:", req.body);

        if (!phone) {
            return res.status(400).json({
                success: false,
                message: "Phone is required"
            });
        }

        // توليد OTP
        const otp = await otpService.sendOtp(phone);

        console.log(`OTP for ${phone}: ${otp}`);

        return res.json({
            success: true,
            message: "OTP sent successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


/**
 * 2) VERIFY OTP
 */
const verifyOtp = async (req, res) => {
    try {
        const { phone, otp } = req.body;

        if (!phone || !otp) {
            return res.status(400).json({
                success: false,
                message: "Phone and OTP are required"
            });
        }

        // تحقق من OTP
        await otpService.verifyOtp(phone, otp);

        // جلب أو إنشاء user
        let user = await authModel.getUserByPhone(phone);

        if (!user) {
            user = await authModel.createUserByPhone(phone);
        }

        // JWT token
        const token = jwt.sign(
            {
                id: user.id,
                phone: user.phone
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
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


module.exports = {
    requestOtp,
    verifyOtp
};