const Message = require("../models/messageModel");

exports.getChatroom = async (req, res) => {
  const messages = await Message.find();

  res.status(200).render("chatroom", {
    title: "All messages",
    messages,
  });
};
