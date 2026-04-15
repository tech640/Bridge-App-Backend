const axios = require("axios");

const send = async (phone, otp) => {
    console.log("API KEY =", process.env.SMS_API_KEY);

    try {
        const message = `Your Bridge verification code is: ${otp}`;

        const response = await axios.post(
            "https://restapi.easysendsms.app/v1/rest/sms/send",
            {
                to: phone,
                text: message,
                type: "0"
            },
            {
                headers: {
                    apikey: process.env.SMS_API_KEY?.trim(),
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            }
        );

        console.log("SMS SUCCESS:", response.data);
        return response.data;

    } catch (error) {
        console.log("SMS ERROR:", error.response?.data || error.message);
        throw error;
    }
};

module.exports = { send };