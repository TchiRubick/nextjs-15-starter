type Direction = 'up' | 'down' | 'left' | 'right';

const OFFSET = 40;

const getAxisOffset = (direction: Direction, axis: 'x' | 'y'): number => {
  if (axis === 'x' && (direction === 'left' || direction === 'right')) {
    return direction === 'left' ? OFFSET : -OFFSET;
  }
  if (axis === 'y' && (direction === 'up' || direction === 'down')) {
    return direction === 'up' ? OFFSET : -OFFSET;
  }
  return 0;
};

export const fadeIn = (direction: Direction, delay: number) => {
  return {
    hidden: {
      y: getAxisOffset(direction, 'y'),
      opacity: 0,
      x: getAxisOffset(direction, 'x'),
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 1.2,
        delay: delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };
};
