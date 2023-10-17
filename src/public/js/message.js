import { io } from "socket.io-client";

const socket = io();
const input = document.getElementById("chatbox");
const sendMessageBtn = document.getElementById("sendMessageBtn");
const messageList = document.getElementById("messageList");

sendMessageBtn.addEventListener("click", () => {
  const message = input.value;
  socket.emit("message2", message); // Envía el mensaje al servidor
  input.value = ""; // Limpia el campo de entrada
});

socket.on("log", (data) => {
  // Muestra los mensajes recibidos en la lista de mensajes
  const messageItem = document.createElement("li");
  messageItem.textContent = data.log;
  messageList.appendChild(messageItem);
});


export { socket };
