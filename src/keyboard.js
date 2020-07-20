export const keyboard = {
  keysPressed: [],
  init: function (app, sprite, sheet) {
    window.addEventListener('keydown', ({ key }) => keyboard.onKeyPress(key));
    window.addEventListener('keyup', ({ key }) => keyboard.onKeyRelease(key));
    app.ticker.add(() => this.moveSprite(sprite, sheet));
  },
  onKeyPress: function (key) {
    this.keysPressed[key] = true;
  },
  onKeyRelease: function (key) {
    this.keysPressed[key] = false;
  },
  moveSprite: function (sprite, sheet) {
    const moves = moveStrategies.filter((s) => s.check() === true);
    moves.map((move) => move.move(sprite, sheet));
  },
};

const moveUpStrategy = {
  check: () => keyboard.keysPressed['w'] === true,
  move: (sprite, sheet) => {
    sprite.y = sprite.y - 5;
    if (!sprite.playing) {
      sprite.textures = sheet.walkNorth;
      sprite.play();
    }
  },
};
const moveDownStrategy = {
  check: () => keyboard.keysPressed['s'] === true,
  move: (sprite, sheet) => {
    if (!sprite.playing) {
      sprite.textures = sheet.walkSouth;
      sprite.play();
    }
    sprite.y = sprite.y + 5;
  },
};
const moveLeftStrategy = {
  check: () => keyboard.keysPressed['a'] === true,
  move: (sprite, sheet) => {
    if (!sprite.playing) {
      sprite.textures = sheet.walkWest;
      sprite.play();
    }
    sprite.x = sprite.x - 5;
  },
};
const moveRightStrategy = {
  check: () => keyboard.keysPressed['d'] === true,
  move: (sprite, sheet) => {
    if (!sprite.playing) {
      sprite.textures = sheet.walkEast;
      sprite.play();
    }
    sprite.x = sprite.x + 5;
  },
};
const moveStrategies = [
  moveUpStrategy,
  moveDownStrategy,
  moveRightStrategy,
  moveLeftStrategy,
];
