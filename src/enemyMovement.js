const speed = 5;
export const enemyMovement = {
  direction: speed,
  init: function (app, sprite) {
    app.ticker.add((delta) => {
      this.enemyStep(sprite, app);
    });
  },
  enemyStep: function (sprite, app) {
    if (this.direction < 0 && sprite.x < 16) {
      this.direction = speed;
    }
    if (this.direction > 0 && sprite.x > app.view.width - 16) {
      this.direction = -1 * speed;
    }
    sprite.x += this.direction;
  },
};
