import http from "http";
import WebSocket, { WebSocketServer } from "ws";
import GameManager from "./GameManager";

// Create a basic HTTP server to satisfy Render
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("WebSocket server is running");
});

const wss = new WebSocketServer({ server });

const gameManager = new GameManager();

wss.on("connection", (socket: WebSocket) => {
  console.log("Client connected");
  gameManager.addUser(socket);
  socket.on("close", () => {
    gameManager.removeUser(socket);
  });
});

// Use Render's assigned port
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
});
