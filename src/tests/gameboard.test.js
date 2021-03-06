const gameBoard = require('../logic/gameboard');

let game;
let ship;
let defaultBoard;

beforeEach(() => {
    game = gameBoard();
    ship = jest.fn().mockReturnValue({ name: 'Destroyer', length: 2, hp: 2 });
    defaultBoard = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];
});

afterEach(() => {
    game = gameBoard();
    ship = jest.fn().mockReturnValue({ name: 'Destroyer', length: 2, hp: 2 });
    defaultBoard = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];

    game.board = [...defaultBoard];
});

it('Testing mock ship function', () => {
    const ship = jest.fn().mockReturnValue({ length: 4, hp: 4 });
    ship();
    expect(ship().hp).toBe(4);
    expect(ship().length).toBe(4);
});

it('Testing the coordinates', () => {
    expect(game.board).toStrictEqual(defaultBoard);
    expect(game.board).toBeTruthy();
});

describe('Testing positionShip function', () => {
    it('Placing a ship at a coordinate vertically', () => {
        expect(defaultBoard).toStrictEqual([
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ]);
        expect(game.board).toStrictEqual(defaultBoard);
        defaultBoard[3][4] = 2;
        defaultBoard[4][4] = 2;
        game.positionShip(true, 3, 4, ship());
        expect(game.board).toStrictEqual(defaultBoard);
    });

    it('Placing a ship at a coordinate horizontally', () => {
        expect(defaultBoard).toStrictEqual([
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ]);
        expect(game.board).toStrictEqual(defaultBoard);

        expect(ship().length).toBe(2);
        expect(game.board).toStrictEqual(defaultBoard);
        defaultBoard[0][0] = 2;
        defaultBoard[0][1] = 2;
        game.positionShip(false, 0, 0, ship());

        expect(game.board).toStrictEqual(defaultBoard);
    });

    it('Placing 2 ships on top of each other', () => {
        expect(game.board).toStrictEqual(defaultBoard);
        const fakeShip = jest.fn().mockReturnValue({ length: 2 });
        expect(fakeShip()).toBeTruthy();
        game.positionShip(true, 0, 0, fakeShip());
        expect(fakeShip).toHaveBeenCalled();
        defaultBoard[0][0] = 2;
        defaultBoard[1][0] = 2;

        expect(game.board).toStrictEqual(defaultBoard);
        game.positionShip(false, 0, 0, ship());
        expect(ship).toHaveBeenCalled();

        expect(game.board).toStrictEqual(defaultBoard);
    });
});

describe('Testing attack function', () => {
    it('Receiving an attack, miss and hit', () => {
        expect(game.board).toStrictEqual(defaultBoard);

        const fakeShip = jest.fn().mockReturnValue({ length: 3 });
        game.positionShip(false, 0, 0, fakeShip());
        expect(fakeShip).toHaveBeenCalled();

        defaultBoard[0][1] = 3;
        defaultBoard[0][2] = 3;
        defaultBoard[0][0] = 3;

        expect(game.board).toStrictEqual(defaultBoard);

        game.receiveAttack(0, 1);
        defaultBoard[0][1] = 'H';
        expect(game.board).toStrictEqual(defaultBoard);

        game.receiveAttack(1, 1);
        defaultBoard[1][1] = 'M';
        expect(game.board).toStrictEqual(defaultBoard);
    });

    it('Identify a ship that has been hit', () => {
        game.positionShip(false, 0, 0, ship());
        expect(ship).toHaveBeenCalled();

        defaultBoard[0][0] = 2;
        defaultBoard[0][1] = 2;

        const attackReceived = game.receiveAttack(0, 1);
        defaultBoard[0][1] = 'H';

        expect(game.board).toStrictEqual(defaultBoard);
        expect(game.shipList).toBeTruthy();
        expect(attackReceived).toBeTruthy();
        expect(game.shipList).toBeTruthy();
    });

    it('All ships are sunk', () => {
        game.positionShip(false, 0, 0, ship());
        defaultBoard[0][0] = 2;
        defaultBoard[0][1] = 2;

        expect(game.board).toStrictEqual(defaultBoard);
        game.receiveAttack(0, 0);
        game.receiveAttack(0, 1);
        ship().hp = 0;
        expect(game.isOver()).toBe(true);
    });
});
