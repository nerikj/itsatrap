import EntityManager from '../entity_manager.js';
import Position from '../components/position.js';
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

  describe('#component_by_type()', function () {
    let em, entity, c1, c2;

    beforeEach(function() {
      em = new EntityManager();
      entity = em.create_entity();
      c1 = new Renderable();
      c2 = new Position();
      em.add_component(entity, c1);
      em.add_component(entity, c2);
    });

    it('returns the component with the given type belonging to the entity', function () {
      const component = em.component_by_type(entity, "Renderable");
      expect(component).to.eq(c1);
    });

    it("returns undefined if the entity have no such component", function () {
      const component = em.component_by_type(entity, "Foo");
      expect(component).to.deep.eq(undefined);
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
