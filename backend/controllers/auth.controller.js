const User = require("../models/user.model");
const generateToken = require("../utils/generateToken");
const asyncHandler = require("../middleware/asyncHandler");

//user login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide email and password");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  res.status(200).json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    },
  });
});

//get current logged in user
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, data: req.user });
});

module.exports = { loginUser, getMe };
