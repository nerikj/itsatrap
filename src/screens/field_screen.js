import EntityManager from "../entity_manager.js";
import InputSystem from "../systems/input_system.js";
import PhysicsSystem from "../systems/physics_system.js";
import RenderSystem from "../systems/render_system.js";
import PIXI from 'pixi.js';
import p2 from 'p2';

// TODO Remove?
import Moveable from "../components/moveable.js";
import Physics from "../components/physics.js";
import Renderable from "../components/renderable.js";
import PlayerInput from "../components/player_input.js";

class FieldScreen {
  constructor() {
    this.entity_manager = new EntityManager();
    this.input_system = new InputSystem();
    this.physics_system = new PhysicsSystem();
    this.render_system = new RenderSystem();

    this.create_arena();
    this.create_player();
    this.create_ball();
  }

  create_arena() {
    const arena = this.entity_manager.create_entity();
    const graphics = new PIXI.Graphics();
    graphics.lineStyle(2, 0xff0bff, 0.6);
    graphics.beginFill(0);
    graphics.drawRect(1, 1, 799, 599);
    let r = new Renderable(graphics);
    this.entity_manager.add_component(arena, r);
  }

  create_ball() {
    let ball = this.entity_manager.create_entity();
    const graphics = new PIXI.Graphics();
    graphics.lineStyle(0);
    graphics.beginFill(0x0bffff, 0.5);
    graphics.drawCircle(0, 0, 20);
    let rendComp = new Renderable(graphics);
    let physComp = new Physics();

    physComp.body = new p2.Body({
      mass: 0.1,
      position: [200, 130]
    });
    var physShape = new p2.Circle({ radius: 20 });
    physShape.material = new p2.Material();
    physComp.body.addShape(physShape);

    this.physics_system.addBody(physComp.body, physShape); // TODO This should be handled in some other way
    this.entity_manager.add_component(ball, rendComp);
    this.entity_manager.add_component(ball, physComp);
  }

  create_player() {
    const player = this.entity_manager.create_entity();
    const graphics = new PIXI.Graphics();
    graphics.lineStyle(0);
    graphics.beginFill(0xFFFF0B, 0.5);
    graphics.drawCircle(0, 0, 20);
    let rendComp = new Renderable(graphics);
    let inpuComp = new PlayerInput();
    let physComp = new Physics();
    let moveComp = new Moveable();

    physComp.body = new p2.Body({
      mass: 1,
      position: [300, 130]
    });
    var circleShape = new p2.Circle({ radius: 20 });
    circleShape.material = new p2.Material();
    physComp.body.addShape(circleShape);

    this.physics_system.addBody(physComp.body, circleShape); // TODO This should be handled in some other way
    this.entity_manager.add_component(player, rendComp);
    this.entity_manager.add_component(player, inpuComp);
    this.entity_manager.add_component(player, physComp);
    this.entity_manager.add_component(player, moveComp);
  }

  render() {
    this.input_system.tick(this.entity_manager);
    this.physics_system.tick(this.stage, this.entity_manager);
    this.render_system.tick(this.entity_manager);
  }

  update() {
  }
}

export default FieldScreen;
