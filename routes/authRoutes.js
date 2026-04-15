const express = require("express");
const router = express.Router();

const {
    checkUser,
    register,
    login,
    refresh,
    requestOtp,
    verifyOtp,
  } = require("../controllers/authController");
  
  router.post("/check-user", checkUser);
  router.post("/register", register);
  router.post("/login", login);
  router.post("/refresh", refresh);
  //OTP
  router.post('/request', requestOtp);
  router.post('/verify', verifyOtp);

  module.exports = router;