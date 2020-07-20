import { BaseTexture, Texture, resources } from '@pixi/core';

import { AnimatedSprite } from '@pixi/sprite-animated';
import { Rectangle } from '@pixi/math';
// Sprite is our image on the stage
import { Sprite } from '@pixi/sprite';

export const createPlayerFrom = (resource) => {
  const player = Sprite.from(resource);

  player.anchor.set(0.5);
  return player;
};

export const createPlayerFromSheet = (resource) => {
  const player = new AnimatedSprite(resource.standSouth);
  player.anchor.set(0.5);
  player.animationSpeed = 0.3;
  player.loop = false;
  player.play();
  return player;
};

export const createPlayerSheet = (resource) => {
  const source = new BaseTexture.from(resource);
  const w = 32;
  const h = 32;
  const playerSheet = [];
  playerSheet['standSouth'] = [new Texture(source, new Rectangle(0, 0, w, h))];
  playerSheet['standNorth'] = [
    new Texture(source, new Rectangle(1 * w, 1 * h, w, h)),
  ];
  playerSheet['standWest'] = [
    new Texture(source, new Rectangle(1 * w, 2 * h, w, h)),
  ];
  playerSheet['standEast'] = [
    new Texture(source, new Rectangle(1 * w, 3 * h, w, h)),
  ];

  playerSheet['walkSouth'] = [
    new Texture(source, new Rectangle(1 * w, 0, w, h)),
    new Texture(source, new Rectangle(0, 0, w, h)),
    new Texture(source, new Rectangle(2 * w, 0, w, h)),
  ];

  playerSheet['walkNorth'] = [
    new Texture(source, new Rectangle(1 * w, 1 * h, w, h)),
    new Texture(source, new Rectangle(0, 1 * h, w, h)),
    new Texture(source, new Rectangle(2 * w, 1 * h, w, h)),
  ];

  playerSheet['walkEast'] = [
    new Texture(source, new Rectangle(1 * w, 3 * h, w, h)),
    new Texture(source, new Rectangle(0, 3 * h, w, h)),
    new Texture(source, new Rectangle(2 * w, 3 * h, w, h)),
  ];

  playerSheet['walkWest'] = [
    new Texture(source, new Rectangle(1 * w, 2 * h, w, h)),
    new Texture(source, new Rectangle(0, 2 * h, w, h)),
    new Texture(source, new Rectangle(2 * w, 2 * h, w, h)),
  ];

  return playerSheet;
};
