import { Sprite } from '@pixi/sprite';

const BULLET_SPEED = 10;

export const bullets = {
  bullets: [],
  initOn: function (container, app, sprite) {
    container.addEventListener('pointerdown', () =>
      bullets.fireBullet(app, sprite)
    );
    app.ticker.add((delta) => this.updateBullets());
  },
  fireBullet: function (app, sprite) {
    let bullet = createBullet(app, sprite);
    bullets.bullets.push(bullet);
  },
  updateBullets: function () {
    updateBulletsPosition(this.bullets);
    this.bullets = removeOffScreenBulletsFrom(this.bullets);
  },
};

const createBullet = (app, sprite) => {
  let bullet = Sprite.from(app.loader.resources.bullet.texture);
  bullet.anchor.set(0.5);
  bullet.x = sprite.x;
  bullet.y = sprite.y;
  bullet.speed = BULLET_SPEED;
  app.stage.addChild(bullet);
  return bullet;
};

const updateBulletsPosition = (bullets) => {
  bullets.map((bullet) => {
    bullet.position.y -= bullet.speed;
    bullet.inScreen = bullet.position.y > 0 ? true : false;
  });
};

const removeOffScreenBulletsFrom = (bullets) => {
  return [...bullets.filter((bullet) => bullet.inScreen)];
};
