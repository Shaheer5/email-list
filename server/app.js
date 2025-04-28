const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const userRouter = require("./routes/userRoutes");

const app = express();

// Middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// CORS configuration
app.use(
  cors({
    origin: "https://email-list-weld.vercel.app" || "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body parser
app.use(express.json({ limit: "10kb" }));


// Router
app.use("/api/v1", userRouter);

// Base route for health check
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is up and running! 🚀" });
});

// Handling unhandled routes (operational errors)
app.all("*", (req, res, next) => {
  next(new Error(`The request ${req.originalUrl} is not found on server`));
});

module.exports = app;
