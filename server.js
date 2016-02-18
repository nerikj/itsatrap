import express from "express";
import { Server } from "http";
import socketio from "socket.io";
import raf from 'raf';
import p2, { vec2 } from 'p2';
import PhysicsComponent from "./src/components/physics_component";
import Material from "./src/material";

const app = express();
const http = Server(app);
const io = socketio(http);

const DELAY = 16;

class PhysicsSystem {
  constructor() {
    this.world = new p2.World({
      gravity: [0, 0]
    });
    this.world.defaultContactMaterial.friction = 0;
  }

  addBody(body, shape) {
    this.world.addBody(body);
  }

  tick(pl) {
    for (const key in pl) {
      const player = pl[key];
      const { moves } = player;
      if (!moves) return;

      var force = 500;
      var maxVelocity = 175;
      // TODO Need to check maxVelocity against both x and y velocity if moving diagonally
      if (moves.left && player.p.body.velocity[0] > -maxVelocity) {
        player.p.body.applyForceLocal([-force, 0]);
      }
      if (moves.right && player.p.body.velocity[0] < maxVelocity) {
        player.p.body.applyForceLocal([force, 0]);
      }
      if (moves.up && player.p.body.velocity[1] > -maxVelocity) {
        player.p.body.applyForceLocal([0, -force]);
      }
      if (moves.down && player.p.body.velocity[1] < maxVelocity) {
        player.p.body.applyForceLocal([0, force]);
      }
    }

    this.world.step(DELAY / 1000);
  }
}

const players = {};
const ball = new PhysicsComponent(10, Material.BALL, {
  mass: 1.25,
  position: [200, 130],
  damping: 0.2
});
const ps = new PhysicsSystem();
ps.addBody(ball.body, ball.shape);

const b = new p2.Body();
const bp = new p2.Plane();
bp.material = Material.WALL;
b.addShape(bp);
ps.addBody(b);

const t = new p2.Body({ position: [0, 600], angle: Math.PI });
const tp = new p2.Plane();
tp.material = Material.WALL;
t.addShape(tp);
ps.addBody(t);

const l = new p2.Body({ position: [0, 0], angle: (3 * Math.PI) / 2 });
const lp = new p2.Plane();
lp.material = Material.WALL;
l.addShape(lp);
ps.addBody(l);

const r2 = new p2.Body({ position: [800, 0], angle: Math.PI / 2 });
const rp = new p2.Plane();
rp.material = Material.WALL;
r2.addShape(rp);
ps.addBody(r2);


io.on('connection', (socket) => {
  players[socket.id] = {
    p: new PhysicsComponent(15, Material.PLAYER, {
      mass: 1.25,
      position: [
        Math.floor(Math.random() * 600) + 1,
        Math.floor(Math.random() * 600) + 1,
      ],
      damping: 0.95,
    }),
    id: socket.id,
  };
  ps.addBody(players[socket.id].p.body);

  socket.emit('serverConnect', {
    x: players[socket.id].p.body.position[0],
    y: players[socket.id].p.body.position[1],
    id: players[socket.id].id,
  });

  socket.on('move', onMove.bind(this, socket));

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

io.on('disconnect', (socket) => {
  delete players[socket.id];
});

function onMove(socket, moves) {
  players[socket.id].moves = moves;
}

http.listen(3000, () => {
  console.log("Hi from lolball");
});

const frame = 0;

(function tick(frame) {
  ps.tick(players);

  const dict = {};
  for (var k in players) {
    dict[k] = {
      x: players[k].p.body.position[0],
      y: players[k].p.body.position[1],
      id: players[k].id,
    };
  }

  dict['ball'] = {
    id: 'ball',
    x: ball.body.position[0],
    y: ball.body.position[1],
  }

  io.emit('serverTick', dict)

  console.log('ticking', frame++);
  setTimeout(tick.bind(this, frame), DELAY);
}(frame));

