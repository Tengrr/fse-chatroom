const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Please create a username"],
  },
  password: {
    type: String,
    required: [true, "Please create a password"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords must be equal",
    },
  },
});

userSchema.path("username").validate(async function (value) {
  const user = await this.constructor.findOne({ username: value });

  if (user) {
    this.invalidate("username", "Username already exists");
  }
}, "username");

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);

  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
