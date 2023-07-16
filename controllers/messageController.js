const Message = require("../models/messageModel");

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find();

    res.status(200).json({
      status: "success",
      results: messages.length,
      data: {
        messages,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

exports.createMessage = async (req, res) => {
  try {
    const date = formatDate(new Date());
    const message = await Message.create({
      sender: req.user.username,
      createTime: date,
      content: req.body.message,
    });

    res.status(201).json({
      status: "success",
      data: {
        message: message,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
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
