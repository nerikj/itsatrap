const keys = {
  left: false,
  up: false,
  right: false,
  down: false
};

export default class Keyboard {
  static init() {
    window.addEventListener(
      "keydown", this.onKeyDown.bind(this), false
    );

    window.addEventListener(
      "keyup", this.onKeyUp.bind(this), false
    );
  }

  static get keys() {
    return keys;
  }

  static onKeyDown(event) {
    const kc = event.keyCode;
    event.preventDefault();

    if(kc === 37) this.keys.left = true;
    if(kc === 38) this.keys.up = true;
    if(kc === 39) this.keys.right = true;
    if(kc === 40) this.keys.down = true;
  }

  static onKeyUp(event) {
    const kc = event.keyCode;
    event.preventDefault();

    if(kc === 37) this.keys.left = false;
    if(kc === 38) this.keys.up = false;
    if(kc === 39) this.keys.right = false;
    if(kc === 40) this.keys.down = false;
  }
}
