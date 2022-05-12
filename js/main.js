import Game from "../js/game.js"
import Platform from "../js/platform.js";
const canvas = document.getElementById('game_field');
const ballCanvas = document.getElementById('ball_canvas');
console.log(canvas);
const game = new Game(canvas, ballCanvas, window.innerWidth, window.innerHeight);
game.show();


const canvases = document.querySelectorAll('canvas');
resizeHandler();
window.addEventListener('keydown', keydownHandler);
window.addEventListener('keyup', keyUpHandler);
window.addEventListener('resize', resizeHandler);

window.addEventListener("touchstart", handleTouch);

function handleTouch() {
    if (!game.isStarted)
        game.start();
    window.removeEventListener("touchstart", handleTouch);
    console.log('touch listener');
}

document.addEventListener('touchmove', (event) => {
    // If there's exactly one finger inside this element
    // if (event.targetTouches.length == 1) {

    let w = game.canvas.width;
    let scaleX = w / document.body.clientWidth;
    var touch = event.targetTouches[0];
    // Place element where the finger is
    // console.log('scaleX', scaleX);
    game.move(0);
    if (touch.pageX * scaleX < 0 || touch.pageX * scaleX + Platform.width > w)
        return;
    game.platform.x = touch.pageX * scaleX;

    // game.move(1);
    // game.platform.y = touch.pageY + 'px';
    // }
}, false);

function resizeHandler() {
    let w = window.innerWidth;
    let h = window.innerHeight;

    if (w > h) {
        canvases.forEach(cws => {

            cws.style.height = '100%';
            cws.style.width = '50cw';
            // cws.style.transform = 'translateX(50%)';
        });
        game.resize(window.innerWidth, window.innerHeight, 1);
    } else {
        canvases.forEach(cws => {
            cws.style.width = '100%';
            cws.style.height = '100%';
            cws.style.transform = 'none';
        });
    }
    game.resize(window.innerWidth, window.innerHeight, 2);

}

function keydownHandler(event) {
    let name = event.key;
    let code = event.code;

    if (name == 'ArrowLeft') {
        game.moveLeft = true;
        // game.move(-1);

        // if (!isLeftPushed) {
        //     console.log('create left timer');
        //     leftMoveTimer.push(
        //         setInterval(() => {
        //             game.move(-1);
        //         }, MOVE_SPEED)
        //     );
        //     isLeftPushed = true;
        // }

    }

    if (name == 'ArrowRight') {
        game.moveRight = true;
        // game.move(1);
        // if (!isRightPushed) {
        //     console.log('create right timer')
        //     rightMoveTimer.push(
        //         setInterval(() => {
        //             game.move(1);
        //         }, MOVE_SPEED)
        //     );
        //     isRightPushed = true;
        // }
    }

    if (code == 'Space') {
        if (game.isStarted)
            return;
        game.start();
    }
}


function keyUpHandler(event) {
    let name = event.key;
    let code = event.code;

    if (name == 'ArrowLeft') {
        // leftMoveTimer.forEach(el => {
        //     clearInterval(el);
        // });
        // isLeftPushed = false;
        game.moveLeft = false;

    }

    if (name == 'ArrowRight') {
        // rightMoveTimer.forEach(el => {
        //     clearInterval(el);
        // });

        // isRightPushed = false;

        game.moveRight = false;
    }
}