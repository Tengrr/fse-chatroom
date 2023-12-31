const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.route("/register").post(userController.register);
router.route("/login").post(userController.login);
router.route("/logout").get(userController.logout);

module.exports = router;
