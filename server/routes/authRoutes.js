const express = require("express");

const {
  signupUser,
  loginUser,
} = require("../controllers/authController");

const router = express.Router();


// SIGNUP
router.post("/signup", signupUser);

// LOGIN
router.post("/login", loginUser);

module.exports = router;