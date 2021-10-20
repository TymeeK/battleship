const ship = require('./ship');

const gameBoard = () => {
    let gameBoard = [];
    //When a gameBoard piece is empty, the value will be 0
    const createGameBoard = function () {
        for (let row = 0; row < 8; row++) {
            gameBoard[row] = new Array();
            for (let column = 0; column < 8; column++) {
                gameBoard[row].push(0);
            }
        }
    };
    createGameBoard();
    return {
        addShip: length => {
            return ship(4);
        },
        get board() {
            return gameBoard;
        },
        //Vertical is a boolean
        positionShip: (vertical, row, column) => {
            addShip();
            if (vertical) {
                for (let i = 0; i < shipLength; i++) {
                    gameBoard[row][column] = 1;
                    row++;
                }
            }
        },
    };
};

module.exports = gameBoard;
