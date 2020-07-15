export const moveToPointer = (sprite, pointerMoveEvent) => {
  const pos = pointerMoveEvent.data.global;
  moveToPos(sprite, pos);
};

export const moveToCenter = (sprite, container) => {
  const pos = {
    x: container.view.width / 2,
    y: container.view.height / 2,
  };
  moveToPos(sprite, pos);
};

export const moveToPos = (sprite, pos) => {
  sprite.x = pos.x;
  sprite.y = pos.y;
};
