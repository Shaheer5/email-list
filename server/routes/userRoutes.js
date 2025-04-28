const userController = require("../controllers/userController");
const express = require("express");

const router = express.Router();

// Routes
router.route("/email-list").get(userController.getUsers);
router.route("/contact").post(userController.createUser);

module.exports = router;
