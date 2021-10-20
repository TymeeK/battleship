const ship = require('../logic/ship');
let battleship;

beforeEach(() => {
    battleship = ship(4);
    battleship.hp = [1, 1, 1, 1];
});

afterEach(() => {
    battleship = ship(4);
    battleship.hp = [1, 1, 1, 1];
});

it('Ship has full health', () => {
    expect(battleship.hp).toStrictEqual([1, 1, 1, 1]);
});

it('Ship has a sunk boolean', () => {
    expect(battleship.isSunk()).toBeDefined();
});

it('Ship has a length', () => {
    expect(battleship.length).toBeTruthy();
});

it('Ship is hit at a certain location', () => {
    battleship.hit(3);
    battleship.hit(0);
    expect(battleship.hp).toStrictEqual([0, 1, 1, 0]);
});

it('Ship is hit multiple times', () => {
    battleship.hit(1);
    battleship.hit(0);
    battleship.hit(2);
    expect(battleship.hp).toStrictEqual([0, 0, 0, 1]);
});

it('Ship is dead', () => {
    battleship.hit(0);
    battleship.hit(1);
    battleship.hit(2);
    battleship.hit(3);
    expect(battleship.isSunk()).toBeTruthy();
});
