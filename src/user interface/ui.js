const ui = () => {
    const gameBoardGrid = document.querySelectorAll('.gameboard');
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
        const gridSquares = document.querySelectorAll('div[data-row]');

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
        const
        // child.forEach(element => {
        //     element.addEventListener('click', event => {
        //         const target = event.target;
        //         console.log(target);
        //     });

        //     element.addEventListener('mouseenter', event => {
        //         const target = event.target;
        //         target.style.backGroundColor = 'pink;';
        //     });
        // });

        aiGrid.addEventListener('click', event => {
            console.log(event.target);
        });

        // aiGrid.addEventListener('mouseenter', event => {
        //     console.log(event.target);
        // });
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
