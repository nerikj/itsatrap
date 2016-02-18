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
import p2 from 'p2';

class FieldScreen {
  constructor(socket) {
    this.socket = socket;
    this.entity_manager = new EntityManager();
    this.input_system = new InputSystem();
    this.network_system = new NetworkSystem(this.socket);
    this.physics_system = new PhysicsSystem();
    this.render_system = new RenderSystem();

    ArenaFactory.create(this.entity_manager, this.physics_system);
    const p = PlayerFactory.create(this.entity_manager, this.physics_system);
    const b = BallFactory.create(this.entity_manager, this.physics_system);
    this.physics_system.world.addContactMaterial(ContactMaterial.BALL_PLAYER);
    this.physics_system.world.addContactMaterial(ContactMaterial.BALL_WALL);
    this.physics_system.world.addContactMaterial(ContactMaterial.PLAYER_WALL);
  }

  render() {
    this.input_system.tick(this.entity_manager);
    this.network_system.tick(this.entity_manager);
    this.physics_system.tick(this.entity_manager);
    this.render_system.tick(this.entity_manager);
  }

  update() {
  }
}

export default FieldScreen;
