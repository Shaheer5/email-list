const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    validate: [validator.isEmail, "Please provide a valid email"],
    trim: true,
  },
  message: {
    type: String,
    required: [true, "Please type your message"],
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
