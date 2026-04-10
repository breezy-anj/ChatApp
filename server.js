const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join room", (roomName) => {
    socket.join(roomName);
    console.log(`User ${socket.id} joined room: ${roomName}`);

    socket
      .to(roomName)
      .emit("message", `A new user joined the ${roomName} room.`);
  });

  socket.on("chat message", ({ room, msg }) => {
    io.to(room).emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(7001, () =>
  console.log("Server running on http://localhost:7001"),
);
