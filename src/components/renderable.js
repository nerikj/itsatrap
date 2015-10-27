class Renderable {
  constructor() {
    this.graphics = new PIXI.Graphics();
	  this.graphics.lineStyle(0);
	  this.graphics.beginFill(0xFFFF0B, 0.5);
	  this.graphics.drawCircle(470, 200,100);
  }
}

export default Renderable;
