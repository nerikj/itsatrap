import PhysicsComponent from "../components/physics_component.js";
import Renderable from "../components/renderable.js";

class BallFactory {
  static create(entity_manager, physics_system) {
    const ball = entity_manager.create_entity();

    const r = new Renderable();
    r.graphics.lineStyle(1, 0x0000ff);
    r.graphics.beginFill(0xffffff);
    r.graphics.drawCircle(0, 0, 10);
    entity_manager.add_component(ball, r);

    const p = new PhysicsComponent(10, {
      mass: 1.25,
      position: [200, 130],
      damping: 0.2
    });
    entity_manager.add_component(ball, p);

    physics_system.addBody(p.body, p.shape);

    return p.shape;
  }
}

export default BallFactory;
