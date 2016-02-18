import Keyboard from "../keyboard.js";
import io from 'socket.io-client';
import PlayerFactory from "../factories/player_factory";
import BallFactory from "../factories/ball_factory";

const IP = '10.15.2.159:3000'

class NetworkSystem {
  constructor(entity_manager, physics_system) {
    this.socket = io(`http://${IP}`);
    this.entity_manager = entity_manager;
    this.physics_system = physics_system;
    this.setup();
  }

  setup() {
    this.socket.on('serverConnect', (player) => {
      //const p = PlayerFactory.create(this.entity_manager, this.physics_system, player.id);
      //const entities = this.entity_manager.entities_having_component("PlayerInput");
      //const me = entities[0];
      //const comp = this.entity_manager.component_by_type(me, "Renderable");
      console.log('player', player);
      this.socket.on('serverTick', this.serverTick.bind(this));
    });
  }

  serverTick(players) {
    //console.log('PLAYERS', JSON.stringify(players));
    if (!players) return;

    for (const k in players) {
      const player = players[k];

      if (this.entity_manager.has_entity(player.id)) {
        const comp = this.entity_manager.component_by_type(player.id, "Renderable");

        const x1 = player.x;
        const y1 = player.y;
        comp.graphics.x = x1;
        comp.graphics.y = y1;
      } else {
        if (player.id === 'ball') {
          BallFactory.create(this.entity_manager, this.physics_system, player.id);
        } else {
          PlayerFactory.create(this.entity_manager, this.physics_system, player.id);
        }
      }
    }



  }

  tick() {
    const entities = this.entity_manager.entities_having_component("PlayerInput");

    for (var entity of entities) {
      const comp = this.entity_manager.component_by_type(entity, "Moveable");
      this.socket.emit("move", comp);
    }
  }
}

export default NetworkSystem;
