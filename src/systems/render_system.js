import Position from "../components/position.js";

class RenderSystem {
  constructor() {
    // TODO Remove
    this.renderer = new PIXI.WebGLRenderer(800, 600);
    document.body.appendChild(this.renderer.view);
  }

  tick(entity_manager) {
    // const entities = entity_manager.entities_having_component([Renderable, Position]);
    const entities = entity_manager.entities_having_component("Renderable");
    // console.log("Found entities: ", entities);
    this.stage = new PIXI.Container();
    for (var entity of entities) {
      //console.log("Rendering entities: ", entities);

      // TODO: Need method to get components of this entity
      this.stage.addChild(graphics);
    }
    this.renderer.render(this.stage);

    // entities = entity_mgr.get_all_entities_with_components_of_type([Renderable, SpatialState])
    // entities.each do |e|
    //   loc_comp    = entity_mgr.get_component_of_type(e, SpatialState)
    // render_comp = entity_mgr.get_component_of_type(e, Renderable)

    // batch.draw(render_comp.image, loc_comp.x, loc_comp.y,
    //            render_comp.width/2, render_comp.height/2,
    //            render_comp.width, render_comp.height,
    //            1.0, 1.0,
    //            render_comp.rotation,
    //            0, 0,
    //            render_comp.width, render_comp.height,
    //            false, false
    //           )
    // end

    // entities = entity_mgr.get_all_entities_with_component_of_type(Fuel)
    // entities.each_with_index do |e, index|
    //   fuel_component   = entity_mgr.get_component_of_type(e, Fuel)
    // font.draw(batch, "Fuel remaining #{sprintf "%.1f" % fuel_component.remaining}", 8, 90);
    // end
  }
}

export default RenderSystem;
