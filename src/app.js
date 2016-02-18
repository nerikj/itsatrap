//require("./lolball.css");
//require("./lolball.css");

import PIXI from 'pixi.js';
import Game from './game.js';
import Keyboard from './keyboard.js';

Keyboard.init();

const g = new Game();
g.start();

String.prototype.hexEncode = function(){
    var hex, i;

    var result = "";
    for (i=0; i<this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += ("000"+hex).slice(-4);
    }

    return result
}
