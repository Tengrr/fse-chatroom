const Message = require("../models/messageModel");

exports.getChatroom = async (req, res) => {
  const messages = await Message.find();
  messages.forEach((message) => {
    message.timeString = formatDate(message.createTime);
  });

  console.log(messages);

  res.status(200).render("chatroom", {
    title: "All messages",
    messages,
  });
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
