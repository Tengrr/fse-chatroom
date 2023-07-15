const Message = require("../models/messageModel");

exports.getChatroom = async (req, res) => {
  const messages = await Message.find();
  messages.forEach((message) => {
    message.timeString = formatDate(message.createTime);
  });

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

const formatDate = (date) => {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return date
    .toLocaleString("en-US", options)
    .replace(/\//g, ".")
    .replace(",", " ");
};
