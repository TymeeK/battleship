const ship = (hitPoints = 0) => {
    let hp = hitPoints;
    let name = '';
    const length = hp;

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
    };
};

// function ship() {
//     return 'Hello World';
// }

module.exports = ship;
