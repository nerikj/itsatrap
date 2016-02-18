import Keyboard from "../keyboard.js";

class NetworkSystem {
  constructor(socket) {
    this.socket = socket;
  }

  tick(entity_manager) {
    const entities = entity_manager.entities_having_component("PlayerInput");

    for (var entity of entities) {
      const comp = entity_manager.component_by_type(entity, "Moveable");
      this.socket.emit("move", comp);
    }
  }
}

export default NetworkSystem;
