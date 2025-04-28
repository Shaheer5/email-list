const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  // Handle form submission logic here
  res.json({ status: "success", data: { name, email, message } });
});

// Export the app as a serverless function handler
module.exports = (req, res) => {
  app(req, res);
};
