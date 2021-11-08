const player = require('./player');
const gameBoard = require('./gameboard');
const ship = require('./ship');

const gameLoop = () => {
    const humanPlayer = player();
    const aiPlayer = player();
    const humanGameBoard = gameBoard();
    const aiGameBoard = gameBoard();
    let currentPlayer = humanPlayer;

    function placeDefaultShips() {
        for (let i = 0; i < 5; i++) {
            const playerShip = ship(i + 1);
            aiGameBoard.positionShip(true, 0, i, playerShip);
        }
    }

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    }

    function playRoundAi() {
        currentPlayer = aiPlayer;
        const aiRow = getRandomIntInclusive(0, 7);
        const aiCol = getRandomIntInclusive(0, 7);
        aiPlayer.rows = aiRow;
        aiPlayer.cols = aiCol;
        const isHitAi = humanGameBoard.receiveAttack(aiRow, aiCol);
        if (isHitAi) {
            playRoundAi();
        }
    }
    placeDefaultShips();

    return {
        playRound: (row, column) => {
            currentPlayer = humanPlayer;
            const isHit = aiGameBoard.receiveAttack(row - 1, column - 1);
            console.table(aiGameBoard.board);

            if (isHit) {
                return true;
            } else {
                playRoundAi();
            }
        },
        get currentPlayer() {
            return currentPlayer;
        },

        get aiGameBoard() {
            return aiGameBoard;
        },
        get humanGameBoard() {
            return humanGameBoard;
        },
        createShip: hp => {
            const newShip = ship(hp);
            return newShip;
        },
    };
};

module.exports = gameLoop;
