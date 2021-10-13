export const CircleCount = () => {
  const circleCount = 15;
  return circleCount;
};

export const getCircleCordinate = (x, y) => {
  let firstX = x;
  let firstY = y;
  let counter = 0;
  const arr = [];
  for (let i = 5; i > 0; i--) {
    firstY;
    for (let j = i; j > 0; j--) {
      arr.push({ x: 0, y: 0 });
      arr[counter].x = firstX;
      arr[counter].y = firstY;
      counter++;
      firstY -= 60;
    }
    firstX -= 52;
    firstY += 60 * i - 30;
  }
  return arr;
};

export const getHolesCordinate = () => {
  const holes = [
    {
      x: 0,
      y: 0,
    },
    {
      x: 0.5,
      y: 0,
    },
    {
      x: 1,
      y: 0,
    },
    {
      x: 0,
      y: 1,
    },
    {
      x: 0.5,
      y: 1,
    },
    {
      x: 1,
      y: 1,
    },
  ];
  return holes;
};
