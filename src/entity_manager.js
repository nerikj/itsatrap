var uuidgen = require('node-uuid');

class EntityManager {
  constructor() {
    this.entities_by_id = {};
    this.entities_by_tag = {};
    this.component_stores = {};
  }

  add_component(entity, component) {
    let store = this.component_stores[component.constructor.name];

    if (!store) {
      store = {};
      this.component_stores[component.constructor.name] = store;
    }

    if (entity in store) {
      if (!component in store[entity]) {
        store[entity].push(component);
      }
    } else {
      store[entity] = [component];
    }
  }

  create_entity(uuid = uuidgen.v1()) {
    this.entities_by_id[uuid] = {};
    return uuid;
  }

  has_entity(entity) {
    return !!this.entities_by_id[entity];
  }

  component_by_type(entity, type) {
    const store = this.component_stores[type];
    if (!store) {
      return undefined;
    }

    const components = store[entity];
    if (!components) {
      return undefined;
    }

    return components[0];
  }

  // create_tagged_entity(tag) {

  //   this.entities_by_id[uuid] = tag;

  //   if (entities_by_tag.hasOwnProperty(tag)) {
  //     this.entities_by_tag[tag].push(uuid);
  //   } else {
  //     this.entities_by_tag[tag] = [uuid];
  //   }

  //   return uuid;
  // }

  entities_having_component(component) {
    const store = this.component_stores[component];
    if (store) {
      return Object.keys(store);
    } else {
      return [];
    }
    return [];
  }
}

module.exports = EntityManager;
