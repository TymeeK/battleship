const player = () => {
    let rows;
    let col;
    return {
        set rows(row) {
            rows = row;
        },
        get rows() {
            return row;
        },
        set cols(col) {
            cols = col;
        },
        get cols() {
            return col;
        },
    };
};

module.exports = player;
