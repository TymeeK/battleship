const ship = require('./ship');

const gameBoard = () => {
    let board = [];
    const shipList = [];
    //When a gameBoard piece is empty, the value will be 0
    const createGameBoard = function () {
        for (let row = 0; row < 8; row++) {
            board[row] = new Array();
            for (let column = 0; column < 8; column++) {
                board[row].push(0);
            }
        }
    };

    const identifyShip = function (hitShip) {
        switch()
    };

    createGameBoard();
    return {
        addShip: length => {
            return ship(4);
        },
        get board() {
            return board;
        },
        //Vertical is a boolean
        positionShip: (isVertical, row, column, ship) => {
            shipList.push(ship);
            const previousGameBoardState = [...board];
            for (let i = 0; i < ship.length; i++) {
                if (board[row][column] != 0) {
                    board = [...previousGameBoardState];
                    break;
                }

                board[row][column] = ship.length;

                if (isVertical) {
                    row++;
                } else {
                    column++;
                }
            }
        },

        receiveAttack: (row, column) => {
            //TODO: I need to somehow keep track of each ship object
            //H stands for hit
            if (board[row][column] != 0) {
                identifyShip(board[row][column]);
                board[row][column] = 'H';
            }
            //M stands for miss
            else if (board[row][column] == 0) {
                board[row][column] = 'M';
            }
        },

        get shipList() {
            return shipList;
        },
    };
};

module.exports = gameBoard;
