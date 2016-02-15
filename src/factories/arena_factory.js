import PhysicsComponent from "../components/physics_component.js";
import Renderable from "../components/renderable.js";

class ArenaFactory {
  static create(entity_manager) {
    const arena = entity_manager.create_entity();

    const r = new Renderable();
    r.graphics.lineStyle(2, 0xff0bff, 0.6);
    r.graphics.beginFill(0);
    r.graphics.drawRect(1, 1, 799, 599);
    entity_manager.add_component(arena, r);
  }
}

export default ArenaFactory;
