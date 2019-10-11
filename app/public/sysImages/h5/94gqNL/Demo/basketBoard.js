class BasketBoard {
  constructor(x,y) {
    this.width = 240;
    this.height = 200;
    this.x = x;
    this.y = windowHeight;
    this.flowY = 20;
    this.flowSpeed = 0.5;
    this.newPosX = x;
    this.newPosY = y;
    this.isHit = false;
  }
  show() {
    //Slid in from bottom
    if (this.y > this.newPosY && !this.isHit) {
      this.y += (this.newPosY - this.y) / 10;
    }
    //Basketball stands
    push();
    fill(50, 50, 100);
    stroke(0);
    strokeWeight(4);
    rect(this.x + this.width / 2 - 50, this.y + 5, 100, windowHeight - this.y);
    pop();
    image(board, this.x, this.y, this.width, this.height);
    //Arrow
    if (this.flowY < 15) {
      this.flowSpeed = this.flowSpeed * -1;
    }
    if (this.flowY > 35) {
      this.flowSpeed = this.flowSpeed * -1;
    }
    this.flowY += this.flowSpeed;
    image(arrow, this.x + this.width / 2 - 20, this.y + this.flowY, 40, 60);
  }
  ishit() {
    return (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height)
  }
  intersect(other) {
    return (abs(this.newPosX - other.newPosX) < 340 || abs(this.newPosY - other.newPosY) < 300);
  }
}
