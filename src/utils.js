export const getRandomInRange = (min, max) => {
  return Math.random() * (max - min) + min;
};

export const getRandomColor = () => {
  return '0x' + Math.floor(Math.random() * 16777215).toString(16);
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

// export const getDelateCordinate = () => {
//   bilHole = {
//     holeLT: {
//       x: 0,
//       y: 0,
//     },
//     holeMT: {
//       x: this.renderer.width / 2,
//       y: 0,
//     },
//     holeRT: {
//       x: this.renderer.width,
//       y: 0,
//     },
//     holeLB: {
//       x: 0,
//       y: this.renderer.height,
//     },
//     holeMT: {
//       x: this.renderer.width / 2,
//       y: this.renderer.height / 2,
//     },
//     holeRT: {
//       x: this.renderer.width,
//       y: this.renderer.height,
//     },
//   };
//   return bilHole;
// };
