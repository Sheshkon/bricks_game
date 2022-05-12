import Game from "../js/game.js";
import Ball from "../js/ball.js";

export default class Brick {
    // strength: color
    static bricksColors = { 1: '#ff0000', 2: '#fff200', 3: '#00ff00' }
    static width = 10;
    static height = 50;

    constructor(x, y, strength = 3) {
        this.x = x;
        this.y = y;
        this.strength = strength;
        this.color = Brick.bricksColors[strength];
        this.isActive = true;
    }

    isColided(x, y, r) {
        if (x + r > this.x * Brick.width && x - r < this.x * Brick.width + Brick.width) {
            if (y + r > this.y * Brick.height && y - r < this.y * Brick.height + Brick.height) {
                return true;
            }
        }
        return false;
    }

    getIsActive() {
        return this.isActive;
    }

    doDamage() {
        console.log(this.strength);
        this.strength--;
        this.isActive = this.strength > 0 ? true : false;
        if (this.isActive)
            this.color = Brick.bricksColors[this.strength];
    }

    static resize(w, h, state) {
        if (w > h) {
            Brick.width = w / Game.W_counter;
            Brick.height = h / 4 / Game.H_counter;
        } else {
            Brick.width = w / Game.W_counter;
            Brick.height = h / 5 / Game.H_counter;
        }

        // Brick.height = h / Game.H_counter / 5;


    }
}