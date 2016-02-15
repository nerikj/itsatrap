import PhysicsComponent from "../components/physics_component.js";
import Renderable from "../components/renderable.js";
import Material from "../material.js";
import p2 from "p2";

class ArenaFactory {
  static create(entity_manager, physics_system) {
    const arena = entity_manager.create_entity();

    const r = new Renderable();
    r.graphics.lineStyle(2, 0xff0bff, 0.6);
    r.graphics.beginFill(0);
    r.graphics.drawRect(1, 1, 799, 599);
    entity_manager.add_component(arena, r);

    // http://paulsalaets.com/posts/planes-in-p2/
    // TODO Is it possible to create a physics_component of this?
    const b = new p2.Body();
    const bp = new p2.Plane();
    bp.material = Material.WALL;
    b.addShape(bp);
    physics_system.addBody(b);

    const t = new p2.Body({ position: [0, 600], angle: Math.PI });
    const tp = new p2.Plane();
    tp.material = Material.WALL;
    t.addShape(tp);
    physics_system.addBody(t);

    const l = new p2.Body({ position: [0, 0], angle: (3 * Math.PI) / 2 });
    const lp = new p2.Plane();
    lp.material = Material.WALL;
    l.addShape(lp);
    physics_system.addBody(l);

    const r2 = new p2.Body({ position: [800, 0], angle: Math.PI / 2 });
    const rp = new p2.Plane();
    rp.material = Material.WALL;
    r2.addShape(rp);
    physics_system.addBody(r2);
  }
}

export default ArenaFactory;
