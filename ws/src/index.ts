import WebSocket, { WebSocketServer } from "ws";
import GameManager from "./GameManager";


const wss=new WebSocketServer({
    port:3000
});

const gameManager= new GameManager();

wss.on('connection', (socket: WebSocket)=>{
    gameManager.addUser(socket);
    socket.on('close', ()=>{
        gameManager.removeUser(socket);
    });
});

console.log('Done');