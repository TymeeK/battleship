const player = require('./player');
const gameBoard = require('./gameboard');
const ship = require('./ship');

const gameLoop = () => {
    const humanPlayer = player();
    const aiPlayer = player();
    const humanGameBoard = gameBoard();
    const aiGameBoard = gameBoard();
    let currentPlayer = humanPlayer;

    function placeAiShips() {
        for (let i = 0; i < 5; i++) {
            const aiShip = ship(i + 1);
            aiGameBoard.positionShip(true, 0, i, aiShip);
        }
    }

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    }

    placeAiShips();
    return {
        playRound: (row, column) => {
            const isHit = aiGameBoard.receiveAttack(row - 1, column - 1);
            console.table(aiGameBoard.board);

            if (isHit) {
                console.log("Still the player's turn");
                return true;
            }
            currentPlayer = aiPlayer;
            const aiRow = getRandomIntInclusive(0, 7);
            const aiCol = getRandomIntInclusive(0, 7);
            const isHitAi = humanGameBoard.receiveAttack(aiRow, aiCol);
            console.table(humanGameBoard.board);
        },
        get currentPlayer() {
            return currentPlayer;
        },
    };
};

module.exports = gameLoop;
