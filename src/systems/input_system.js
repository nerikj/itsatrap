import Keyboard from "../keyboard.js";

class InputSystem {
  tick(entity_manager) {
    const entities = entity_manager.entities_having_component("PlayerInput");

    for (var entity of entities) {
      if (Keyboard.keys.left) {
        const comp = entity_manager.component_by_type(entity, "Renderable");
        comp.graphics.x -= 5;
      }

      if (Keyboard.keys.right) {
        const comp = entity_manager.component_by_type(entity, "Renderable");
        comp.graphics.x += 5;
      }

      if (Keyboard.keys.up) {
        const comp = entity_manager.component_by_type(entity, "Renderable");
        comp.graphics.y -= 5;
      }

      if (Keyboard.keys.down) {
        const comp = entity_manager.component_by_type(entity, "Renderable");
        comp.graphics.y += 5;
      }
    }
  }
}

export default InputSystem;
