class InputSystem {
  constructor() {
    // TODO Should most definitely be handled more generically and elsewhere
    window.addEventListener(
      "keydown", this.keydownHandler.bind(this), false
    );
    window.addEventListener(
      "keyup", this.keyupHandler.bind(this), false
    );
  }

  tick(entity_manager) {
    const entities = entity_manager.entities_having_component("PlayerInput");

    for (var entity of entities) {
      if (this.keyCode === 37) { // left
        const comp = entity_manager.component_by_type(entity, "Renderable");
        comp.graphics.x -= 5;
      } else if (this.keyCode === 39) { // right
        const comp = entity_manager.component_by_type(entity, "Renderable");
        comp.graphics.x += 5;
      } else if (this.keyCode === 38) { // up
        const comp = entity_manager.component_by_type(entity, "Renderable");
        comp.graphics.y -= 5;
      } else if (this.keyCode === 40) { // down
        const comp = entity_manager.component_by_type(entity, "Renderable");
        comp.graphics.y += 5;
      }
    }
  }

  // TODO Handle multiple keys
  keydownHandler(event) {
    //console.log("keydownHandler: ", event);
    this.keyCode = event.keyCode;
  }

  keyupHandler(event) {
    //console.log("keyupHandler: ", event);
    this.keyCode = undefined;
  }
}

export default InputSystem;
