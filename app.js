const express = require("express");
const path = require("path");

const messageRouter = require("./routes/messageRoutes");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/messages", messageRouter);

module.exports = app;
