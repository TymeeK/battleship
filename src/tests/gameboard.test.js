const gameBoard = require('../logic/gameboard');

let game;
let ship;
let defaultBoard;

beforeEach(() => {
    game = gameBoard();
    ship = jest.fn().mockReturnValue({ length: 2 });
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
    ship = jest.fn().mockReturnValue({ length: 2 });
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
    expect(game.board).toBeTruthy();
});

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
    defaultBoard[3][4] = 1;
    defaultBoard[4][4] = 1;
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
    defaultBoard[0][0] = 1;
    defaultBoard[0][1] = 1;
    game.positionShip(false, 0, 0, ship());

    expect(game.board).toStrictEqual(defaultBoard);
});

it('Placing 2 ships on top of each other', () => {
    expect(game.board).toStrictEqual(defaultBoard);
    const fakeShip = jest.fn().mockReturnValue({ length: 2 });
    expect(fakeShip()).toBeTruthy();
    game.positionShip(true, 0, 0, fakeShip());
    expect(fakeShip).toHaveBeenCalled();
    defaultBoard[0][0] = 1;
    defaultBoard[1][0] = 1;

    expect(game.board).toStrictEqual(defaultBoard);
    game.positionShip(false, 0, 0, ship());
    expect(ship).toHaveBeenCalled();

    expect(game.board).toStrictEqual(defaultBoard);
});
