import p2 from 'p2';

class PhysicsComponent {
  constructor(radius, material, options) {
    this.shape = new p2.Circle({ radius: radius });
    this.shape.material = material;
    this.body = new p2.Body(options);
    this.body.addShape(this.shape);
  }
}

export default PhysicsComponent;
