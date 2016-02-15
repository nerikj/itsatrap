import Moveable from "../components/moveable.js";
import PhysicsComponent from "../components/physics_component.js";
import PlayerInput from "../components/player_input.js";
import Renderable from "../components/renderable.js";
import Material from "../material.js";

class PlayerFactory {
  static create(entity_manager, physics_system) {
    const player = entity_manager.create_entity();

    const r = new Renderable();
    r.graphics.lineStyle(0);
    r.graphics.beginFill(0x00ff00, 0.5);
    r.graphics.drawCircle(0, 0, 15);
    entity_manager.add_component(player, r);

    let inpuComp = new PlayerInput();
    entity_manager.add_component(player, inpuComp);

    let moveComp = new Moveable();
    entity_manager.add_component(player, moveComp);

    const p = new PhysicsComponent(15, Material.PLAYER, {
      mass: 1.25,
      position: [300, 130],
      //angularDamping:  0,
      damping: 0.95
    });
    entity_manager.add_component(player, p);

    physics_system.addBody(p.body, p.shape);

    return p.shape;
  }
}

export default PlayerFactory;
