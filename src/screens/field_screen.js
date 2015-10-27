import EntityManager from "../entity_manager.js";
import RenderSystem from "../systems/render_system.js";

// TODO Remove
import Renderable from "../components/renderable.js";

class FieldScreen {
  constructor() {
    this.entity_manager = new EntityManager();
    this.renderer = new RenderSystem();

    // TODO Remove
    let e = this.entity_manager.create_entity();
    let c = new Renderable();
    this.entity_manager.add_component(e, c);
  }

  render() {
    this.renderer.tick(this.entity_manager);
  }

  update(delta) {
    // this.boxPos += this.boxVelocity * delta;
    // if (this.boxPos >= this.limit || this.boxPos <= 0) this.boxVelocity = -this.boxVelocity;
  }
}

export default FieldScreen;
