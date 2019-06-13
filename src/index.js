import Ship from "/src/Ship.js";
import Laser from "/src/Laser.js";
import InputHandler from "/src/input";

let canvas = document.getElementById("gameScreen");
let context = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

let ship = new Ship(GAME_WIDTH, GAME_HEIGHT);
let laser = new Laser(GAME_WIDTH, GAME_HEIGHT, 0, 0, -10, -10);

new InputHandler(ship, laser);

let lastTime = 0;
function gameLoop(timestamp) {
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  ship.update(deltaTime);
  laser.update(deltaTime);

  ship.draw(context);
  laser.drawImageRot(context);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

//context.fillStyle = '#f00';
//context.fillRect(20, 20, 100, 100);

//context.fillStyle = '#00f';
//context.fillRect(340, 200, 50, 50);
