const express = require("express");
const carController = require("../controllers/carControllers");
const authController = require("../controllers/authControllers");
const router = express.Router();

router.use(authController.protect);
router
  .route("/")
  .post(
    carController.uploadImage,
    carController.converToBase64,
    carController.newCar
  );
module.exports = router;
