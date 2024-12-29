import { Chess } from "chess.js";
import { boardType, GAME_OVER, INIT_GAME, MOVE } from "../../constants";
import { Chessboard } from "../components/Chessboard"
import { useState, useEffect } from "react"

export const Game=()=>{
    const [socket, setSocket]=useState<WebSocket | null>(null);
    const [chess, setChess]=useState<Chess>(new Chess());
    const [board, setBoard]=useState<boardType>(new Chess().board());
    const [ clicked, setIsclicked]=useState<boolean>(false)
    useEffect(()=>{
        const ws=new WebSocket('ws://localhost:3000');
        ws.onopen=()=>{
            console.log("connected");
            setSocket(ws);
            ws.send(JSON.stringify({
                msg:"Hello Server from Client"
            }));
        }
        ws.onclose=()=>{
            console.log("Disconnected");
            setSocket(null);

        }
        ws.onmessage=(event)=>{
            const message=JSON.parse(event.data);
            if(message.type==INIT_GAME){
                setChess(new Chess());
                setBoard(chess.board());
            }
            if(message.type==MOVE){
                chess.move({from:message.payload.from, to:message.payload.to});
                setBoard(chess.board());
                console.log("Move made");
            }
            if(message.type===GAME_OVER){
                console.log("Game Over ")
                return;
            }
        }
    }, []);
    console.log(chess.board())

    return (
        <div className=" bg-black w-full min-h-screen justify-center flex p-8">
            <div className="  w-full grid grid-cols-1 lg:grid-cols-6 md:gap-4 ">
                <div className=" lg:col-span-4 flex justify-center items-center h-full w-full bg-gray-400 rounded-2xl">
                    <Chessboard board={board} socket={socket} ></Chessboard>
                </div>
                <div className=" lg:col-span-2  flex justify-center items-center">
                    <button onClick={()=>{
                        socket?.send(JSON.stringify({
                            type:INIT_GAME
                        }));
                        if(socket) setIsclicked(true);

                    }} className= {` px-4 py-2 font-semibold text-4xl rounded-lg ${
                        clicked
                          ? "bg-slate-400 text-gray-500 cursor-not-allowed" // Disabled style
                          : "bg-white text-slate-900 hover:bg-slate-200"    // Normal style
                      }`}>Play</button>
                </div>
            </div>
        </div>  
    )
}