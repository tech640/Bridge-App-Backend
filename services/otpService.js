const otpStore = new Map();

const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendOtp = async (phone) => {
    const otp = generateOtp();

    otpStore.set(phone, {
        otp,
        expiresAt: Date.now() + 2 * 60 * 1000
    });

    return otp;
};

const verifyOtp = async (phone, otp) => {
    const record = otpStore.get(phone);

    if (!record) {
        throw new Error('OTP not found');
    }

    if (Date.now() > record.expiresAt) {
        otpStore.delete(phone);
        throw new Error('OTP expired');
    }

    if (record.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    otpStore.delete(phone);
    return true;
};

module.exports = {
    sendOtp,
    verifyOtp
};