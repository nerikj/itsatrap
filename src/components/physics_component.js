import p2 from 'p2';

class PhysicsComponent {
  constructor(radius, options) {
    this.shape = new p2.Circle({ radius: radius });
    this.shape.material = new p2.Material();
    this.body = new p2.Body(options);
    this.body.addShape(this.shape);
  }
}

export default PhysicsComponent;
