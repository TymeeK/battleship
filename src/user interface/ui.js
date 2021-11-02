const ui = () => {
    const gameBoardGrid = document.querySelectorAll('.gameboard');
    const addData = function () {
        const gridSquares = document.querySelectorAll('div[data-row]');
        let row = 1;
        let col = 0;
        gridSquares.forEach(element => {
            col++;
            element.dataset.col = col;
            element.dataset.row = row;
            if (col % 8 == 0) {
                row++;
                col = 0;
            }
        });
    };
    return {
        addSquares: () => {
            gameBoardGrid.forEach(board => {
                for (let i = 0; i < 64; i++) {
                    const squares = document.createElement('div');
                    squares.style.border = '1px solid black';
                    squares.dataset.row = 0;
                    squares.dataset.col = 0;
                    board.appendChild(squares);
                }
            });
        },
        addDataSet: () => {
            addData();
        },
    };
};

export { ui };
