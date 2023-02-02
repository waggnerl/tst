class Game {
  constructor(ctx, width, height, player, difficulty) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.player = player;
    this.intervalId = null;
    this.frames = 0;
    this.enemies = [];
    this.premiums = [];
    this.points = 0;
    this.bullets = [];
    this.enemyBullets = [];
    this.difficulty = difficulty;
    this.gameIsPaused = false;
  }

  start() {
    this.intervalId = setInterval(this.update, 1000 / 20);
  }

  update = () => {
    if (!this.gameIsPaused) {
      this.frames += 1;
      this.clear();
      this.player.newPos();
      this.player.draw(this.frames);
      this.changeEnemies();
      this.checkGameOver();
      this.countPoints();
      this.drawScore();
      this.updateBullets();
      this.updateEnemyBullets();
      this.retireEnimies();
      this.changePremiums();
      this.retirePremium();
      this.retireBullets();
      this.retireEnimiesByBeat();
      this.retireEnimiesByBullet();
    }
  };

  stop() {
    clearInterval(this.intervalId);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  pauseGame() {
    if (this.gameIsPaused === false) {
      this.stop();
      let gameBoard = document.querySelector("#game-board");

      let divFinal = document.createElement("div");
      let divFinalScore = document.createElement("div");
      let divFinalImage = document.createElement("div");
      let button = document.createElement("button");
      divFinalImage.classList.add("pause_image");
      divFinalScore.classList.add("end-container");
      button.classList.add("pause_button");

      let title = document.createElement("p");
      button.innerHTML = "CONTINUE";
      title.innerHTML = `DON'T GIVE UP NOW THE UNIVERSE, THE WORLD NEEDS YOU`;

      divFinal.classList.add("container-final-score");
      title.classList.add("title");

      gameBoard.appendChild(divFinal);
      divFinal.appendChild(divFinalImage);
      divFinal.appendChild(divFinalScore);
      divFinalScore.appendChild(title);
      divFinalScore.appendChild(button);
      document.querySelector(".header-container>button").style.display = "none";
      document.querySelector(".pause_button").onclick = () => this.pauseGame();
      return (this.gameIsPaused = true);
    }
    if (this.gameIsPaused === true) {
      document.querySelector(".container-final-score").remove();
      this.start();
      document.querySelector(".header-container>button").style.display = "flex";
      return (this.gameIsPaused = false);
    }
  }

  changeEnemies() {
    this.enemies.forEach((el, index) => {
      if (el.y >= 700) {
        this.enemies.splice(index, 1);
      }
      el.y += 10;
      el.draw(this.frames);
    });

    if ((this.frames % 2) / this.difficulty === 0) {
      if (this.enemies.length && this.difficulty > 5) {
        this.enemyShoot(
          this.enemies[Math.floor(Math.random() * this.enemies.length)]
        );
      }
      let randomSize = Math.floor(Math.random() * 150 - 100) + 100;
      let randomX =
        Math.floor(Math.random() * this.width - randomSize) + randomSize;

      this.enemies.push(new Enemy(randomX, 0 - 20, 80, 90, this.ctx));
    }
  }

  changePremiums() {
    this.premiums.forEach((el, index) => {
      if (el.y >= 700) {
        this.premiums.splice(index, 1);
      }
      el.y += 10;
      el.draw();
    });

    if (this.frames % 80 === 0) {
      let randomSize = Math.floor(Math.random() * 150 - 100) + 100;
      let randomX =
        Math.floor(Math.random() * this.width - randomSize) + randomSize;

      this.premiums.push(new Premium(randomX, 0 - 40, 40, 40, this.ctx));
    }
  }

  countPoints() {
    if (this.frames % 30 === 0) {
      this.points++;
    }
  }

  checkLifes() {
    this.player.lifes--;
    if (document.querySelector(".heart"))
      document.querySelector(".heart").remove();
    let song = new Audio("./docs/assets/sounds/low-impact.mp3");
    song.play();
  }

  drawScore() {
    if (document.querySelector(".score")) {
      document.querySelector(".score>p").remove();
    }
    let scoreBoard = document.querySelector(".score");
    let title = document.createElement("p");
    title.innerHTML = `${this.points}`;
    scoreBoard.appendChild(title);
  }

  checkGameOver() {
    if (this.points >= 200) {
      this.stop();
      let gameBoard = document.querySelector("#game-board");

      let divFinal = document.createElement("div");
      let divFinalScore = document.createElement("div");
      let divFinalImage = document.createElement("div");
      divFinalImage.classList.add("win_and_start_image");
      divFinalScore.classList.add("end-container");

      let title = document.createElement("p");

      title.innerHTML = `CONGRACTULATION, YOU SAVED THE UNIVERSE`;

      divFinal.classList.add("container-final-score");
      title.classList.add("title");

      gameBoard.appendChild(divFinal);
      divFinal.appendChild(divFinalImage);
      divFinal.appendChild(divFinalScore);
      divFinalScore.appendChild(title);

      return true;
    }

    if (this.player.lifes <= 0) {
      this.stop();
      let gameBoard = document.querySelector("#game-board");
      let divFinal = document.createElement("div");
      let divFinalScore = document.createElement("div");
      let divFinalImage = document.createElement("div");
      divFinalImage.classList.add("lose_image");
      divFinalScore.classList.add("end-container");

      let title = document.createElement("p");

      let restartGameText = document.createElement("p");

      title.innerHTML = `YOU SCORED ${this.points} POINTS`;
      restartGameText.innerHTML =
        "You have failed earth, the universe is lost. Press SPACE to restart the game";
      divFinal.classList.add("container-final-score");
      title.classList.add("title");
      restartGameText.classList.add("restart-game-text");

      gameBoard.appendChild(divFinal);
      divFinal.appendChild(divFinalImage);
      divFinal.appendChild(divFinalScore);
      divFinalScore.appendChild(title);
      divFinalScore.appendChild(restartGameText);

      return true;
    }
    return false;
  }

  updateBullets() {
    for (let i = 0; i < this.bullets.length; i++) {
      this.bullets[i].draw(this.frames);
      this.bullets[i].y -= 4;

      if (this.bullets[i].y < 0 || this.bullets[i].y > canvas.height) {
        this.bullets.splice(i, 1);
      }
    }
  }

  updateEnemyBullets() {
    for (let i = 0; i < this.enemyBullets.length; i++) {
      this.enemyBullets[i].draw(this.frames);
      (this.enemyBullets[i].y += 15) * this.difficulty;

      if (
        this.enemyBullets[i].y < 0 ||
        this.enemyBullets[i].y > canvas.height
      ) {
        this.enemyBullets.splice(i, 1);
      }
    }
  }

  shoot() {
    this.bullets.push(
      new Bullet(this.player.x + this.player.w / 2, this.player.y, this.ctx)
    );
  }

  enemyShoot(enemy) {
    this.enemyBullets.push(
      new EnemyBullets(enemy.x + enemy.w / 2, enemy.y, this.ctx)
    );
  }

  retireEnimies() {
    for (let i = 0; i < this.bullets.length; i++) {
      for (let j = 0; j < this.enemies.length; j++) {
        if (this.enemies[j].crashWithBullets(this.bullets[i])) {
          this.enemies.splice(j, 1);
          this.bullets.splice(i, 1);
          break;
        }
      }
    }
  }

  retireBullets() {
    for (let i = 0; i < this.bullets.length; i++) {
      for (let j = 0; j < this.enemyBullets.length; j++) {
        if (this.enemyBullets[j].bulletsCrash(this.bullets[i])) {
          this.enemyBullets.splice(j, 1);
          this.bullets.splice(i, 1);
        }
      }
    }
  }

  retirePremium() {
    this.premiums.forEach((el, index) => {
      if (el.crashWithCharacter(this.player)) {
        this.premiums.splice(el, 1);
        const heartContainer = document.querySelector(".heart-container");
        const img = document.createElement("img");
        img.src = "docs/assets/eart_lifes.gif";
        img.classList.add("heart");
        heartContainer.appendChild(img);
        let song = new Audio("./docs/assets/sounds/Replenish.ogg");
        song.play();
        this.player.lifes++;
      }
    });
  }

  retireEnimiesByBeat() {
    const crashed = this.enemies.some((enemy, index) => {
      if (this.player.crashWith(enemy)) this.enemies.splice(index, 1);
      return this.player.crashWith(enemy);
    });
    if (crashed) this.checkLifes();
  }

  retireEnimiesByBullet() {
    const crashed = this.enemyBullets.some((enemyBullets, index) => {
      if (this.player.crashWith(enemyBullets))
        this.enemyBullets.splice(index, 1);
      return this.player.crashWith(enemyBullets);
    });
    if (crashed) this.checkLifes();
  }
}
