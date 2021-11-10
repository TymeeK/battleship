const game = require('../logic/game');

const ui = () => {
    const gameBoardGrid = document.querySelectorAll('.gameboard');
    const gameLoop = game();
    const playerGameBoard = gameLoop.humanGameBoard;
    const shipList = [];

    function addSquares() {
        gameBoardGrid.forEach(board => {
            for (let i = 0; i < 64; i++) {
                const squares = document.createElement('div');
                squares.style.border = '1px solid black';
                squares.dataset.row = 0;
                squares.dataset.col = 0;
                squares.style.cursor = 'pointer';
                board.appendChild(squares);
            }
        });
    }

    function addData() {
        gameBoardGrid.forEach(board => {
            let row = 1;
            let col = 0;
            const children = board.childNodes;
            children.forEach(element => {
                col++;
                element.dataset.col = col;
                element.dataset.row = row;
                if (col % 8 == 0) {
                    row++;
                    col = 0;
                }
            });
        });
    }

    function addShipsToBoard() {
        const placeShipButton = document.querySelector('#placement');
        let i = 1;
        placeShipButton.addEventListener('click', () => {
            if (i == 5) {
                //Remove event listeners and start game
            }
            const rowInput = document.querySelector('#row');
            const colInput = document.querySelector('#col');
            const vertCheckBox = document.querySelector('#align');
            const ship = gameLoop.createShip(i);

            const gameBoardState = playerGameBoard.positionShip(
                vertCheckBox.checked,
                rowInput.value - 1,
                colInput.value - 1,
                ship
            );
            console.log(gameBoardState);
            if (gameBoardState) {
                i++;
                placeShips();
            } else {
                console.log('Please enter a coordinate unoccupied by a ship');
            }
        });
    }

    function placeShips() {
        const playerGrid = document.querySelector('#player-board');
        let row = 0;
        let col = 0;
        playerGrid.childNodes.forEach(child => {
            if (
                playerGameBoard.board[row][col] != 0 &&
                child.dataset.row == row + 1 &&
                child.dataset.col == col + 1
            ) {
                child.style.backgroundColor = 'yellow';
                child.style.cursor = 'pointer';
            }
            col++;
            if (col % 8 == 0) {
                col = 0;
                row++;
            }
        });
    }

    function addMouseListener() {
        const aiGrid = document.querySelector('#ai-board');

        aiGrid.childNodes.forEach(child => {
            child.addEventListener('mouseenter', mouseOverListener);
            child.addEventListener('mouseleave', mouseLeaveListener);
            child.addEventListener('click', mouseClickListener);

            function mouseOverListener() {
                child.style.backgroundColor = 'pink';
            }
            function mouseLeaveListener() {
                child.style.backgroundColor = 'transparent';
            }

            function mouseClickListener(event) {
                const isHit = gameLoop.playRound(
                    child.dataset.row,
                    child.dataset.col
                );
                if (isHit) {
                    event.target.style.backgroundColor = '#90EE90';
                } else {
                    event.target.style.backgroundColor = '#ff726f';
                    console.log(gameLoop.currentPlayer);
                }
                event.target.style.cursor = 'default';
                child.removeEventListener('mouseenter', mouseOverListener);
                child.removeEventListener('mouseleave', mouseLeaveListener);
                child.removeEventListener('click', mouseClickListener);
            }
        });
    }

    return {
        initializeUI: () => {
            addSquares();
            addShipsToBoard();
            addData();
        },
    };
};

export { ui };
