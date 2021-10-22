const ship = (hitPoints = 0) => {
    let hp = [];
    let name = '';

    const createShipArray = function () {
        for (let i = 0; i < hitPoints; i++) {
            hp.push(1);
        }
    };
    createShipArray();
    return {
        isSunk: () => {
            return hp.every(value => value === 0);
        },
        hit: hit => {
            hp[hit] = 0;
        },
        get length() {
            return hp.length;
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
