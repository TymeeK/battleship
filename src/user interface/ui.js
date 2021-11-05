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
                const colorSquare = gameLoop.playRound(
                    child.dataset.row,
                    child.dataset.col
                );
                if (colorSquare) {
                    event.target.style.backgroundColor = '#90EE90';
                } else {
                    event.target.style.backgroundColor = '#ff726f';
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
            addData();
            addMouseListener();
        },
    };
};

export { ui };
