import { Sprite } from '@pixi/sprite';

const BULLET_SPEED = 10;

export const bullets = {
  bullets: [],
  initOn: function (container, app, player) {
    container.addEventListener('pointerdown', () =>
      bullets.fireBullet(app, player)
    );
  },
  fireBullet: function (app, player) {
    let bullet = createBullet(app, player);
    bullets.bullets.push(bullet);
  },
  updateBullets: function () {
    updateBulletsPosition(this.bullets);
    this.bullets = removeOffScreenBulletsFrom(this.bullets);
  },
};

const createBullet = (app, player) => {
  let bullet = Sprite.from(app.loader.resources.bullet.texture);
  bullet.anchor.set(0.5);
  bullet.x = player.x;
  bullet.y = player.y;
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
