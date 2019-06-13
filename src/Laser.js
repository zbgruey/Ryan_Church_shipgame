import Ship from "/src/Ship.js";

export default class Laser {
  // create a laser with a trajectory parameter
  constructor(gameWidth, gameHeight, trajectoryx, trajectoryy, shipx, shipy) {
    this.position = { x: shipx, y: shipy };
    this.destination = { x: shipx, y: shipy };
    this.trajectory = { x: trajectoryx, y: trajectoryy };
    this.angle = 0;

    this.length = 30;
    this.width = 2;

    this.speed = 25;
  }

  draw(context) {
    var img = document.getElementById("img_laser");
    context.drawImage(img, this.position.x, this.position.y);
  }

  findAngle(startx, starty, endx, endy) {
    // set starting position and destination of laser
    this.position = { x: startx, y: starty };
    this.destination = { x: endx, y: endy };

    // calculate angle of laser
    var xcomp = this.destination.x - this.position.x;
    var ycomp = this.destination.y - this.position.y;
    this.angle = -Math.atan(xcomp / ycomp);
  }

  drawImageRot(context) {
    var img = document.getElementById("img_laser");
    //Set the origin to the lasers location
    context.translate(this.position.x, this.position.y);

    //Rotate the canvas around the origin
    context.rotate(this.angle);

    //draw the image
    context.drawImage(img, 0, 0);

    //reset the canvas
    context.rotate(-1 * this.angle);
    context.translate(-1 * this.position.x, -1 * this.position.y);
  }

  //
  shoot() {
    this.trajectory.x = this.speed * Math.sin(this.angle);
    this.trajectory.y = -this.speed * Math.cos(this.angle);
  }

  update(deltaTime) {
    this.position.x += this.trajectory.x;
    this.position.y += this.trajectory.y;
  }
}
