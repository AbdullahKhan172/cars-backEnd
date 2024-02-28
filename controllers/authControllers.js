const Users = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const AppError = require("../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token: token,
    data: {
      user,
    },
  });
};
exports.signUp = async (req, res, next) => {
  const newUser = await Users.create({
    email: req.body.email,
    password: req.body.password,
  });
  newUser.password = undefined;
  res.status(204).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ email });
  if (!user || !(await user.correctPassword(password, user.password))) {
    console.log("false pass");
  } else {
    createSendToken(user, 200, res);
  }
};

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new AppError("You are not logged in. Please log in to get access!!")
    );
  }

  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const freshUser = await User.findById(decode.id);

  req.user = freshUser;
  next();
};
