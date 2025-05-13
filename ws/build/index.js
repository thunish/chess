"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const ws_1 = require("ws");
const GameManager_1 = __importDefault(require("./GameManager"));
// Create a basic HTTP server to satisfy Render
const server = http_1.default.createServer((req, res) => {
    res.writeHead(200);
    res.end("WebSocket server is running");
});
const wss = new ws_1.WebSocketServer({ server });
const gameManager = new GameManager_1.default();
wss.on("connection", (socket) => {
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
