import { Sprite } from '@pixi/sprite';
import { rectsIntersect } from './collisions';

const BULLET_SPEED = 10;

export const bullets = {
  bullets: [],
  initOn: function (container, app, sprite, target) {
    container.addEventListener('pointerdown', () =>
      bullets.fireBullet(app, sprite)
    );
    app.ticker.add((delta) => updateBullets(this.bullets));
    app.ticker.add((delta) => checkBullestHits(this.bullets, target));
  },
  fireBullet: function (app, sprite) {
    let bullet = createBullet(app, sprite);
    bullets.bullets.push(bullet);
  },
};

const updateBullets = (bullets) => {
  updateBulletsPosition(bullets);
  bullets = removeOffScreenBulletsFrom(bullets);
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

const checkBullestHits = (bullets, target) => {
  bullets.map((bullet) => {
    if (rectsIntersect(bullet, target)) {
      console.log('impact');
      bullet.y = -1;
    }
  });
};
