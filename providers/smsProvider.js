const send = async (phone, otp) => {
    console.log(`SMS sent to ${phone}: ${otp}`);
};

module.exports = { send };