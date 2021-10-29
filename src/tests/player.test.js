const player = require('../logic/player');

it('Testing player row and column', () => {
    player.row = 4;
    player.col = 5;
    expect(player.row).toBe(4);
    expect(player.col).toBe(5);
});
