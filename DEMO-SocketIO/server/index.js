const http = require("http");
const express = require("express");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// API
app.get("/ping", (req, res) => {
  res.status(200).json("pong");
});

// Socket
const io = new Server(server, {
  cors: "*",
});

io.on("connection", (socket) => {
  console.log("socket connected");

  // Lắng nghe event từ client và nhận dữ liệu
  socket.on("greeting", (params) => {
    console.log(params);
    // Gửi event về lại cho client
    socket.emit("greeting", "OK");

    // Gửi event về cho toàn bộ clien đã kết nối tới socket
    // io.emit("greeting", "Hello")
  });

  socket.on("disconnect", (reason) => {
    console.log("Reason: ", reason);
  });
});

server.listen(4000);
