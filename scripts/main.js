const canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d");
const gamePlayer = new Component(375, 600, 100, 100);
let game = null;
const generateDefaultLifes = () => {
  let heartContainer = document.querySelector(".heart-container");
  let i = 5;
  while (i > 0) {
    i--;
    let img = document.createElement("img");
    img.src = "docs/assets/eart_lifes.gif";
    img.classList.add("heart");
    heartContainer.appendChild(img);
  }
};

let difficulty = 3;
const checkGameDifficulty = (selected) => {
  difficulty = selected;
  return;
};

let song = new Audio("./docs/assets/sounds/magic-space.mp3");
song.loop = true;
window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    document.querySelector(".container-start").remove();
    startGame();
    document.querySelector(".header-container").style.display = "flex";
  };

  function startGame() {
    game = new Game(ctx, 800, 700, gamePlayer, difficulty);
    song.play();
    game.start();
    let stopButton = document.querySelector(".header-container button");

    if (document.querySelector(".pause_button"))
      document.querySelector(".pause_button").onclick = () => game.pauseGame();
    stopButton.onclick = () => game.pauseGame();

    document.addEventListener("keydown", (e) => {
      if (e.code === "Space" && game.checkGameOver()) {
        let containerFinalScoreArray = document.querySelectorAll(
          ".container-final-score"
        );
        for (let i = 0; i < containerFinalScoreArray.length; i++) {
          containerFinalScoreArray[i].remove();
        }
        let lifes = document.querySelectorAll(".heart");
        let lifesArray = [...lifes];
        lifesArray.forEach((el) => el.remove());
        generateDefaultLifes();
        gamePlayer.lifes = 5;
        startGame();
        gamePlayer.x = 375;
        gamePlayer.y = 600;
      }
    });
  }
};

document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "KeyA":
      if (gamePlayer.x < 25) {
        gamePlayer.speedX = 0;
      } else {
        gamePlayer.speedX -= 3;
      }
      break;
    case "KeyD":
      if (gamePlayer.x > 700) {
        gamePlayer.speedX = 0;
      } else {
        gamePlayer.speedX += 6;
      }
      break;
    case "KeyW":
      if (gamePlayer.y <= 100) {
        gamePlayer.speedY = 0;
      } else {
        gamePlayer.speedY -= 6;
      }
      break;
    case "KeyS":
      if (gamePlayer.y >= 600) {
        gamePlayer.speedY = 0;
      } else {
        gamePlayer.speedY += 6;
      }
      break;
  }
});

document.addEventListener("mousedown", function (evt) {
  if (game) {
    if (evt.button == 0) {
      game.shoot();
    }
  }
});

document.addEventListener("keyup", () => {
  gamePlayer.speedX = 0;
  gamePlayer.speedY = 0;
});
