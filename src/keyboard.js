export const keyboard = {
  keysPressed: [],
  init: function (app, sprite) {
    window.addEventListener('keydown', ({ key }) => keyboard.onKeyPress(key));
    window.addEventListener('keyup', ({ key }) => keyboard.onKeyRelease(key));
    app.ticker.add(() => this.moveSprite(sprite));
  },
  onKeyPress: function (key) {
    this.keysPressed[key] = true;
  },
  onKeyRelease: function (key) {
    this.keysPressed[key] = false;
  },
  moveSprite: function (sprite) {
    const moves = moveStrategies.filter((s) => s.check() === true);
    moves.map((move) => move.move(sprite));
  },
};

const moveUpStrategy = {
  check: () => keyboard.keysPressed['w'] === true,
  move: (sprite) => (sprite.y = sprite.y - 5),
};
const moveDownStrategy = {
  check: () => keyboard.keysPressed['s'] === true,
  move: (sprite) => (sprite.y = sprite.y + 5),
};
const moveLeftStrategy = {
  check: () => keyboard.keysPressed['a'] === true,
  move: (sprite) => (sprite.x = sprite.x - 5),
};
const moveRightStrategy = {
  check: () => keyboard.keysPressed['d'] === true,
  move: (sprite) => (sprite.x = sprite.x + 5),
};
const moveStrategies = [
  moveUpStrategy,
  moveDownStrategy,
  moveRightStrategy,
  moveLeftStrategy,
];
