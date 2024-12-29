import { boardType, MOVE } from "../../constants";
import bBishop from "../../assets/images/bBishop.png";
import bKing from "../../assets/images/bKing.png";
import bKnight from "../../assets/images/bKnight.png";
import bPawn from "../../assets/images/bPawn.png";
import bRook from "../../assets/images/bRook.png";
import bQueen from "../../assets/images/bQueen.png";
import wBishop from "../../assets/images/wBishop.png";
import wKing from "../../assets/images/wKing.png";
import wKnight from "../../assets/images/wKnight.png";
import wPawn from "../../assets/images/wPawn.png";
import wRook from "../../assets/images/wRook.png";
import wQueen from "../../assets/images/wQueen.png";
import { useState } from "react";
import { Square } from "chess.js";


export  const Chessboard = ({board, socket}:{
    board: boardType,
    socket:WebSocket | null
}) => {
    const [from, setFrom]=useState<null | Square>(null);
    return(
        <div>
            {board.map((row, i)=>{
                return (
                    <div key={i} className=" flex flex-row">
                        {row.map((square, j)=>{
                            const isDark=((i+j)%2)===1;
                            const bgColor=isDark?"bg-green-600":'bg-green-300';
                            
                            let piece;
                            if(square){
                                if(square.color=='b'){
                                    if(square.type=='r') piece=bRook
                                    if(square.type=='n') piece=bKnight
                                    if(square.type=='b') piece=bBishop
                                    if(square.type=='q') piece=bQueen
                                    if(square.type=='k') piece=bKing
                                    if(square.type=='p') piece=bPawn
                                }
                                if(square.color=='w'){
                                    if(square.type=='r') piece=wRook
                                    if(square.type=='n') piece=wKnight
                                    if(square.type=='b') piece=wBishop
                                    if(square.type=='q') piece=wQueen
                                    if(square.type=='k') piece=wKing
                                    if(square.type=='p') piece=wPawn
                                }
                            }
                            return(
                                <div key={j} onClick={()=>{
                                    if(!from){
                                        let fr: any=String.fromCharCode((97)+(j))+""+String(8-(i));
                                        setFrom(fr);
                                    }
                                    else{
                                        let fr: any=String.fromCharCode((97)+(j))+""+String(8-i);
                                        console.log(fr);
                                        socket?.send(JSON.stringify({
                                            type:MOVE,
                                            move:{
                                                from:from,
                                                to:fr
                                            }
                                        }));
                                        console.log(from, "from");
                                        setFrom(null);
                                    }
                                }} className={` md:w-20 md:h-20 h-12 w-12  p-2 flex justify-center items-center cursor-pointer ${bgColor}`}>
                                    <img src={piece} className={`square? md:h-10 md:w-10:`} alt="" />
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}