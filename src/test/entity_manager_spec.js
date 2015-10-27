import EntityManager from '../entity_manager.js';
import Renderable from '../components/renderable.js';

describe('EntityManager', function() {
  describe('#create_entity()', function () {
    it('returns a uuid', function () {
      const em = new EntityManager();
      const entity = em.create_entity();
      expect(entity).to.be.a('string');
      expect(entity).to.have.length(36);
    });
  });

  describe('#add_component()', function () {
    let em, entity, comp;

    beforeEach(function() {
      em = new EntityManager();
      entity = em.create_entity();
      comp = new Renderable();
    });

    it('adds the component to the entity', function () {
      em.add_component(entity, comp);

      let entities = em.entities_having_component("Renderable");
      expect(entities).to.deep.eq([entity]);
    });

    it("won't add this component if the entity already has it", function () {
      em.add_component(entity, comp);
      em.add_component(entity, comp);

      let entities = em.entities_having_component("Renderable");
      expect(entities).to.deep.eq([entity]);
    });
  });

  describe('#components_by_type()', function () {
    let em, entity, comp;

    beforeEach(function() {
      em = new EntityManager();
      entity = em.create_entity();
    });

    it('returns an array of components for the entity', function () {
      c1 = new Renderable();
      c2 = new Renderable();
      em.add_component(entity, c1);
      em.add_component(entity, c2);

      const components = em.components_by_type(entity, "Renderable");
      expect(components).to.deep.eq([c1, c2]);
    });

    it("returns an empty array if the enity has no given components", function () {
    });
  });

  describe('#entities_having_component', function () {
    let em;

    beforeEach(function() {
      em = new EntityManager();
    });

    it('returns an empty array if no entities have the given component', function () {
      const entities = em.entities_having_component("Renderable");
      expect(entities).to.deep.eq([]);
    });

    it('returns an array with entities having the given component', function () {
      const entity = em.create_entity();

      em.add_component(entity, new Renderable());

      const entities = em.entities_having_component("Renderable");
      expect(entities).to.deep.eq([entity]);
    });
  });
});
