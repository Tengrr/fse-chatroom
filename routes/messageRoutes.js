const express = require("express");
const messageController = require("../controllers/messageController");
const userController = require("../controllers/userController");

const router = express.Router();

router
  .route("/")
  .get(messageController.getAllMessages)
  .post(userController.checkLogin, messageController.createMessage);

module.exports = router;
