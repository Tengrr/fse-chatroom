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
    const date = new Date();
    const message = await Message.create({
      senderId: "mattfeng2001",
      createTime: date,
      content: "content of this message",
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
