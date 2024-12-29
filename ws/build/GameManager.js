"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = __importDefault(require("./Game"));
const constants_1 = require("./constants");
class GameManager {
    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }
    addUser(player) {
        this.users.push(player);
        console.log('Player connected');
        this.addHandler(player);
    }
    removeUser(player) {
        this.users = this.users.filter((each) => each !== player);
    }
    addHandler(player) {
        player.on('message', (data) => {
            const message = JSON.parse(data.toString());
            if (message.type === constants_1.INIT_GAME) {
                if (!this.pendingUser) {
                    this.pendingUser = player;
                    player.send(JSON.stringify({
                        msg: "You are the first one to arrive"
                    }));
                }
                else {
                    const game = new Game_1.default(this.pendingUser, player);
                    this.pendingUser = null;
                    this.games.push(game);
                }
            }
            if (message.type === constants_1.MOVE) {
                const game = this.games.find(each => each.player2 === player || each.player1 === player);
                if (!game) {
                    console.log("game not initialized yet");
                    return;
                }
                game.makeMove(player, message.move);
            }
        });
    }
}
exports.default = GameManager;
