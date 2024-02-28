const express = require("express");
const Users = require("../models/userModel");
const authController = require("../controllers/authControllers");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.route("/signUp").post(authController.signUp);
router.route("/login").post(authController.login);

module.exports = router;
