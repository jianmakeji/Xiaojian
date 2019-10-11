let points = [];
let hitParticles = [];
let basketBoards = [];
let basketballImprinting;
let DialogueNears = [];
let DialogueFars = [];
let congratulationParts = [];
let Hiting;
let PositionXs = [];

function preload() {
  bg = loadImage('images/Background.png');
  board = loadImage('images/Board.png');
  arrow = loadImage('images/Arrow.png');
  basketballImprinting = loadImage('images/basketball-Imprinting.png');
  hitRight = loadSound('audios/sounds/hitRight.mp3');
  hitWrong = loadSound('audios/sounds/hitWrong.mp3');
  for (i = 0; i < 2; i++) {
    DialogueNears[i] = loadImage(`images/DialogueNear${i}.png`);
  }
  for (i = 0; i < 2; i++) {
    DialogueFars[i] = loadImage(`images/DialogueFar${i}.png`);
  }
}

function setup() {
  frameRate(120);
  createCanvas(windowWidth, windowHeight);
  noStroke();
  for (let i = 100; i < windowWidth - 100; i += (windowWidth-200)/5) {
    PositionXs.push(i+(windowWidth-200)/8-120);
  }
  for (let i = 0; i < 3; i++) {
    let x = random(PositionXs);
    let y = random(100, windowHeight / 2);
    PositionXs.splice(PositionXs.indexOf(x), 1);
    let b = new BasketBoard(x, y);
    basketBoards.push(b);
  }
  // dialogue = new Dialogue(0);
  Hiting = false;
}

function draw() {

  background(160, 220, 255);
  image(bg, 0, 0, width, height);

  for (let b of basketBoards) {
    b.show();
  }

  if (basketBoards[1].intersect(basketBoards[2])) {}

  for (let p of points) {
    p.update();
    p.show();
  }
  for (let c of congratulationParts) {
    c.update();
    c.show();
  }

  if(points.length > 5){
    points.shift();
  }

  for (let i = hitParticles.length - 1; i >= 0; i--) {
    hitParticles[i].update();
    hitParticles[i].show();
    if (hitParticles[i].alpha < 0) {
      hitParticles.splice(i, 1);
    }
  }

  for (let b of basketBoards) {
    if (b.isHit) {
      if (b.y < windowHeight) {
        b.y += (windowHeight + 20 - b.y) / 10;
      }
    }
  }

  // dialogue.show();

  for (i = 0; i < congratulationParts.length; i++) {
    if (congratulationParts[i].y > windowHeight + 10) {
      congratulationParts.splice(i, 1);
    }
  }
  for(b of basketBoards){
    if (congratulationParts.length == 0 && b.isHit) {


    }
  }
  for(b of basketBoards){
    if(b.isHit && b.y > windowHeight){
      // points.splice(0, points.length);
      let oldX = b.x;
      let x = random(PositionXs);
      let y = random(100, windowHeight / 2);
      PositionXs.splice(PositionXs.indexOf(x), 1);
      let newB = new BasketBoard(x, y);
      basketBoards.splice(basketBoards.indexOf(b),1,newB);
      PositionXs.push(oldX);
      Hiting = false;
    }
  }
}

function mousePressed() {
  for (let b of basketBoards) {
    if (b.ishit()) {
      hitRight.play();
      b.isHit = true;
      for (let i = 0; i < 25; i++) {
        let part = new Particle(mouseX, mouseY);
        hitParticles.push(part);
      }
      for (let i = 0; i < 25; i++) {
        let c1 = new CongratulationPart1(b.x + b.width / 2, windowHeight + 10);
        congratulationParts.push(c1);
      }
      for (let i = 0; i < 25; i++) {
        let c2 = new CongratulationPart2(b.x + b.width / 2, windowHeight + 10);
        congratulationParts.push(c2);
      }
      for (let i = 0; i < 25; i++) {
        let c3 = new CongratulationPart3(b.x + b.width / 2, windowHeight + 10);
        congratulationParts.push(c3);
      }
      for (let i = 0; i < 7; i++) {
        let c4 = new CongratulationPart4(b.x + b.width / 2, windowHeight + 10);
        congratulationParts.push(c4);
      }
      Hiting = true;
    }
  }
  if (!Hiting) {
    let p = new Point(mouseX, mouseY);
    points.push(p);
    hitWrong.play();
    // if (dist(mouseX, mouseY, b.x + b.width / 2, b.y + b.height / 2) > 300) {
    //   dialogue = new Dialogue(mouseX - dialogue.width / 2, mouseY - dialogue.height / 2, millis(), random(DialogueFars));
    // } else {
    //   dialogue = new Dialogue(mouseX - dialogue.width / 2, mouseY - dialogue.height / 2, millis(), random(DialogueNears));
    // }
    // dialogue.isShow = true;
  }
}

// class Dialogue {
//   constructor(x, y, showTime, img = random(DialogueNears)) {
//     this.img = img;
//     this.width = 250;
//     this.height = 75;
//     this.isShow = false;
//     this.showTime = showTime;
//     this.x = x;
//     this.y = y;
//   }
//   show() {
//     if (this.isShow) {
//       image(this.img, this.x, this.y, this.width, this.height);
//       if (millis() - this.showTime > 1000) {
//         this.closeShow();
//       }
//     }
//   }
//   closeShow() {
//     this.isShow = false;
//   }
// }
