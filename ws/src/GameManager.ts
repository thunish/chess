import { WebSocket } from "ws";
import  Game  from "./Game";
import { INIT_GAME, MOVE } from "./constants";


export default class GameManager{
    private games: Game[];
    private users: WebSocket[];
    private pendingUser: WebSocket | null

    constructor(){
        this.games=[];
        this.pendingUser=null;
        this.users=[];
    }
    
    addUser(player: WebSocket): void {
        this.users.push(player);
        console.log('Player connected')
        this.addHandler(player);
    }

    removeUser(player: WebSocket): void {
        this.users=this.users.filter((each)=> each!==player);
    }

    private addHandler(player: WebSocket){
        player.on('message', (data: string)=>{
            const message=JSON.parse(data.toString());
            if(message.type===INIT_GAME){
                if(!this.pendingUser){
                    this.pendingUser=player;
                    player.send(JSON.stringify({
                        msg:"You are the first one to arrive"
                    }));
                }
                else{
                    const game=new Game(this.pendingUser, player);
                    this.pendingUser=null;
                    this.games.push(game);
                }
            }

            if(message.type===MOVE){
                const game: Game | undefined=this.games.find(each=>each.player2===player || each.player1===player);
                if(!game){
                    console.log("game not initialized yet")
                    return;
                }
                game!.makeMove(player, message.move);
            }
        })
    }
}