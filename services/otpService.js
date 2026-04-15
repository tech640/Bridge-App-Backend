const emailProvider = require("../providers/emailProvider");

const otpStore = new Map();

const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendOtp = async (email) => {
    const otp = generateOtp();

    otpStore.set(email, {
        otp,
        expiresAt: Date.now() + 2 * 60 * 1000
    });

    await emailProvider.sendEmailOtp(email, otp);

    return true;
};

const verifyOtp = async (email, otp) => {
    const record = otpStore.get(email);

    if (!record) throw new Error("OTP not found");

    if (Date.now() > record.expiresAt) {
        otpStore.delete(email);
        throw new Error("OTP expired");
    }

    if (record.otp !== otp) throw new Error("Invalid OTP");

    otpStore.delete(email);
    return true;
};

module.exports = { sendOtp, verifyOtp };