const express = require("express");
const router = express.Router();

const {
    checkUser,
    register,
    login,
    refresh,
  } = require("../controllers/authController");
  
  router.post("/check-user", checkUser);
  router.post("/register", register);
  router.post("/login", login);
  router.post("/refresh", refresh);
  module.exports = router;