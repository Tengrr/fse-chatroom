const express = require("express");
const path = require("path");

const messageRouter = require("./routes/messageRoutes");
const viewRouter = require("./routes/viewRoutes");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/messages", messageRouter);
app.use("/", viewRouter);

module.exports = app;
