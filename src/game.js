import * as PIXI from 'pixi.js'
import { getRandomInRange, getRandomColor } from "./utils";

export class Game extends PIXI.Application {
    constructor() {
        super({
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0xc3c3c3
        })
        document.body.appendChild(this.view)


        this.loader.add([
            { name: 'bunny1', url: 'assets/bunny1.png' },
        ])
        this.loader.onComplete.add(this._onLoadComplete, this)

        this.loader.load()
    }
    
    _onLoadComplete() {
        this.drawGraphics()
        this.drawBunnies()
    }

    buildCircle(){
        this.graphic.lineStyle(5, 0x444444);
        this.graphic.beginFill("0x" + getRandomColor());
        this.graphic.drawCircle(0,0,getRandomInRange(30,100));
        this.graphic.closePath()
        this.graphic.endFill();
        console.log(this.graphic);
    }
    
    drawGraphics(loader, resource) {
        this.graphics = []

        for(let i = 0 ; i<5; i++){
            this.graphic = new PIXI.Graphics();
            this.graphics.push(this.buildCircle())
            console.log(this.graphics);
        this.graphic.x = getRandomInRange(this.graphic.width , this.renderer.width - this.graphic.width)
        this.graphic.y =getRandomInRange(this.graphic.height , this.renderer.height - this.graphic.height)
        this.stage.addChild(this.graphic)  
    
        }
        this.ticker.add(this._graphic, this);
        this.ticker.start();
    }

    _graphic(){

            this.graphic.x += 5
            this.graphic.y += 5
        
    }



  

    drawBunnies(loader, resources) {
        this.ticker.add(this._animate, this);
        this.ticker.start();

            this.container = new PIXI.Container()
            this.stage.addChild(this.container)

            const texture = PIXI.Texture.from('bunny1')
            this.bunnies = []

            for(let i = 0 ; i<9;i++){
                const bunny = new PIXI.Sprite(texture);
                bunny.x = 0.5 + i%3*40;
                bunny.x = 0.5 + i%3*40;
                bunny.y = 0.5 + Math.floor(i/3)*40;
                bunny.anchor.x = 0.5;
                bunny.anchor.y = 0.5;
                this.bunnies.push(bunny)

                this.container.addChild(bunny);
            }
  
            this.container.pivot.set(this.container.width/2 , this.container.height/2)

            this.container.x = (this.screen.width- this.container.width)/2  + this.container.pivot.x;
            this.container.y = (this.screen.height- this.container.height)/2 + this.container.pivot.y;   

    }

    _animate() {
        this.container.rotation -= 0.01
        for(let i = 0;i<this.bunnies.length;i++){
            this.bunnies[i].rotation += 0.1
        }
    }
}

