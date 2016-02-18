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
  }

  addBody(body, shape) {
    this.world.addBody(body);
  }

  tick(entity_manager) {
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
      //comp.graphics.x = ph.body.position[0];
      //comp.graphics.y = ph.body.position[1];
    }
  }
}

export default PhysicsSystem;
