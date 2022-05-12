export default class Platform {
    static MOVE_VALUE = 30;
    static width = 200;
    static height = 30;
    static color = '#0320fc';

    constructor(w, h) {
        this.image = new Image()
            // this.image.src = 'img/platform.svg';
        Platform.gameWidth = w;
        Platform.gameHeight = h;
        Platform.width = w / 4;
        Platform.height = w / 20;
        this.x = (w - Platform.width) / 2;
        this.y = h * 0.90 - Platform.height;
    }

    resize(w, h) {
        let scaleY = h / Platform.gameHeight;
        let scaleX = w / Platform.gameWidth;
        this.y *= scaleY;
        this.x *= scaleX;
        Platform.gameWidth = w;
        Platform.gameHeight = h;
        Platform.width = w / 6;
        Platform.height = w / 30;
        Platform.MOVE_VALUE = Platform.width / 5;
        // this.y = Math.floor(h * 0.90 - Platform.height);
    }


    move(vec) {
        if (vec > 0) {
            if (this.x + Platform.MOVE_VALUE < Platform.gameWidth - Platform.width) {
                this.x += Platform.MOVE_VALUE;
            } else {
                this.x = Platform.gameWidth - Platform.width;
            }
        } else if (vec < 0) {
            if (this.x - Platform.MOVE_VALUE >= 0) {
                this.x -= Platform.MOVE_VALUE;
            } else {
                this.x = 0;
            }
        }

    }

    isColided(x, y, r) {
        if (x + r > this.x && x - r < this.x + Platform.width) {
            if (y + r > this.y && y - r < this.y + Platform.height) {
                return true;
            }
        }
        return false;

        // if (x - r > this.x && x + r < this.x + Platform.width) {
        //     if (y + r > this.y && y + r < this.y + 5) {
        //         return 1;
        //     }

        //     if (y - r > this.y + Platform.height - 5 && y - r < this.y + Platform.height) {
        //         return 3
        //     }
        // }

        // if (y + r > this.y && y - r < this.y + Platform.height) {
        //     if (x + r > this.x && x + r < this.x + 5) {
        //         return 2;
        //     }

        //     if (x - r > this.x + Platform.width - 5 && x - r < this.x + Platform.width) {
        //         return 4
        //     }
        // }

    }

}