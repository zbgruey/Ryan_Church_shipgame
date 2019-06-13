export default class Ship {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.width = 22;
    this.height = 50;

    this.maxSpeed = 7;
    this.speed = 0;

    this.position = {
      x: gameWidth / 2 - this.width / 2,
      y: gameHeight - this.height - 10
    };

    this.leftClickX = null;
    this.leftClickY = null;
  }

  moveLeft() {
    this.speed = -this.maxSpeed;
  }

  moveRight() {
    this.speed = this.maxSpeed;
  }

  stop() {
    this.speed = 0;
  }

  draw(context) {
    context.fillStyle = "#07f";
    context.rotate((0 * Math.PI) / 180);
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  drawImageRot(img, x, y, width, height, deg, context) {
    //Convert degrees to radian
    var rad = (deg * Math.PI) / 180;

    //Set the origin to the center of the image
    context.translate(x + width / 2, y + height / 2);

    //Rotate the canvas around the origin
    context.rotate(rad);

    //draw the image
    context.drawImage(img, (width / 2) * -1, (height / 2) * -1, width, height);

    //reset the canvas
    context.rotate(rad * -1);
    context.translate((x + width / 2) * -1, (y + height / 2) * -1);
  }

  update(deltaTime) {
    this.position.x += this.speed;

    // left click x mover
    if (this.leftClickX != null) {
      if (Math.abs(this.position.x - this.leftClickX) < 10) {
        this.speed = 0;
        this.leftClickX = null;
      }
    }

    // don't go off the left edge of the screen
    if (this.position.x < 10) this.position.x = 10;
    // don't go off the right edge of the screen
    if (this.position.x + this.width > this.gameWidth - 10)
      this.position.x = this.gameWidth - this.width - 10;
  }

  displacement(leftClick) {
    return this.position.x - leftClick;
  }

  setLeftClick(leftclickx, leftclicky) {
    this.leftClickX = leftclickx;
    this.leftClickY = leftclicky;
  }

  moveRightApproaching(leftclickx, leftclicky) {
    this.leftClickX = leftclickx;
    this.leftClickY = leftclicky;
    this.moveRight();
  }

  moveLeftApproaching(leftclickx, leftclicky) {
    this.leftClickX = leftclickx;
    this.leftClickY = leftclicky;
    this.moveLeft();
  }

  navigate(leftclickx, leftclicky) {
    this.leftClickX = leftclickx;
    this.leftClickY = leftclicky;
    if (this.position.x > this.leftClickX) this.moveLeftApproaching(leftclickx);
    if (this.position.x < this.leftClickX)
      this.moveRightApproaching(leftclickx);
  }

  rotate() {}
}
