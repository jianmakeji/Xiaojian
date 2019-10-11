class CongratulationPart1 {
  constructor(x, y) {
    this.color = color(random(255), random(255), random(255));
    this.x = x;
    this.y = y;
    this.angle = random(10);
    this.speedX = random(-3, 3);
    this.speedY = random(-18, -10);
    this.g = random(0.2, 0.3);
    this.speedAngle = random(-0.25, 0.25);
    this.r = random(10, 15);
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedY += this.g;
    this.angle += this.speedAngle;
  }
  show() {
    push();
    rectMode(CENTER);
    fill(this.color);
    translate(this.x, this.y);
    rotate(this.angle);
    rect(0, 0, 2 * this.r, this.r);
    pop();
  }
}

class CongratulationPart2 {
  constructor(x, y) {
    this.color = color(random(255), random(255), random(255));
    this.x = x;
    this.y = y;
    this.angle = random(10);
    this.speedX = random(-7, 7);
    this.speedY = random(-25, -20);
    this.g = random(0.4, 0.5);
    this.speedAngle = random(-0.15, 0.15);
    this.r = random(10, 15);
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedY += this.g;
    this.angle += this.speedAngle;
  }
  show() {
    push();
    fill(this.color);
    translate(this.x, this.y);
    rotate(this.angle);
    triangle(0, -this.r, this.r, 6, -this.r, 6);
    pop();
  }
}

class CongratulationPart3 {
  constructor(x, y) {
    this.color = color(random(255), random(255), random(255));
    this.x = x;
    this.y = y;
    this.angle = random(10);
    this.speedX = random(-15, 15);
    this.speedY = random(-15, -10);
    this.g = random(0.4, 0.5);
    this.r = random(10, 15);
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedY += this.g;
  }
  show() {
    push();
    fill(this.color);
    translate(this.x, this.y);
    circle(0, 0, this.r);
    pop();
  }
}

class CongratulationPart4 {
  constructor(x, y) {
    this.color = color(random(255), random(255), random(255));
    this.x = x;
    this.y = y;
    this.speedX = random(-4, 4);
    this.speedY = random(-28, -20);
    this.g = random(0.4, 0.5);
    this.newX = this.x;
    this.newY = this.y;
    this.oldX = this.x;
    this.oldY = this.y;
    this.weight = random(8,12);
    this.length = random(3,12);
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedY += this.g;
  }
  show() {
    push();
    noFill();
    strokeWeight(this.weight);
    stroke(this.color);
    for(i = 1;i<this.length;i++){
      this.newX = this.x + this.speedX * i;
      this.newY = this.y + this.speedY * i + this.g * i * i;
      this.oldX = this.x + this.speedX * (i-1);
      this.oldY = this.y + this.speedY * (i-1) + this.g * (i-1) * (i-1);
      line(this.oldX,this.oldY,this.newX,this.newY);
    }
    pop();
  }
}
