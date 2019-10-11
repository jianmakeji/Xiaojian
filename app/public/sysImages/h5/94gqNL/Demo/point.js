class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 60;
    this.alpha = 255;
    this.color = color(225, 150, 50, this.alpha);
    this.img = basketballImprinting;
    this.rotateAngle = random(0, PI);
    this.imprintingR = random(30, 50);
  }
  update() {
    this.alpha -= (this.alpha - 0) / 12;
    this.color = color(100, 150, 200, this.alpha);
    if (this.alpha > 0) {
      this.r += 1;
    }
  }
  show() {
    push();
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.r);
    imageMode(CENTER);
    translate(this.x, this.y);
    rotate(this.rotateAngle);
    image(this.img, 0, 0, this.imprintingR, this.imprintingR);
    pop();
  }
}

class Particle {
  constructor(x, y) {
    // this.img = img;
    this.x = x;
    this.y = y;
    this.r = random(5, 40);
    this.speedX = random(-15, 15);
    this.speedY = random(-15, 15);
    this.alpha = 255;
    this.clrR = random(200, 255);
    this.clrG = random(75, 150);
    this.clrB = random(0, 50);
  }
  update() {
    this.speedX *= 0.92;
    this.speedY *= 0.92;
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha -= 5;
  }
  show() {
    push();
    fill(this.clrR, this.clrG, this.clrB, this.alpha);
    noStroke();
    ellipse(this.x, this.y, this.r);
    pop();
    // image(this.img,this.x,this.y);
  }
}
