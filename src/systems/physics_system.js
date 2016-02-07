import p2 from 'p2';

class PhysicsSystem {
  constructor() {
    this.world = new p2.World({
      gravity: [0, 0]
    });
    this.timeStep = 1 / 60;

    this.world.on("beginContact",function(event) {
      console.log("Collision!");
    });
    this.world.on("endContact",function(event) {
      console.log("Clear");
    });

    // http://paulsalaets.com/posts/planes-in-p2/
    var b = new p2.Body();
    this.bp = new p2.Plane();
    this.bp.material = new p2.Material();
    b.addShape(this.bp);
    this.world.addBody(b);

    var t = new p2.Body({ position: [0, 600], angle: Math.PI });
    this.tp = new p2.Plane();
    this.tp.material = new p2.Material();
    t.addShape(this.tp);
    this.world.addBody(t);

    var l = new p2.Body({ position: [0, 0], angle: (3 * Math.PI) / 2 });
    this.lp = new p2.Plane();
    this.lp.material = new p2.Material();
    l.addShape(this.lp);
    this.world.addBody(l);

    var r = new p2.Body({ position: [800, 0], angle: Math.PI / 2 });
    this.rp = new p2.Plane();
    this.rp.material = new p2.Material();
    r.addShape(this.rp);
    this.world.addBody(r);
  }

  addBody(body, shape) {
    // If we don't add the body to the world, it won't be simulated.
    this.world.addBody(body);

    console.log("Adding material", this.bp.material, shape.material);
    this.world.addContactMaterial(new p2.ContactMaterial(this.bp.material, shape.material, {
      restitution : 0.5,
      stiffness : Number.MAX_VALUE // We need infinite stiffness to get exact restitution
    }));
    this.world.addContactMaterial(new p2.ContactMaterial(this.tp.material, shape.material, {
      restitution : 0.5,
      stiffness : Number.MAX_VALUE // We need infinite stiffness to get exact restitution
    }));
    this.world.addContactMaterial(new p2.ContactMaterial(this.lp.material, shape.material, {
      restitution : 0.5,
      stiffness : Number.MAX_VALUE // We need infinite stiffness to get exact restitution
    }));
    this.world.addContactMaterial(new p2.ContactMaterial(this.rp.material, shape.material, {
      restitution : 0.5,
      stiffness : Number.MAX_VALUE // We need infinite stiffness to get exact restitution
    }));
  }

  tick(stage, entity_manager) {
    const entities = entity_manager.entities_having_component("Moveable");

    for (var entity of entities) {
      const ph = entity_manager.component_by_type(entity, "Physics");
      const comp = entity_manager.component_by_type(entity, "Moveable");
      ph.body.velocity[0] = 0;
      ph.body.velocity[1] = 0;

      if (comp.left)  { ph.body.velocity[0] = -200; }
      if (comp.right) { ph.body.velocity[0] = 200; }
      if (comp.up)    { ph.body.velocity[1] = -200; }
      if (comp.down)  { ph.body.velocity[1] = 200; }
    }

    this.world.step(this.timeStep);

    const entities2 = entity_manager.entities_having_component("Physics");
    // TODO Mediate via a position component instead of setting directly on graphics object?
    for (var entity2 of entities2) {
      const ph = entity_manager.component_by_type(entity2, "Physics");
      const comp = entity_manager.component_by_type(entity2, "Renderable");
      comp.graphics.x = ph.body.position[0];
      comp.graphics.y = ph.body.position[1];
    }
  }
}

export default PhysicsSystem;
