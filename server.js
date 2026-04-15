const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join room", ({ username, roomName }) => {
    socket.join(roomName);
    console.log(`User ${username} joined room: ${roomName}`);

    socket
      .to(roomName)
      .emit("message", { username: "System", msg: `${username} joined the ${roomName} room.` });
  });

  socket.on("chat message", ({ room, username, msg }) => {
    io.to(room).emit("message", { username, msg });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(7001, () =>
  console.log("Server running on http://localhost:7001"),
);
