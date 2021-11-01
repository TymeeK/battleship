const player = () => {
    let row;
    let col;
    return {
        set row(row) {
            this.row = row;
        },
        get row() {
            return row;
        },
        set col(col) {
            this.col = col;
        },
        get col() {
            return col;
        },
    };
};

module.exports = player;
