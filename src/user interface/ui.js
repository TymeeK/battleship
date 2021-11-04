const game = require('../logic/game');

const ui = () => {
    const gameBoardGrid = document.querySelectorAll('.gameboard');
    const gameLoop = game();

    function addSquares() {
        gameBoardGrid.forEach(board => {
            for (let i = 0; i < 64; i++) {
                const squares = document.createElement('div');
                squares.style.border = '1px solid black';
                squares.dataset.row = 0;
                squares.dataset.col = 0;
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
                if (row == 8 && col == 8) {
                    row = 0;
                    col = 0;
                }
            });
        });
    }

    function addMouseListener() {
        const aiGrid = document.querySelector('#ai-board');
        aiGrid.childNodes.forEach(child => {
            child.addEventListener('click', event => {
                const colorSquare = gameLoop.playRound(
                    child.dataset.row,
                    child.dataset.col
                );
                event.target.style.backgroundColor = 'green';
            });
            child.addEventListener('mouseenter', () => {
                child.style.backgroundColor = 'pink';
            });
            child.addEventListener('mouseleave', () => {
                child.style.backgroundColor = 'transparent';
            });
        });
    }

    return {
        initializeUI: () => {
            addSquares();
            addData();
            addMouseListener();
        },
    };
};

export { ui };
