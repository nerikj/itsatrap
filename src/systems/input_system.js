import Keyboard from "../keyboard.js";

class InputSystem {
  tick(entity_manager) {
    const entities = entity_manager.entities_having_component("PlayerInput");

    for (var entity of entities) {
      const comp = entity_manager.component_by_type(entity, "Moveable");
      comp.left = false;
      comp.right = false;
      comp.up = false;
      comp.down = false;

      if (Keyboard.keys.left) {
        const comp = entity_manager.component_by_type(entity, "Moveable");
        // TODO Only set _intended_ movement direction?
        // Makes it possible to set intention via network or AI
        comp.left = true;
      }

      if (Keyboard.keys.right) {
        const comp = entity_manager.component_by_type(entity, "Moveable");
        comp.right = true;
      }

      if (Keyboard.keys.up) {
        const comp = entity_manager.component_by_type(entity, "Moveable");
        comp.up = true;
      }

      if (Keyboard.keys.down) {
        const comp = entity_manager.component_by_type(entity, "Moveable");
        comp.down = true;
      }
    }
  }
}

export default InputSystem;
