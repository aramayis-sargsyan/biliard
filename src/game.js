import * as PIXI from 'pixi.js';
import { getRandomInRange, getRandomColor } from './utils';

export class Game extends PIXI.Application {
  constructor() {
    super({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0xc3c3c3,
    });
    this.bul = false;
    this.velocity = {
      x: 0,
      y: 0,
    };
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
    this._createCircle();
    this._positionCircle();
    this._setCircleListeners();
  }

  _createCircle() {
    const graphic = new PIXI.Graphics();
    graphic.lineStyle(5, 0x444444);
    graphic.beginFill(getRandomColor());
    graphic.drawCircle(0, 0, 30);
    graphic.closePath();
    graphic.endFill();
    this.circle = graphic;
    this.stage.addChild(this.circle);
  }

  _positionCircle() {
    this.circle.position.set(this.renderer.width / 2, this.renderer.height / 2);
  }

  _drawLine() {
    const pathLine = new PIXI.Graphics();
    pathLine.lineStyle(3, 0x222222);
    pathLine.moveTo(this.mouseStart.x, this.mouseStart.y);
    pathLine.lineTo(this.mouseEnd.x, this.mouseEnd.y);
    this.pathLine = pathLine;
    this.stage.addChild(this.pathLine);
  }

  _drawArrow() {
    const pathLine = new PIXI.Graphics();
    pathLine.lineStyle(3, 0x222222);
    pathLine.moveTo(this.mouseStart.x, this.mouseStart.y);
    console.log(this.mouseStart.x);
    console.log(this.mouseEnd.x);
    pathLine.lineTo(this.mouseStart.x - this.mouseEnd.x, this.mouseStart.y - this.mouseEnd.y);
    pathLine.lineTo(this.mouseStart.x - this.mouseEnd.x + 5, this.mouseStart.y - this.mouseEnd.y - 20);
    pathLine.lineTo(this.mouseStart.x - this.mouseEnd.x - 5, this.mouseStart.y - this.mouseEnd.y - 20);
    pathLine.lineTo(this.mouseStart.x - this.mouseEnd.x, this.mouseStart.y - this.mouseEnd.y);
    this.pathLineArrow = pathLine;
    this.stage.addChild(this.pathLineArrow);
  }

  _calculateVelocity() {
    this.velocity.x = (this.mouseStart.x - this.mouseEnd.x) / 20;
    this.velocity.y = (this.mouseStart.y - this.mouseEnd.y) / 20;
  }

  _moveCircle() {
    this.circle.position.x += this.velocity.x;
    this.circle.position.y += this.velocity.y;
    if (this.velocity.x > 0) {
      this.velocity.x -= 0.1;
    } else if (this.velocity.x < 0) {
      this.velocity.x += 0.1;
    }

    if (this.velocity.x < 0.1 && this.velocity.x > -0.1) {
      this.velocity.x = 0;
    }
    if (this.velocity.y > 0) {
      this.velocity.y -= 0.1;
    } else if (this.velocity.y < 0) {
      this.velocity.y += 0.1;
    }

    if (this.velocity.y < 0.1 && this.velocity.y > -0.1) {
      this.velocity.y = 0;
    }

    if (this.velocity.x === 0 && this.velocity.y === 0) {
      this.circle.interactive = true;
    }
  }

  _checkWorldBounds(circle) {
    if (circle.position.x >= this.renderer.width - circle.width / 2) {
      this.velocity.x = -Math.abs(this.velocity.x);
    } else if (circle.position.x <= circle.width / 2) {
      this.velocity.x = Math.abs(this.velocity.x);
    } else if (circle.position.y >= this.renderer.height - circle.height / 2) {
      this.velocity.y = -Math.abs(this.velocity.y);
    } else if (circle.position.y <= circle.width / 2) {
      this.velocity.y = Math.abs(this.velocity.y);
    }
  }

  _setCircleListeners() {
    this.circle.interactive = true;
    this.circle
      .on('pointerdown', this._onClickStart, this)
      .on('pointerup', this._onClickEnd, this)
      .on('pointerupoutside', this._onClickOutside, this);
  }

  _onClickStart(e) {
    this.mouseStart.x = this.circle.position.x;
    this.mouseStart.y = this.circle.position.y;
    this.mouseEnd.x = e.data.global.x;
    this.mouseEnd.y = e.data.global.y;
    this.circle.on('pointermove', this._onClickMove, this);
    this._drawLine();
    this._drawArrow();
  }

  _onClickEnd(e) {
    this.circle.off('pointermove', this._onClickMove, this);
    this.pathLine.clear();
    this.pathLineArrow.clear();
  }

  _onClickOutside() {
    this.circle.interactive = false;
    this.circle.off('pointermove', this._onClickMove, this);
    this.pathLine.clear();
    this.pathLineArrow.clear();
    this._calculateVelocity();
    this._moveCircle();
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
    this._checkWorldBounds(this.circle);
  }
}
