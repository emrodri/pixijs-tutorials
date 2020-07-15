// Sprite is our image on the stage
import { Sprite } from '@pixi/sprite';

export const createPlayer = () => {
  const player = new Sprite.from('assets/example.png');
  
  player.anchor.set(0.5);
  return player;
};
