import { WebSocket } from "ws";
import { Chess } from "chess.js";
import { GAME_OVER, INIT_GAME, MOVE, moveType } from "./constants";


export default class Game {
    public player1: WebSocket;
    public player2: WebSocket;
    private moves: moveType[];
    private startTime: Date | string;
    private chess: Chess

    constructor(player1: WebSocket, player2: WebSocket){
        this.player1=player1;
        this.player2=player2;
        this.moves=[];
        this.startTime=new Date();
        this.chess=new Chess();
        this.player1.send(JSON.stringify({
            type:INIT_GAME,
            payload:{
                color:"White"
            }
        }));
        this.player2.send(JSON.stringify({
            type:INIT_GAME,
            payload:{
                color:"Black"
            }
        }));
    }

    makeMove(player: WebSocket, move: moveType){
        if((this.moves.length%2===0 && player===this.player2)){
            player.send(JSON.stringify({
                msg:"You are not the one to make a move"
            }));
            return;
        }
        if((this.moves.length%2!==0 && player===this.player1)){
            player.send(JSON.stringify({
                msg:"You are not the one to make a move"
            }));
            return
        }
        let result=null;
        try{
            result=this.chess.move({from:move.from, to:move.to});
            this.moves.push(move)
        }
        catch(err){
            console.log(err);
            player.send(JSON.stringify({
                msg:"You are making an invalid Move"
            }))
        }
 
        if(this.chess.isGameOver()){
            this.player1.send(JSON.stringify({
                type:GAME_OVER,
                payload:{
                    winner:player==this.player1 ? "White" : "Black"
                }
            }))
            this.player2.send(JSON.stringify({
                type:GAME_OVER,
                payload:{
                    winner:player==this.player1 ? "White" : "Black "
                }
            }));
            return;
        }

        if(player===this.player1){
            this.player2.send(JSON.stringify({
                type:MOVE,
                payload:move
            }));
            this.player1.send(JSON.stringify({
                type:MOVE,
                payload:move
            }));
        }
        if(player===this.player2){
            this.player1.send(JSON.stringify({
                type:MOVE,
                payload:move
            }));
            this.player2.send(JSON.stringify({
                type:MOVE,
                payload:move
            }));
        }
    }
}