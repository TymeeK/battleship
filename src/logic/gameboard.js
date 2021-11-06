const ship = require('./ship');

const gameBoard = () => {
    let board = [];
    let shipList = [];
    //When a gameBoard piece is empty, the value will be 0
    const createGameBoard = function () {
        for (let row = 0; row < 8; row++) {
            board[row] = new Array();
            for (let column = 0; column < 8; column++) {
                board[row].push(0);
            }
        }
    };

    const updateBoard = function (ship) {
        return (ship = ship == 0 ? (ship = 'M') : (ship = 'H'));
    };

    const identifyShip = function (ship) {
        return shipList.find(object => object.length == ship);
    };

    const checkAllShips = function () {
        return shipList.every(ship => ship.isSunk());
    };

    createGameBoard();
    return {
        get board() {
            return board;
        },
        positionShip: (isVertical, row, column, ship) => {
            shipList.push(ship);
            const previousGameBoardState = [...board];
            for (let i = 0; i < ship.length; i++) {
                if (board[row][column] != 0) {
                    board = [...previousGameBoardState];
                    break;
                }

                board[row][column] = ship.length;
                isVertical ? row++ : column++;
            }
        },

        receiveAttack: (row, column) => {
            const shipObject = board[row][column];
            board[row][column] = updateBoard(board[row][column]);

            if (shipObject != 0) {
                const hitShip = identifyShip(shipObject);
                hitShip.hit();
                checkAllShips();
                return true;
            } else return false;
        },

        get shipList() {
            return shipList;
        },
    };
};

module.exports = gameBoard;
