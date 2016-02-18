import FieldScreen from "./screens/field_screen.js";

class Game {
  constructor(socket) {
    console.log("Creating game");
    this.socket = socket;
    this.screen = new FieldScreen(this.socket);
    this.mainLoop = this.mainLoop.bind(this);
  }

  mainLoop(timestamp) {
    // Throttle the frame rate.
    if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
      requestAnimationFrame(this.mainLoop);
      return;
    }

    // Track the accumulated time that hasn't been simulated yet
    delta += timestamp - lastFrameTimeMs; // note += here
    lastFrameTimeMs = timestamp;

    if (timestamp > lastFpsUpdate + 1000) {
      fps = 0.25 * framesThisSecond + (1 - 0.25) * fps; // compute the new FPS
      lastFpsUpdate = timestamp;
      framesThisSecond = 0;
    }
    framesThisSecond++;


    // Simulate the total elapsed time in fixed-size chunks
    while (delta >= timestep) {
      this.screen.update(timestep);
      delta -= timestep;
      // Sanity check
      if (++numUpdateSteps >= 240) {
        panic();
        break; // bail out
      }
    }
    draw();
    this.screen.render();
    requestAnimationFrame(this.mainLoop);
  }

  start() {
    requestAnimationFrame(this.mainLoop);
  }
}

var fpsDisplay = document.getElementById('fpsDisplay'),
    fps = 60,
    framesThisSecond = 0,
    lastFrameTimeMs = 0,
    lastFpsUpdate = 0,
    maxFPS = 60,
    delta = 0,
    timestep = 1000 / 60, // 1000ms/60fps = 16.667 ms per frame for every update
    numUpdateSteps = 0;

function draw() {
  fpsDisplay.textContent = Math.round(fps) + ' FPS';
}

function panic() {
  delta = 0; // discard the unsimulated time
  // ... snap the player to the authoritative state
}

export default Game;
