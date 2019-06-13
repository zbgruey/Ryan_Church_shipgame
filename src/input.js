import Ship from "./Ship";
import Laser from "./Laser";
import { SSL_OP_LEGACY_SERVER_CONNECT } from "constants";

export default class InputHandler {
  constructor(ship, laser, context) {
    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 37:
          ship.moveLeft();
          break;

        case 39:
          ship.moveRight();
          break;
      }
    });

    document.addEventListener("keyup", event => {
      switch (event.keyCode) {
        case 37:
          if (ship.speed < 0) ship.stop();
          break;

        case 39:
          if (ship.speed > 0) ship.stop();
          break;
      }
    });

    document.addEventListener("mousedown", event => {
      //////alert("You pressed button: " + event.button);
      if (ship.displacement(event.clientX) > 0) {
        ship.moveLeftApproaching(event.clientX);
      }
      if (ship.displacement(event.clientX) < 0) {
        ship.moveRightApproaching(event.clientX);
      }

      laser.findAngle(
        ship.position.x + ship.width / 2,
        ship.position.y,
        event.clientX,
        event.clientY
      );

      laser.shoot();
    });

    document.addEventListener("mouseup", event => {
      // todo
    });

    document.addEventListener("mousemove", function(event) {
      if (
        event.buttons == 1 ||
        (event.buttons == 1 && 3) ||
        event.buttons == 3
      ) {
        ship.navigate(event.clientX, event.clientY);
      }
    });

    document.addEventListener("contextmenu", function(event) {
      return false;
    });
  }
}
