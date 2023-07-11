const User = require("../models/userModel");

exports.register = async (req, res) => {
  try {
    newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    res.status(201).json({
      status: "success",
      data: newUser,
    });
  } catch (error) {
    let message;
    if (error.errors?.username?.message) {
      message = error.errors.username.message;
    } else if (error.errors?.passwordConfirm?.message) {
      message = error.errors.passwordConfirm.message;
    } else {
      message = error.message;
    }
    res.status(500).json({
      status: "fail",
      message: message,
    });
  }
};
