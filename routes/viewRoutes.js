const express = require("express");
const viewController = require("../controllers/viewController");
const userController = require("../controllers/userController");

const router = express.Router();

router
  .route("/chatroom")
  .get(userController.checkLogin, viewController.getChatroom);
router.route("/register").get(viewController.registerPage);
router.route("/login").get(viewController.loginPage);

module.exports = router;
