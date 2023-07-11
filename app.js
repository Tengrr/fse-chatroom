const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const messageRouter = require("./routes/messageRoutes");
const viewRouter = require("./routes/viewRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use("/api/messages", messageRouter);
app.use("/", viewRouter);
app.use("/", userRouter);

module.exports = app;
