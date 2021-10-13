import { CircleCount } from './gameConfig';

export class Circle extends PIXI.Graphics {
  constructor(color) {
    super();
  }
  _buildCircle() {
    this.circles = [];
    for (let i = 0; i <= CircleCount(); i++) {
      const graphic = new PIXI.Graphics();
      if (i === 0) {
        graphic.lineStyle(5, 0x333333);
        graphic.beginFill(0x444444);
      } else {
        graphic.lineStyle(5, 0x888888);
        graphic.beginFill(0x999999);
      }
      graphic.drawCircle(0, 0, 30);
      graphic.closePath();
      graphic.endFill();
      this.circles.push(graphic);
      this.circles[i].velocity = {
        x: 0,
        y: 0,
      };
    }
  }
}
