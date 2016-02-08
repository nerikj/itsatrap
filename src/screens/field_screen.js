import EntityManager from "../entity_manager.js";
import InputSystem from "../systems/input_system.js";
import PhysicsSystem from "../systems/physics_system.js";
import RenderSystem from "../systems/render_system.js";
import PIXI from 'pixi.js';
import p2 from 'p2';

// TODO Remove?
import Moveable from "../components/moveable.js";
import PhysicsComponent from "../components/physics_component.js";
import Renderable from "../components/renderable.js";
import PlayerInput from "../components/player_input.js";

class FieldScreen {
  constructor() {
    this.entity_manager = new EntityManager();
    this.input_system = new InputSystem();
    this.physics_system = new PhysicsSystem();
    this.render_system = new RenderSystem();

    this.create_arena();
    const p = this.create_player();
    const b = this.create_ball();
    this.physics_system.world.addContactMaterial(new p2.ContactMaterial(b.material, p.material, {
      restitution: 0.2,
      friction: 0
      //stiffness : Number.MAX_VALUE // We need infinite stiffness to get exact restitution
    }));
  }

  create_arena() {
    const arena = this.entity_manager.create_entity();
    const r = new Renderable();
    r.graphics.lineStyle(2, 0xff0bff, 0.6);
    r.graphics.beginFill(0);
    r.graphics.drawRect(1, 1, 799, 599);
    this.entity_manager.add_component(arena, r);
  }

  create_ball() {
    const ball = this.entity_manager.create_entity();
    const r = new Renderable();
    r.graphics.lineStyle(1, 0x0000ff);
    r.graphics.beginFill(0xffffff);
    r.graphics.drawCircle(0, 0, 10);
    const p = new PhysicsComponent(10, {
      mass: 1.25,
      position: [200, 130],
      damping: 0.2
    });

    this.physics_system.addBody(p.body, p.shape); // TODO This should be handled in some other way
    this.entity_manager.add_component(ball, r);
    this.entity_manager.add_component(ball, p);
    return p.shape;
  }

  create_player() {
    const player = this.entity_manager.create_entity();
    const r = new Renderable();
    r.graphics.lineStyle(0);
    r.graphics.beginFill(0x00ff00, 0.5);
    r.graphics.drawCircle(0, 0, 15);
    let inpuComp = new PlayerInput();
    let moveComp = new Moveable();
    const p = new PhysicsComponent(15, {
      mass: 1.25,
      position:  [300, 130],
      //angularDamping:  0,
      damping:  0.95
    });

    this.physics_system.addBody(p.body, p.shape); // TODO This should be handled in some other way
    this.entity_manager.add_component(player, r);
    this.entity_manager.add_component(player, inpuComp);
    this.entity_manager.add_component(player, p);
    this.entity_manager.add_component(player, moveComp);
    return p.shape;
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
