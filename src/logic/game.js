const player = require('./player');
const gameBoard = require('./gameboard');
const ship = require('./ship');

const gameLoop = () => {
    const humanPlayer = player();
    const aiPlayer = player();
    const humanGameBoard = gameBoard();
    const aiGameBoard = gameBoard();
    let currentPlayer = 1;

    return {
        playerTurn: () => {},
        initializeLoop: () => {
            while (game) {
                if (currentPlayer == 1) {
                    humanPlayer.row = 1;
                    humanPlayer.col = 2;
                } else {
                }
            }
        },
        get currentPlayer() {
            return currentPlayer;
        },
    };
};

module.exports = gameLoop;
