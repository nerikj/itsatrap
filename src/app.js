//require("./lolball.css");
//require("./lolball.css");

import PIXI from 'pixi.js';
import Game from './game.js';
import Keyboard from './keyboard.js';
import io from 'socket.io-client';

const socket = io("http://localhost:3000");

socket.on('connect', () => {
  socket.on('chat', (msg) => {
    console.log('message: ' + msg);
  });
});

Keyboard.init();

const g = new Game();
g.start();
