import Brick from "../js/brick.js";
import Game from "../js/game.js";

export default class Bricks {

    bricksList = [];

    constructor(width) {
        this.createBricks(width);
    }

    createBricks(width) {
        for (let i = 0; i < Game.H_counter; i++) {
            for (let j = 0; j < Game.W_counter; j++) {
                // if (j <= 11 && j >= 9) {
                //     continue;
                // }
                this.bricksList.push(new Brick(j, i, this.randomInt()));
            }
        }
    }

    randomInt(a = 1, b = 3) {
        return Math.floor(Math.random() * (b - a + 1) + 1);
    }


}