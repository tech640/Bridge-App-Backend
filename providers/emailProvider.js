const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendEmailOtp = async (email, otp) => {
    await transporter.sendMail({
        from: `"Bridge App" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Your OTP Code",
        text: `Your verification code is: ${otp}`,
        html: `
            <div style="font-family: Arial;">
                <h2>Bridge App Verification</h2>
                <p>Your OTP code is:</p>
                <h1>${otp}</h1>
                <p>This code expires in 2 minutes.</p>
            </div>
        `
    });

    console.log(`Email sent to ${email}`);
};

module.exports = { sendEmailOtp };