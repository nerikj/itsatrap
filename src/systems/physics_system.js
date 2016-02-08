import p2, { vec2 } from 'p2';

class PhysicsSystem {
  constructor() {
    this.world = new p2.World({
      gravity: [0, 0]
    });
    this.world.defaultContactMaterial.friction = 0;
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

    this.tp.collisionGroup = Math.pow(2, 1);
    this.bp.collisionGroup = Math.pow(2, 1);
    this.lp.collisionGroup = Math.pow(2, 1);
    this.rp.collisionGroup = Math.pow(2, 1);
    this.tp.collisionMask = Math.pow(2, 2);
    this.bp.collisionMask = Math.pow(2, 2);
    this.lp.collisionMask = Math.pow(2, 2);
    this.rp.collisionMask = Math.pow(2, 2);
  }

  addBody(body, shape) {
    this.world.addBody(body);

    shape.collisionGroup = Math.pow(2, 2);
    shape.collisionMask = Math.pow(2, 2) | Math.pow(2, 1);

    const restitution = 0.2;
    const friction = 0;
    console.log("Adding material", this.bp.material, shape.material);
    this.world.addContactMaterial(new p2.ContactMaterial(this.bp.material, shape.material, {
      restitution : restitution,
      friction: friction,
      stiffness : Number.MAX_VALUE // We need infinite stiffness to get exact restitution
    }));
    this.world.addContactMaterial(new p2.ContactMaterial(this.tp.material, shape.material, {
      restitution : restitution,
      friction: friction,
      stiffness : Number.MAX_VALUE // We need infinite stiffness to get exact restitution
    }));
    this.world.addContactMaterial(new p2.ContactMaterial(this.lp.material, shape.material, {
      restitution : restitution,
      friction: friction,
      stiffness : Number.MAX_VALUE // We need infinite stiffness to get exact restitution
    }));
    this.world.addContactMaterial(new p2.ContactMaterial(this.rp.material, shape.material, {
      restitution : restitution,
      friction: friction,
      stiffness : Number.MAX_VALUE // We need infinite stiffness to get exact restitution
    }));
  }

  tick(stage, entity_manager) {
    const entities = entity_manager.entities_having_component("Moveable");

    for (var entity of entities) {
      const ph = entity_manager.component_by_type(entity, "PhysicsComponent");
      const comp = entity_manager.component_by_type(entity, "Moveable");

      var force = 500;
      var maxVelocity = 175;
      // TODO Need to check maxVelocity against both x and y velocity if moving diagonally
      if (comp.left && ph.body.velocity[0] > -maxVelocity) {
        // var f = [];
        // vec2.add(f, ph.body.velocity[0], ph.body.velocity[1]);
        // console.log(f);
        ph.body.applyForceLocal([-force, 0]);
        //console.log(ph.body.velocity);
        //ph.body.velocity[0] = -200;
      }
      if (comp.right && ph.body.velocity[0] < maxVelocity) {
        ph.body.applyForceLocal([force, 0]);
        //ph.body.velocity[0] = 200;
      }
      if (comp.up && ph.body.velocity[1] > -maxVelocity) {
        ph.body.applyForceLocal([0, -force]);
        //ph.body.velocity[1] = -200;
      }
      if (comp.down && ph.body.velocity[1] < maxVelocity) {
        ph.body.applyForceLocal([0, force]);
        //ph.body.velocity[1] = 200;
      }

      //console.log(ph.body.velocity);
      //console.log(ph.body.velocity);
    }

    this.world.step(this.timeStep);

    const entities2 = entity_manager.entities_having_component("PhysicsComponent");
    // TODO Mediate via a position component instead of setting directly on graphics object?
    for (var entity2 of entities2) {
      const ph = entity_manager.component_by_type(entity2, "PhysicsComponent");
      const comp = entity_manager.component_by_type(entity2, "Renderable");
      comp.graphics.x = ph.body.position[0];
      comp.graphics.y = ph.body.position[1];
    }
  }
}

export default PhysicsSystem;
