const ship = require('./ship');

const gameBoard = () => {
    let gameBoard = [];
    const shipList = [];
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
        positionShip: (vertical, row, column, ship) => {
            if (vertical) {
                for (let i = 0; i < ship.length; i++) {
                    gameBoard[row].splice(column, 1, 1);
                    row++;
                }
            } else {
                for (let i = 0; i < ship.length; i++) {
                    gameBoard[row][column] = 1;
                    column++;
                }
            }
        },

        get shipList() {
            return shipList;
        },
    };
};

module.exports = gameBoard;
