const dotenv = require("dotenv");
const mongoose = require("mongoose");
const http = require("http");
const socketIo = require("socket.io");

dotenv.config({ path: "./config.env" });

const app = require("./app");

const server = http.createServer(app);

const DB = process.env.DATABASE_DEV;
// const DB = process.env.DATABASE_PROD;

console.log(DB);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongodb successfully connected!"));

const port = process.env.PORT || 3000;

server.listen(port, () => {
  // server.listen(port, "192.168.1.2", () => {
  console.log(`App is running on port ${port}...`);
});

const io = socketIo(server);

io.on("connection", (socket) => {
  // console.log("New client connected");

  socket.on("message", async (message) => {
    io.emit("message", message);
  });

  // socket.on("disconnect", () => {
  //   console.log("Client disconnected");
  // });
});
