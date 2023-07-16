const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  sender: {
    type: String,
    required: [true, "a message must have a sender"],
  },
  createTime: {
    type: String,
    required: [true, "a message must have a createTime"],
  },
  content: {
    type: String,
    required: [true, "a message must have a content"],
  },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
