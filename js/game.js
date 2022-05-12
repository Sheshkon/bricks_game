import Bricks from "../js/bricks.js";
import Brick from "../js/brick.js";
import Platform from "../js/platform.js";
import Ball from "../js/ball.js";

CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
    if (w < 2 * r) r = Math.floor(w / 2);
    if (h < 2 * r) r = Math.floor(h / 2);
    this.beginPath();
    this.moveTo(x + r, y);
    this.arcTo(x + w, y, x + w, y + h, r);
    this.arcTo(x + w, y + h, x, y + h, r);
    this.arcTo(x, y + h, x, y, r);
    this.arcTo(x, y, x + w, y, r);
    this.closePath();
    return this;
}

export default class Game {
    static DPI_CONST = 2;
    static STROKE_WIDTH = 4;
    static W_counter = 5;
    static H_counter = 5;
    static w;
    static h;
    isStarted = false;
    constructor(canvas, ballCanvas, w, h) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.ballCanvas = ballCanvas;
        this.ballCtx = ballCanvas.getContext('2d');
        // this.fixDPI();

        Game.w = this.ctx.canvas.width;
        Game.h = this.ctx.canvas.height;

        this.bricks = new Bricks(this.ctx.canvas.width, this.ctx.canvas.height);
        console.log(this.bricks);
        this.platform = new Platform(this.ctx.canvas.width, this.ctx.canvas.height);
        this.ball = new Ball(this.platform.x + Math.floor(Platform.width / 2), this.platform.y,
            this.ballCtx.canvas.width, this.ballCtx.canvas.height);
        this.resize(w, h);
        this.moveLeft = false;
        this.moveRight = false;
        this.show();
        this.drawBricks();
    }

    fixDPI(state) {
        const ratio = Math.ceil(window.devicePixelRatio);
        this.canvas.width = window.innerWidth * ratio;
        this.canvas.height = window.innerHeight * ratio;
        this.ballCanvas.width = window.innerWidth * ratio;
        this.ballCanvas.height = window.innerHeight * ratio;
        // this.ballCanvas.width *= Game.DPI_CONST * this.ballCanvas.clientWidth / this.ballCanvas.clientHeight;
        // this.ballCanvas.height *= Game.DPI_CONST;
        // this.canvas.width *= Game.DPI_CONST * this.ballCanvas.clientWidth / this.ballCanvas.clientHeight;
        // this.canvas.height *= Game.DPI_CONST;
        // this.canvas.width *= (this.canvas.clientHeight / this.canvas.clientWidth);
        // this.ballCanvas.width *= (this.canvas.clientHeight / this.canvas.clientWidth);
    }

    fixAspect() {
        // this.canvas.width = this.canvas.height * (this.canvas.clientWidth / this.canvas.clientHeight);
        // this.ballCanvas.width = this.canvas.height * (this.canvas.clientWidth / this.canvas.clientHeight);

    }

    resize(w, h, state = 2) {
        this.ballCanvas.width = w;
        this.ballCanvas.height = h;
        this.canvas.width = w;
        this.canvas.height = h;

        this.fixDPI(w, h, state);
        console.log(
            this.canvas.width,
            this.canvas.height
        );
        Game.w = w;
        Game.h = h;
        Brick.resize(this.ctx.canvas.width, this.ctx.canvas.height, state);
        this.platform.resize(this.ctx.canvas.width, this.ctx.canvas.height, state)
        this.ball.resize(this.ctx.canvas.width, this.ctx.canvas.height, state)



        // this.ball.resize(this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ballCtx.clearRect(0, 0, this.ballCtx.canvas.width, this.ballCtx.canvas.height);
        this.drawBricks();
        this.show()
    }


    show() {
        this.drawBall();
        // this.drawBricks();
        this.drawPlatform();

    }

    drawBricks() {
        this.ctx.beginPath();
        this.bricks.bricksList.forEach(el => {
            if (el.isActive) {
                // this.ctx.fillStyle = 'black';
                // this.ctx.fillRect(el.x * Brick.width, el.y * Brick.height, Brick.width, Brick.height);
                this.ctx.fillStyle = el.color;
                this.ctx.fillRect(el.x * Brick.width + Game.STROKE_WIDTH, el.y * Brick.height + Game.STROKE_WIDTH, Brick.width - Game.STROKE_WIDTH * 2, Brick.height - Game.STROKE_WIDTH * 2);
                // this.ctx.strokeRect(el.x, el.y, Brick.width, Brick.height);
                // console.log(Brick.width, Brick.height, el.color);
            }
        });
        this.ctx.closePath();
    }

    redrawBrick(el) {
        this.ctx.clearRect(el.x * Brick.width, el.y * Brick.height + 1, Brick.width, Brick.height + 1);
        if (!el.isActive)
            return;
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(el.x * Brick.width, el.y * Brick.height, Brick.width, Brick.height);
        this.ctx.fillStyle = el.color;
        this.ctx.fillRect(el.x * Brick.width + Game.STROKE_WIDTH, el.y * Brick.height + Game.STROKE_WIDTH, Brick.width - Game.STROKE_WIDTH * 2, Brick.height - Game.STROKE_WIDTH * 2);

        // this.ctx.strokeRect(el.x, el.y, Brick.width, Brick.height);
    }

    drawPlatform() {
        let x = this.platform.x;
        let y = this.platform.y;
        let w = Platform.width;
        let h = Platform.height;
        this.ctx.fillStyle = Platform.color;
        this.ctx.beginPath()
        this.ctx.roundRect(x, y, w, h, h / 2).fill();
        this.ctx.roundRect(x, y, w, h, h / 2).stroke();
        this.ctx.closePath();
        // this.platform.image.onload = () =>
        //     this.ctx.drawImage(this.platform.image, x, y, w, h);
        // this.ctx.drawImage(this.platform.image, x, y, w, h);

        // console.log('platform', this.platform.x, this.platform.y, this.platform.width, this.platform.height);
    }

    drawBall() {
        this.ballCtx.beginPath();
        this.ballCtx.fillStyle = Ball.color;
        this.ballCtx.arc(this.ball.x, this.ball.y, Ball.radius, 0, Math.PI * 2);
        this.ballCtx.fill();
        // this.ballCtx.fillStyle = Ball.color;
        // this.ballCtx.fillRect(this.ball.x - Ball.radius, this.ball.y - Ball.radius, Ball.radius * 2, Ball.radius * 2);
        // this.ballCtx.closePath();

        // console.log('ball', this.ball.x, this.ball.y, Ball.radius);

    }

    move(vec) {
        let x = this.platform.x;
        let y = this.platform.y;
        let w = Platform.width;
        let h = Platform.height;
        this.ctx.clearRect(x - Game.STROKE_WIDTH, y - Game.STROKE_WIDTH, w + Game.STROKE_WIDTH * 2, h + Game.STROKE_WIDTH * 2);
        this.platform.move(vec);
    }


    paint() {
        this.ballCtx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.show();
        requestAnimationFrame(this.paint.bind(this));
    }

    ballMoving() {
        // this.ballCtx.clearRect(this.ball.x - Ball.radius * 2, this.ball.y - Ball.radius * 2, Ball.radius * 4, Ball.radius * 4);
        // for (let i = 0; i < 10; i++) {
        this.ball.move();
        this.collision();

        // }

        // this.ball.changeVec();
    }

    platformMoving() {
        if (this.moveRight)
            this.move(1);
        if (this.moveLeft)
            this.move(-1);
    }

    collision() {
        let isChangedVect = false;
        let collidedSide = null
        this.bricks.bricksList.forEach(el => {
            if (el.isActive) {
                if (el.isColided(this.ball.x, this.ball.y, Ball.radius)) {
                    if (!isChangedVect) {
                        this.ball.brickChangeVec(el.x * Brick.width, Brick.width, el.y * Brick.height, Brick.height);
                        isChangedVect = true;
                    }
                    el.doDamage();
                    this.redrawBrick(el);
                }
            }
        });





        // for (let i = 0; i < this.bricks.bricksList.length; i++) {
        //     // console.log('brickList[i]', this.bricks.bricksList);
        //     if (this.bricks.bricksList[i].isActive) {
        //         collidedSide = this.bricks.bricksList[i].isColided(this.ball.x, this.ball.y, Ball.radius);
        //         if (collidedSide) {
        //             // console.log('yep')
        //             // this.ball.changeVec(collidedSide);
        //             this.bricks.bricksList[i].doDamage();
        //             this.ball.changeVec(collidedSide);
        //             // console.log('yep')
        //             return;
        //         }
        //     }

        // }

        collidedSide = this.platform.isColided(this.ball.x, this.ball.y, Ball.radius)
        if (collidedSide) {
            console.log('platform collision', collidedSide);
            this.ball.platformChangeVec(this.platform.x, Platform.width, this.platform.y, Platform.height);
        }
    }



    start() {
        this.isStarted = true;
        this.paint();
        // this.repaintTimer = setInterval(this.paint.bind(this), 33);
        this.ballMovingTimer = setInterval(this.ballMoving.bind(this), 10);
        this.platformMovingTimer = setInterval(this.platformMoving.bind(this), 33);


        // this.collisionTimer = setInterval(this.collision.bind(this));
    }


}