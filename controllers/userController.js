const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
  };

  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.register = async (req, res) => {
  try {
    newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    createSendToken(newUser, 201, res);
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

exports.login = async (req, res) => {
  username = req.body.username;
  password = req.body.password;

  if (!username || !password) {
    res.status(400).json({
      status: "fail",
      message: "Please provide username and password",
    });
    return;
  }

  const user = await User.findOne({ username });

  if (!user || !(await user.correctPassword(password, user.password))) {
    res.status(401).json({
      status: "fail",
      message: "Incorrect username or password",
    });
    return;
  }

  createSendToken(user, 200, res);
};
