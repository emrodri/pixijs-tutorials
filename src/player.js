// Sprite is our image on the stage
import { Sprite } from '@pixi/sprite';

export const createPlayerFrom = (resource) => {
  const player = Sprite.from(resource);

  player.anchor.set(0.5);
  return player;
};
