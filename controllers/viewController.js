const Message = require("../models/messageModel");

exports.getChatroom = async (req, res) => {
  const messages = await Message.find().sort({ _id: 1 });

  res.status(200).render("chatroom", {
    title: "All messages",
    messages,
  });
};

exports.registerPage = async (req, res) => {
  res.redirect("/register.html");
};

exports.loginPage = async (req, res) => {
  res.redirect("/index.html");
};
