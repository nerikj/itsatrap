import EntityManager from "../entity_manager.js";
import InputSystem from "../systems/input_system.js";
import PhysicsSystem from "../systems/physics_system.js";
import RenderSystem from "../systems/render_system.js";
import ArenaFactory from "../factories/arena_factory.js";
import BallFactory from "../factories/ball_factory.js";
import PlayerFactory from "../factories/player_factory.js";
import PIXI from 'pixi.js';
import p2 from 'p2';

class FieldScreen {
  constructor() {
    this.entity_manager = new EntityManager();
    this.input_system = new InputSystem();
    this.physics_system = new PhysicsSystem();
    this.render_system = new RenderSystem();

    ArenaFactory.create(this.entity_manager);
    const p = PlayerFactory.create(this.entity_manager, this.physics_system);
    const b = BallFactory.create(this.entity_manager, this.physics_system);
    this.physics_system.world.addContactMaterial(new p2.ContactMaterial(b.material, p.material, {
      restitution: 0.2,
      friction: 0
      //stiffness : Number.MAX_VALUE // We need infinite stiffness to get exact restitution
    }));
  }

  render() {
    this.input_system.tick(this.entity_manager);
    this.physics_system.tick(this.entity_manager);
    this.render_system.tick(this.entity_manager);
  }

  update() {
  }
}

export default FieldScreen;
