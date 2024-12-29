"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chess_js_1 = require("chess.js");
const constants_1 = require("./constants");
class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.moves = [];
        this.startTime = new Date();
        this.chess = new chess_js_1.Chess();
        this.player1.send(JSON.stringify({
            type: constants_1.INIT_GAME,
            payload: {
                color: "White"
            }
        }));
        this.player2.send(JSON.stringify({
            type: constants_1.INIT_GAME,
            payload: {
                color: "Black"
            }
        }));
    }
    makeMove(player, move) {
        if ((this.moves.length % 2 === 0 && player === this.player2)) {
            player.send(JSON.stringify({
                msg: "You are not the one to make a move"
            }));
            return;
        }
        if ((this.moves.length % 2 !== 0 && player === this.player1)) {
            player.send(JSON.stringify({
                msg: "You are not the one to make a move"
            }));
            return;
        }
        let result = null;
        try {
            result = this.chess.move({ from: move.from, to: move.to });
            this.moves.push(move);
        }
        catch (err) {
            console.log(err);
            player.send(JSON.stringify({
                msg: "You are making an invalid Move"
            }));
        }
        if (this.chess.isGameOver()) {
            this.player1.send(JSON.stringify({
                type: constants_1.GAME_OVER,
                payload: {
                    winner: player == this.player1 ? "White" : "Black"
                }
            }));
            this.player2.send(JSON.stringify({
                type: constants_1.GAME_OVER,
                payload: {
                    winner: player == this.player1 ? "White" : "Black "
                }
            }));
            return;
        }
        if (player === this.player1) {
            this.player2.send(JSON.stringify({
                type: constants_1.MOVE,
                payload: move
            }));
            this.player1.send(JSON.stringify({
                type: constants_1.MOVE,
                payload: move
            }));
        }
        if (player === this.player2) {
            this.player1.send(JSON.stringify({
                type: constants_1.MOVE,
                payload: move
            }));
            this.player2.send(JSON.stringify({
                type: constants_1.MOVE,
                payload: move
            }));
        }
    }
}
exports.default = Game;
