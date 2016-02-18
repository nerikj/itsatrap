import EntityManager from "../entity_manager.js";
import InputSystem from "../systems/input_system.js";
import NetworkSystem from "../systems/network_system.js";
import PhysicsSystem from "../systems/physics_system.js";
import RenderSystem from "../systems/render_system.js";
import ArenaFactory from "../factories/arena_factory.js";
import BallFactory from "../factories/ball_factory.js";
import PlayerFactory from "../factories/player_factory.js";
import { ContactMaterial } from "../material.js";
import PIXI from 'pixi.js';

class FieldScreen {
  constructor() {
    this.entity_manager = new EntityManager();
    this.input_system = new InputSystem();
    this.physics_system = new PhysicsSystem();
    this.network_system = new NetworkSystem(this.entity_manager, this.physics_system);
    this.render_system = new RenderSystem();

    ArenaFactory.create(this.entity_manager, this.physics_system);
    //const b = BallFactory.create(this.entity_manager, this.physics_system);
    this.physics_system.world.addContactMaterial(ContactMaterial.BALL_PLAYER);
    this.physics_system.world.addContactMaterial(ContactMaterial.BALL_WALL);
    this.physics_system.world.addContactMaterial(ContactMaterial.PLAYER_WALL);
  }

  render() {
    this.input_system.tick(this.entity_manager);
    this.network_system.tick(this.entity_manager);
    //this.physics_system.tick(this.entity_manager);
    this.render_system.tick(this.entity_manager);
  }

  update() {
  }
}

export default FieldScreen;
