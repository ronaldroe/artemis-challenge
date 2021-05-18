const calcMoveSpeed = (canvasWidth, multiplier = 1) => {
  const baseSpeed = 85 * 2 * multiplier;
  const baseWidth = 800;

  return (baseSpeed * canvasWidth) / baseWidth;
};

const getRandomValue = (max) => {
  return Math.round(Math.random() * max);
};

export { calcMoveSpeed, getRandomValue };
