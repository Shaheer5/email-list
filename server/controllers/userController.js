const User = require("../models/userModel");

// 1. Getting all users controller
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: "success",
      users: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

// 2. Creating new User
exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body)

    // Return success response
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
