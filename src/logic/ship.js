const ship = (hitPoints = 0) => {
    let hp = hitPoints;
    let name = '';
    const length = hp;
    let isVertical = true;

    return {
        isSunk: () => {
            return hp == 0 ? true : false;
        },
        hit: () => {
            hp--;
        },
        get length() {
            return length;
        },
        get hp() {
            return hp;
        },
        set name(name) {
            this.name = name;
        },
        get name() {
            return this.name;
        },
        set vertical(vertical) {
            isVertical = vertical;
        },
        get vertical() {
            return isVertical;
        },
    };
};

// function ship() {
//     return 'Hello World';
// }

module.exports = ship;
