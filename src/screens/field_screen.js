import EntityManager from "../entity_manager.js";
import InputSystem from "../systems/input_system.js";
import RenderSystem from "../systems/render_system.js";
import PIXI from 'pixi.js';

// TODO Remove
import Renderable from "../components/renderable.js";
import PlayerInput from "../components/player_input.js";

class FieldScreen {
  constructor() {
    this.entity_manager = new EntityManager();
    this.input_system = new InputSystem();
    this.render_system = new RenderSystem();
    this.stage = new PIXI.Container();

    // TODO Remove
    let e = this.entity_manager.create_entity();
    let c1 = new Renderable();
    let c2 = new PlayerInput();
    this.entity_manager.add_component(e, c1);
    this.entity_manager.add_component(e, c2);
  }

  render() {
    this.input_system.tick(this.entity_manager);
    this.render_system.tick(this.stage, this.entity_manager);
  }

  update(delta) {
    // this.boxPos += this.boxVelocity * delta;
    // if (this.boxPos >= this.limit || this.boxPos <= 0) this.boxVelocity = -this.boxVelocity;
  }
}

export default FieldScreen;
