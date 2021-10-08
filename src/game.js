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
        this._createCircles()
        // this.drawBunnies()
    }
    
    drawGraphics() {
        this.circles = []  
        for(let i = 0;i<5;i++){          
            const graphic = new PIXI.Graphics();
            graphic.lineStyle(5, 0x444444);
            graphic.beginFill(getRandomColor());
            graphic.drawCircle(0,0,getRandomInRange(30,60));
            // graphic.drawStar(280, 510, 7, 50);
            graphic.closePath()
            graphic.endFill();
            graphic.velosityX = getRandomInRange(-2,2)
            graphic.velosityY = getRandomInRange(-2,2)
            this.circles.push(graphic)
        }
                 
        
    }

    checkWorldBounds(circle){
        circle.position.x += circle.velosityX
        circle.position.y += circle.velosityY
        if(circle.position.x>=this.renderer.width-circle.width/2){
            circle.velosityX = -Math.abs(circle.velosityX)               
        }else if(circle.position.x<=circle.width/2){
            circle.velosityX=Math.abs(circle.velosityX)            
        }else if(circle.position.y>=this.renderer.height-circle.height/2){
            circle.velosityY=-Math.abs(circle.velosityY)            
        }else if(circle.position.y<=circle.width/2){
            circle.velosityY=Math.abs(circle.velosityY)           
        }
        
    }

    _checkCollision(circle1, circle2) {
        return Math.sqrt(Math.pow((circle2.position.x-circle1.position.x), 2)+Math.pow((circle2.position.y-circle1.position.y), 2));
       
    }
    checkCirclesCollision() {
        for(let i = 0; i< this.circles.length-1;i++){
            for(let j =i+1;j<this.circles.length;j++){
                const distance= this._checkCollision(this.circles[i], this.circles[j])  
                if(( this.circles[i].width + this.circles[j].width )/2 >= distance){
                    this. _resolveCollision(this.circles[i], this.circles[j])
                }
            }
        }     
    }  

    _resolveCollision(circle1, circle2) {
        const xVelocityDiff = circle1.velosityX - circle2.velosityX;
        const yVelocityDiff = circle1.velosityY - circle2.velosityY;
        const distance = this._checkCollision(circle1, circle2)  
        const xDist = circle2.position.x - circle1.position.x;
        const yDist = circle2.position.y - circle1.position.y;
        let VCollisionNorm={x:xDist/distance, y:yDist/distance}
        let speed=xVelocityDiff *VCollisionNorm.x + yVelocityDiff*VCollisionNorm.y ;
        if (speed >=0) {
            circle1.velosityX -= 0.9*speed*VCollisionNorm.x
            circle1.velosityY -= 0.9*speed*VCollisionNorm.y
    
            circle2.velosityX =0.9*speed*VCollisionNorm.x
            circle2.velosityY = 0.9*speed*VCollisionNorm.y
    
            
        }  
    
    }

    _createCircles(){

        for(let i = 0; i<this.circles.length;i++){
            this.circles[i].x = getRandomInRange(this.circles[i].width , this.renderer.width - this.circles[i].width)
            this.circles[i].y = getRandomInRange(this.circles[i].height , this.renderer.height - this.circles[i].height)
            // console.log(this.circles);
            // console.log(this.circles[i].circle.position.x);
            this.stage.addChild(this.circles[i])  
            
        }
        this.ticker.add(this._graphic, this);
        this.ticker.start();
    }

    _graphic(){
        for(let i = 0;i<this.circles.length;i++){
                this.circles[i].position.x += this.circles[i].velosityX
        this.circles[i].position.y += this.circles[i].velosityY
            this.checkWorldBounds(this.circles[i]) 
            this.checkCirclesCollision()
            
        }   
    }
}











    // drawBunnies(loader, resources) {
    //     this.ticker.add(this._animate, this);
    //     this.ticker.start();

    //         this.container = new PIXI.Container()
    //         this.stage.addChild(this.container)

    //         const texture = PIXI.Texture.from('bunny1')
    //         this.bunnies = []

    //         for(let i = 0 ; i<9;i++){
    //             const bunny = new PIXI.Sprite(texture);
    //             bunny.x = 0.5 + i%3*40;
    //             bunny.x = 0.5 + i%3*40;
    //             bunny.y = 0.5 + Math.floor(i/3)*40;
    //             bunny.anchor.x = 0.5;
    //             bunny.anchor.y = 0.5;
    //             this.bunnies.push(bunny)

    //             this.container.addChild(bunny);
    //         }
  
    //         this.container.pivot.set(this.container.width/2 , this.container.height/2)

    //         this.container.x = (this.screen.width- this.container.width)/2  + this.container.pivot.x;
    //         this.container.y = (this.screen.height- this.container.height)/2 + this.container.pivot.y;   

    // }

    // _animate() {
    //     this.container.rotation -= 0.01
    //     for(let i = 0;i<this.bunnies.length;i++){
    //         this.bunnies[i].rotation += 0.1
    //     }
    // }