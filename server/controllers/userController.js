const fs = require("fs");
const path = require("path");
const validator = require('validator');

// Define file path using path.join for cross-platform compatibility
const dbPath = path.join(__dirname, "../data/db.json");

// Fetching users synchronously
const getDbData = () => {
  try {
    return JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  } catch (error) {
    // If file doesn't exist or is empty, return empty array
    if (error.code === "ENOENT" || error.message.includes("Unexpected end")) {
      return [];
    }
    throw error;
  }
};

// 1. Getting all users controller
exports.getUsers = async (req, res) => {
  try {
    const users = getDbData();

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
    const users = await getDbData();

    // Validate the email field using validator
    const { name, email, message } = req.body;
    const errors = {};

    // Check if name is present
    if (!name || name.trim() === "") {
      errors.name = "Name is required";
    }

    // Validate email format
    if (!email || email.trim() === "") {
      errors.email = "Email is required";
    } else if (!validator.isEmail(email)) {
      errors.email = "Please enter a valid email address";
    }

    // Check if message is present
    if (!message || message.trim() === "") {
      errors.message = "Message is required";
    }

    // If there are errors, respond with them
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        status: "fail",
        errors,
      });
    }

    // Generate new ID (handle empty array case)
    let newId = 1;
    if (users.length > 0) {
      newId = users[users.length - 1].id + 1;
    }

    // Create new user
    const newUser = Object.assign({ id: newId }, req.body);

    // Add newUser to the users array
    users.push(newUser);

    // Writing users to the json file using promises
    await fs.promises.writeFile(dbPath, JSON.stringify(users, null, 2));

    // Return success response
    res.status(201).json({
      status: "success",
      data: {
        newUser,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
