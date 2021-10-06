import * as PIXI from 'pixi.js'

export class Game extends PIXI.Application  {
    constructor() {
        super({
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0xc3c3c3
        })
console.log(this.renderer.width);
console.log(this);
        

        document.body.appendChild(this.view)
        
        const texture = PIXI.Texture.from('assets/bunny.png')
        const bunny = new PIXI.Sprite(texture);

        bunny.x = this.renderer.width * 0.5;
        bunny.y = this.renderer.height * 0.5;
        bunny.anchor.x = 0.5;
        bunny.anchor.y = 0.5;

        this.stage.addChild(bunny);
            this.ticker.add(animate);
            function animate()  {
                        bunny.rotation += 0.1;
                    }
      
        // const texture = PIXI.Texture.from('assets/bunny.png')
        
        // // loader.add('bunny', 'assets/bunny.png').load((loader, resources) => {
        //     const bunny = new PIXI.Sprite(texture);
        //     bunny.x = this.renderer.width * 0.5;
        //     bunny.y = this.renderer.height * 0.5;

        //     // bunny.anchor.x = 0.5;
        //     // bunny.anchor.y = 0.5;
        //     this.stage.addChild(bunny);


        //     this.ticker.add(animate);
        //     this.ticker.start();

        //     ticker.add(()=>{
        //         bunny.rotation += 0.1;
                
        //     });
        //     //ticker.start();

        //     // this.ticker.add(() => {
        //     //     bunny.rotation += 0.04;
        //     // });

        //     function animate()  {
        //         bunny.rotation += 0.1;
        //         this.render(stage);
        //     }
        // // })
    }
}

