const express = require("express");
const viewController = require("../controllers/viewController");

const router = express.Router();

router.route("/chatroom").get(viewController.getChatroom);

module.exports = router;
