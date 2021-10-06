import * as PIXI from 'pixi.js'

export class Game extends PIXI.Application {
    constructor() {
        super({
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0xc3c3c3
        })

        document.body.appendChild(this.view)

        const loader = new PIXI.Loader()
        loader.add('bunny', 'assets/bunny.png').load((loader, resources) => {
            const bunny = new PIXI.Sprite(resources.bunny.texture);


            bunny.x = this.renderer.width * 0.5;
            bunny.y = this.renderer.height * 0.5;

            bunny.anchor.x = 0.5;
            bunny.anchor.y = 0.5;


            this.stage.addChild(bunny);

            this.ticker.add(() => {
                bunny.rotation += 0.04;
            });
        })
    }
}

