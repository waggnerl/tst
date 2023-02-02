class Component {
  constructor(x, y, w, h, ctx) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = "red";
    this.ctx = ctx;
    this.speedX = 0;
    this.speedY = 0;
    this.lifes = 5;
    this.img;
  }
  draw(frames) {
    const img1 = new Image();
    const img2 = new Image();
    const img3 = new Image();
    const img4 = new Image();
    const img5 = new Image();
    const img6 = new Image();
    const img7 = new Image();
    const img8 = new Image();
    const img9 = new Image();
    const img10 = new Image();
    const img11 = new Image();

    img1.addEventListener("load", () => {});
    img1.src = "docs/assets/character/1.gif";
    img2.addEventListener("load", () => {});
    img2.src = "docs/assets/character/2.gif";
    img3.addEventListener("load", () => {});
    img3.src = "docs/assets/character/3.gif";
    img4.addEventListener("load", () => {});
    img4.src = "docs/assets/character/4.gif";
    img5.addEventListener("load", () => {});
    img5.src = "docs/assets/character/5.gif";
    img6.addEventListener("load", () => {});
    img6.src = "docs/assets/character/6.gif";
    img7.addEventListener("load", () => {});
    img7.src = "docs/assets/character/7.gif";
    img8.addEventListener("load", () => {});
    img8.src = "docs/assets/character/8.gif";
    img9.addEventListener("load", () => {});
    img9.src = "docs/assets/character/9.gif";
    img10.addEventListener("load", () => {});
    img10.src = "docs/assets/character/10.gif";
    img11.addEventListener("load", () => {});
    img11.src = "docs/assets/character/11.gif";

    let images = [
      img1,
      img2,
      img3,
      img4,
      img5,
      img6,
      img7,
      img8,
      img9,
      img10,
      img11,
    ];
    this.img = images[Math.floor((frames % 30) / 4.28)];

    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }
  newPos() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0) {
      this.x = 0;
    } else if (this.x + this.width > this.canvasWidth) {
      this.x = this.canvasWidth - this.width;
    }
  }

  top() {
    return this.y;
  }

  bottom() {
    return this.y + this.h;
  }

  left() {
    return this.x;
  }

  right() {
    return this.x + this.w;
  }

  crashWith(enemy) {
    return !(
      this.bottom() < enemy.top() ||
      this.top() > enemy.bottom() ||
      this.right() < enemy.left() ||
      this.left() > enemy.right()
    );
  }
}
class Enemy {
  constructor(x, y, w, h, ctx) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = "red";
    this.ctx = ctx;
    this.speedY = 20;
    this.img;
  }

  draw(frames) {
    const img1 = new Image();
    const img2 = new Image();
    const img3 = new Image();
    const img4 = new Image();
    const img5 = new Image();
    const img6 = new Image();
    const img7 = new Image();
    const img8 = new Image();
    const img9 = new Image();
    const img10 = new Image();
    const img11 = new Image();
    const img12 = new Image();
    const img13 = new Image();
    const img14 = new Image();
    const img15 = new Image();
    const img16 = new Image();

    img1.addEventListener("load", () => {});
    img1.src = "docs/assets/enemy/1.gif";
    img2.addEventListener("load", () => {});
    img2.src = "docs/assets/enemy/2.gif";
    img3.addEventListener("load", () => {});
    img3.src = "docs/assets/enemy/3.gif";
    img4.addEventListener("load", () => {});
    img4.src = "docs/assets/enemy/4.gif";
    img5.addEventListener("load", () => {});
    img5.src = "docs/assets/enemy/5.gif";
    img6.addEventListener("load", () => {});
    img6.src = "docs/assets/enemy/6.gif";
    img7.addEventListener("load", () => {});
    img7.src = "docs/assets/enemy/7.gif";
    img8.addEventListener("load", () => {});
    img8.src = "docs/assets/enemy/8.gif";
    img9.addEventListener("load", () => {});
    img9.src = "docs/assets/enemy/9.gif";
    img10.addEventListener("load", () => {});
    img10.src = "docs/assets/enemy/10.gif";
    img11.addEventListener("load", () => {});
    img11.src = "docs/assets/enemy/11.gif";
    img12.addEventListener("load", () => {});
    img12.src = "docs/assets/enemy/12.gif";
    img13.addEventListener("load", () => {});
    img13.src = "docs/assets/enemy/13.gif";
    img14.addEventListener("load", () => {});
    img14.src = "docs/assets/enemy/14.gif";
    img15.addEventListener("load", () => {});
    img15.src = "docs/assets/enemy/15.gif";
    img16.addEventListener("load", () => {});
    img16.src = "docs/assets/enemy/16.gif";

    let images = [
      img1,
      img2,
      img3,
      img4,
      img5,
      img6,
      img7,
      img8,
      img9,
      img10,
      img11,
      img12,
      img13,
      img14,
      img15,
      img16,
    ];
    this.img = images[Math.floor((frames % 30) / 1.875)];

    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }

  newPosition() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.h;
  }
  left() {
    return this.x;
  }
  right() {
    return this.x + this.w;
  }
  crashWithBullets(Bullets) {
    return !(
      this.bottom() < Bullets.top() ||
      this.top() > Bullets.bottom() ||
      this.right() < Bullets.left() ||
      this.left() > Bullets.right()
    );
  }
  crashWithCharacter(Character) {
    return !(
      this.bottom() < Character.top() ||
      this.top() > Character.bottom() ||
      this.right() < Character.left() ||
      this.left() > Character.right()
    );
  }
}
class EnemyBullets {
  constructor(x, y, ctx) {
    this.x = x;
    this.y = y;
    this.w = 120;
    this.h = 60;
    this.bulletColor = "black";
    this.ctx = ctx;
    this.speedY = y;
    this.img;
    this.images = [];
  }
  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.h;
  }
  left() {
    return this.x;
  }
  right() {
    return this.x + this.w;
  }
  bulletsCrash(Bullets) {
    return !(
      this.bottom() < Bullets.top() ||
      this.top() > Bullets.bottom() ||
      this.right() < Bullets.left() ||
      this.left() > Bullets.right()
    );
  }

  draw(frames) {
    const img1 = new Image();
    const img2 = new Image();
    const img3 = new Image();
    const img4 = new Image();

    img1.addEventListener("load", () => {});
    img1.src = "docs/assets/laser_enemy/1.gif";
    img2.addEventListener("load", () => {});
    img2.src = "docs/assets/laser_enemy/2.gif";
    img3.addEventListener("load", () => {});
    img3.src = "docs/assets/laser_enemy/3.gif";
    img4.addEventListener("load", () => {});
    img4.src = "docs/assets/laser_enemy/4.gif";

    this.img = img1;
    this.images = [img1, img2, img3, img4];
    this.img = this.images[Math.floor((frames % 30) / 7.5)];
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }
}

class Bullet {
  constructor(x, y, ctx) {
    this.x = x;
    this.y = y;
    this.w = 8;
    this.h = 25;
    this.bulletColor = "blue";
    this.ctx = ctx;
    this.speedY = y;
    this.img;
    this.images = [];
  }
  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.h;
  }
  left() {
    return this.x;
  }
  right() {
    return this.x + this.w;
  }
  draw(frames) {
    const img1 = new Image();
    const img2 = new Image();
    const img3 = new Image();
    const img4 = new Image();

    img1.addEventListener("load", () => {});
    img1.src = "docs/assets/laser_player/1.gif";
    img2.addEventListener("load", () => {});
    img2.src = "docs/assets/laser_player/2.gif";
    img3.addEventListener("load", () => {});
    img3.src = "docs/assets/laser_player/3.gif";
    img4.addEventListener("load", () => {});
    img4.src = "docs/assets/laser_player/4.gif";

    this.img = img1;
    this.images = [img1, img2, img3, img4];
    this.img = this.images[Math.floor((frames % 30) / 7.5)];
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }
}

class Premium {
  constructor(x, y, w, h, ctx) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = "red";
    this.ctx = ctx;
    this.speedY = 40;
  }
  draw() {
    const lifeImage = new Image();
    lifeImage.src = "docs/assets/heart.png";
    ctx.drawImage(lifeImage, this.x, this.y, this.w, this.h);
  }

  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.h;
  }
  left() {
    return this.x;
  }
  right() {
    return this.x + this.w;
  }
  crashWithCharacter(Character) {
    return !(
      this.bottom() < Character.top() ||
      this.top() > Character.bottom() ||
      this.right() < Character.left() ||
      this.left() > Character.right()
    );
  }
}
