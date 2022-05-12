export default class Ball {
    static radius = 1;
    static color = '#ffffff';
    static eps = 0.1;


    constructor(x, y, gameWidth, gameHeight) {
        Ball.radius = gameWidth / 200;
        Ball.gameWidth = gameWidth;
        Ball.gameHeight = gameHeight;
        this.x = x;
        this.y = y;
        this.speed = Ball.radius / 2;
        this.dx = (Math.random()) * this.speed;
        this.dy = -this.speed;
    }

    resize(w, h) {
        let scaleY = h / Ball.gameHeight;
        let scaleX = w / Ball.gameWidth;
        this.y *= scaleY;
        this.x *= scaleX;
        this.dx *= scaleX;
        this.dy *= scaleY;
        Ball.gameWidth = w;
        Ball.gameHeight = h;
        if (w > h)
            Ball.radius = h / 50;
        else
            Ball.radius = w / 50;
        this.speed = Ball.radius / 2;

    }


    move() {
        this.x += this.dx;
        this.y += this.dy;
        if (this.x < Ball.radius) {
            this.dx = Math.abs(this.dx);
        } else if (this.x > Ball.gameWidth - Ball.radius) {
            this.dx = -Math.abs(this.dx);
        } else if (this.y < Ball.radius) {
            this.dy = Math.abs(this.dy);
        } else if (this.y > Ball.gameHeight - Ball.radius) {
            this.dy = -Math.abs(this.dy);
        }


    }

    platformChangeVec(x, w, y, h) {
        let centerX = x + w / 2;
        let centerY = y + h / 2;
        let collidePoint = (this.x - centerX) / (w / 2);
        let angle = collidePoint * (Math.PI / 3);
        console.log('collidePoint', collidePoint);
        if (this.y > centerY) {
            this.dx = this.speed * Math.sin(angle);
            this.dy = this.speed * Math.cos(angle);
            return;
        }
        this.dx = this.speed * Math.sin(angle);
        this.dy = -this.speed * Math.cos(angle);

        console.log('change vec');
        // let changingVect = Ball.vectDict[side % 2];

        // this.vec[0] *= changingVect[0];
        // this.vec[1] *= changingVect[1];

        this.move();
    }

    brickChangeVec(x, w, y, h) {
        let centerX = x + w / 2;
        let centerY = y + h / 2;
        let xDiff = (this.x - centerX) / w;
        let yDiff = (this.y - centerY) / h;

        let diff = Math.abs(xDiff) - Math.abs(yDiff)
            // if (Math.abs(diff) < Ball.eps) {
            //     this.dx *= -1;
            //     this.dy *= -1;
            // } else
        if (diff > 0) {
            if (xDiff > 0) {
                this.dx = Math.abs(this.dx);
            } else if (xDiff < 0) {
                this.dx = -Math.abs(this.dx);
            }
        } else {
            if (yDiff > 0) {
                this.dy = Math.abs(this.dy);
            } else {
                this.dy = -Math.abs(this.dy);
            }
        }
        this.move();



    }
}