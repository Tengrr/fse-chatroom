const dotenv = require("dotenv");
const mongoose = require("mongoose");
const http = require("http");
const socketIo = require("socket.io");

dotenv.config({ path: "./config.env" });

const app = require("./app");

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("message", async (message) => {
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const DB = process.env.DATABASE;

console.log(process.env.DATABASE);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongodb successfully connected!"));

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
