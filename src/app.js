//require("./lolball.css");
//require("./lolball.css");

import PIXI from 'pixi.js';
import Game from './game.js';
import Keyboard from './keyboard.js';

Keyboard.init();

const g = new Game();
g.start();

