import Position from "../components/position.js";

class RenderSystem {
  constructor() {
    this.renderer = new PIXI.WebGLRenderer(800, 600);
    this.stage = new PIXI.Container();
    document.getElementById('canvas').appendChild(this.renderer.view);
  }

  tick(entity_manager) {
    // TODO Don't recreate stage every tick. Added items should be cached.
    this.stage.removeChildren();

    const entities = entity_manager.entities_having_component("Renderable");
    for (var entity of entities) {
      const comp = entity_manager.component_by_type(entity, "Renderable");
      this.stage.addChild(comp.graphics);
    }

    this.renderer.render(this.stage);
  }
}

export default RenderSystem;
