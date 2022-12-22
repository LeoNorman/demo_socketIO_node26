// Client
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

const socket = io("ws://localhost:4000");

// Mở kết nối socket tới server
socket.on("connection", () => {
  console.log("connected");

  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});

// Click button greeting
document.getElementById("greeting").addEventListener("click", () => {
  // Gửi dữ liệu lên server
  // emit(eventName, ...rest)
  socket.emit("greeting", "Hello Nodejs 26");
});

// Ngắt kết nối socket tới server
document.getElementById("disconnect").addEventListener("click", () => {
  socket.disconnect()
});

// Lắng nghe event từ server gửi về
socket.on("greeting", (params) => {
  console.log("Event greeting server -> client:", params);
});
