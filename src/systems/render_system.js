import Position from "../components/position.js";

class RenderSystem {
  constructor() {
    // TODO (Re)move
    this.renderer = new PIXI.WebGLRenderer(800, 600);
    document.body.appendChild(this.renderer.view);
  }

  tick(entity_manager) {
    const entities = entity_manager.entities_having_component("Renderable");
    this.stage = new PIXI.Container();

    for (var entity of entities) {
      const comp = entity_manager.component_by_type(entity, "Renderable");
      this.stage.addChild(comp.graphics);
    }

    this.renderer.render(this.stage);
  }
}

export default RenderSystem;
