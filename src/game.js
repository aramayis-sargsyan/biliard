import * as PIXI from 'pixi.js';
import { getCircleCordinate, getHolesCordinate } from './gameConfig';

export class Game extends PIXI.Application {
  constructor() {
    super({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x009334,
    });
    this.bul = false;
    this.mouseStart = {
      x: 0,
      y: 0,
    };

    this.mouseEnd = {
      x: 0,
      y: 0,
    };

    document.body.appendChild(this.view);

    this.ticker.add(this._update, this);
    this.ticker.start();

    this.loader.onComplete.add(this._onLoadComplete, this);
    this.loader.load();
  }

  _onLoadComplete() {
    this._drawHoles();
    this._drawGraphics();
    this._createCircle();
    this._createCircles();
    this._setCircleListeners();
  }

  _drawGraphics() {
    this.circles = [];
    for (let i = 0; i <= 15; i++) {
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

  _drawHoles() {
    this.holes = [];
    for (let i = 0; i < getHolesCordinate().length; i++) {
      const graphic = new PIXI.Graphics();
      graphic.lineStyle(5, 0x222222);
      graphic.beginFill(0x333333);
      if (getHolesCordinate()[i].x === 0.5) {
        graphic.drawCircle(0, 0, 32);
      } else graphic.drawCircle(0, 0, 45);
      graphic.closePath();
      graphic.endFill();
      this.holes.push(graphic);
      this.holes[i].position.x = getHolesCordinate()[i].x * this.renderer.width;
      this.holes[i].position.y = getHolesCordinate()[i].y * this.renderer.height;
      this.stage.addChild(this.holes[i]);
    }
  }

  _createCircle() {
    this._positionCircle();
    this.stage.addChild(this.circles[0]);
  }

  _createCircles() {
    let indexCircle = getCircleCordinate((this.renderer.width * 3) / 4 + 208, this.renderer.height / 2 + 90 + 30);
    for (let i = 1; i <= 15; i++) {
      this._positionCircles(i, indexCircle);
      this.stage.addChild(this.circles[i]);
    }
  }

  _positionCircle() {
    this.circles[0].position.set((this.renderer.width * 1) / 4, this.renderer.height / 2);
  }

  _positionCircles(i, indexCircle) {
    this.circles[i].position.x = indexCircle[i - 1].x;
    this.circles[i].position.y = indexCircle[i - 1].y;
  }

  _checkWorldBounds(circle) {
    if (circle.position.x >= this.renderer.width - circle.width / 2) {
      circle.velocity.x = -Math.abs(circle.velocity.x);
    } else if (circle.position.x <= circle.width / 2) {
      circle.velocity.x = Math.abs(circle.velocity.x);
    } else if (circle.position.y >= this.renderer.height - circle.height / 2) {
      circle.velocity.y = -Math.abs(circle.velocity.y);
    } else if (circle.position.y <= circle.width / 2) {
      circle.velocity.y = Math.abs(circle.velocity.y);
    }
  }

  _deleteCircle(circle, index) {
    if (index === 0) {
      let cordinateX = prompt('x - ', (this.renderer.width * 1) / 4);
      this.circles[index].position.x = (this.renderer.width * 1) / 4;
      let cordinateY = prompt('y - ', this.renderer.height / 2);
      this.circles[index].position.y = this.renderer.height / 2;
      this.circles[index].velocity = {
        x: 0,
        y: 0,
      };
      console.log(7);
    } else {
      this.circles.splice(index, 1);
      circle.destroy();
    }
  }

  _checkCollision(circle1, circle2) {
    return Math.sqrt(
      Math.pow(circle2.position.x - circle1.position.x, 2) + Math.pow(circle2.position.y - circle1.position.y, 2)
    );
  }

  _checkCirclesCollision() {
    for (let i = 0; i < this.circles.length; i++) {
      for (let k = 0; k < 6; k++) {
        let holeDistance = this._checkCollision(this.circles[i], this.holes[k]);
        if (this.holes[k].width / 2 >= holeDistance) {
          this._deleteCircle(this.circles[i], i);
          return;
        }
      }
      this._checkWorldBounds(this.circles[i]);
      for (let j = i + 1; j < this.circles.length; j++) {
        const distance = this._checkCollision(this.circles[i], this.circles[j]);
        if ((this.circles[i].width + this.circles[j].width) / 2 >= distance) {
          this._resolveCollision(this.circles[i], this.circles[j]);
        }
      }
    }
  }

  _resolveCollision(circle1, circle2) {
    if (
      Math.abs(circle1.velocity.x) + Math.abs(circle1.velocity.y) > 0 ||
      Math.abs(circle2.velocity.x) + Math.abs(circle2.velocity.y > 0)
    ) {
      const xVelocityDiff = circle1.velocity.x - circle2.velocity.x;
      const yVelocityDiff = circle1.velocity.y - circle2.velocity.y;
      const distance = this._checkCollision(circle1, circle2);
      const xDist = circle2.position.x - circle1.position.x;
      const yDist = circle2.position.y - circle1.position.y;
      let VCollisionNorm = { x: xDist / distance, y: yDist / distance };
      let speed = xVelocityDiff * VCollisionNorm.x + yVelocityDiff * VCollisionNorm.y;
      if (speed >= 0) {
        circle1.velocity.x -= 0.9 + speed * VCollisionNorm.x;
        circle1.velocity.y -= 0.9 + speed * VCollisionNorm.y;
        circle2.velocity.x = 0.9 + speed * VCollisionNorm.x;
        circle2.velocity.y = 0.9 + speed * VCollisionNorm.y;
      }
    }
  }

  _drawLine() {
    const pathLine = new PIXI.Graphics();
    pathLine.lineStyle(3, 0x222222);
    pathLine.moveTo(this.mouseStart.x, this.mouseStart.y);
    pathLine.lineTo(this.mouseEnd.x, this.mouseEnd.y);
    this.pathLine = pathLine;
    this.stage.addChildAt(this.pathLine, 0);
  }

  _drawArrow() {
    const pathLine = new PIXI.Graphics();
    pathLine.lineStyle(3, 0x222222);
    pathLine.moveTo(this.mouseStart.x, this.mouseStart.y);
    pathLine.lineTo(
      (5 / 4) * this.mouseStart.x - this.mouseEnd.x / 4,
      (5 / 4) * this.mouseStart.y - this.mouseEnd.y / 4
    );

    this.pathLineArrow = pathLine;
    this.stage.addChildAt(this.pathLineArrow, 0);
  }

  _calculateVelocity() {
    this.circles[0].velocity.x = (this.mouseStart.x - this.mouseEnd.x) / 20;
    this.circles[0].velocity.y = (this.mouseStart.y - this.mouseEnd.y) / 20;
  }

  _moveCircle() {
    for (let i = 0; i < this.circles.length; i++) {
      this.circles[i].position.x += this.circles[i].velocity.x;
      this.circles[i].position.y += this.circles[i].velocity.y;
      let distance = Math.sqrt(Math.pow(this.circles[i].velocity.x, 2) + Math.pow(this.circles[i].velocity.y, 2));
      if (this.circles[i].velocity.x > 0) {
        this.circles[i].velocity.x -= Math.abs(this.circles[i].velocity.x) / distance / 10;
      } else if (this.circles[i].velocity.x < 0) {
        this.circles[i].velocity.x += Math.abs(this.circles[i].velocity.x) / distance / 10;
      }
      if (this.circles[i].velocity.x < 0.1 && this.circles[i].velocity.x > -0.1) {
        this.circles[i].velocity.x = 0;
      }
      if (this.circles[i].velocity.y > 0) {
        this.circles[i].velocity.y -= Math.abs(this.circles[i].velocity.y) / distance / 10;
      } else if (this.circles[i].velocity.y < 0) {
        this.circles[i].velocity.y += Math.abs(this.circles[i].velocity.y) / distance / 10;
      }
      if (this.circles[i].velocity.y < 0.1 && this.circles[i].velocity.y > -0.1) {
        this.circles[i].velocity.y = 0;
      }
      if (this.circles[0].velocity.x === 0 && this.circles[0].velocity.y === 0) {
        this.circles[0].interactive = true;
      }
    }
  }

  _setCircleListeners() {
    this.circles[0]
      .on('pointerdown', this._onClickStart, this)
      .on('pointerup', this._onClickEnd, this)
      .on('pointerupoutside', this._onClickOutside, this);
  }

  _onClickStart(e) {
    this.mouseStart.x = this.circles[0].position.x;
    this.mouseStart.y = this.circles[0].position.y;
    this.mouseEnd.x = e.data.global.x;
    this.mouseEnd.y = e.data.global.y;
    this.circles[0].on('pointermove', this._onClickMove, this);
    this._drawLine();
    this._drawArrow();
  }

  _onClickEnd(e) {
    this.circles[0].off('pointermove', this._onClickMove, this);
    this.pathLine.clear();
    this.pathLineArrow.clear();
  }

  _onClickOutside() {
    this.circles[0].interactive = false;
    this.circles[0].off('pointermove', this._onClickMove, this);
    this.pathLine.clear();
    this.pathLineArrow.clear();
    this._calculateVelocity();
    this._moveCircle();
    this._checkCirclesCollision();
  }

  _onClickMove(e) {
    this.mouseEnd.x = e.data.global.x;
    this.mouseEnd.y = e.data.global.y;
    this.pathLine.clear();
    this.pathLineArrow.clear();
    this._drawLine();
    this._drawArrow();
  }

  _update() {
    this._moveCircle();
    this._checkCirclesCollision();
  }
}
