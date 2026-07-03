const bird = document.querySelector("#bird");
const game = document.querySelector(".game");
const gameover = document.querySelector(".gameover");
const scoreboard = document.querySelector("#score");
const finalscore = document.querySelector("h2");
let jumpSound = new Audio("modimodikid.mp3");
let birdtop = 0;
let velocity = 0;
let gravity = 0.3;
let gameOver = false;
let btn = document.querySelector("button");
let score = 0;
let maxscore = 0;
bird.style.left = "40px";

function stop() {
  jumpSound.pause();
  jumpSound.currentTime = 0;
  scoreboard.style.display = "none";
  gameover.style.display = "flex";
  gameover.style.flexDirection = "column";
  gameover.style.alignItems = "center";
  gameover.style.justifyContent = "center";
  gameover.style.gap = "2rem";
  finalscore.textContent = "SCORE: " + score;
  btn.addEventListener("click", () => {
    location.reload();
  });
}

setInterval(() => {
  velocity += gravity;
  birdtop += velocity;

  bird.style.top = birdtop + "px";
  let birdRect = bird.getBoundingClientRect();
  let gameRect = game.getBoundingClientRect();
  if (
    !gameOver &&
    (birdRect.top < gameRect.top || birdRect.bottom > gameRect.bottom)
  ) {
    gameOver = true;
    stop();
  }
}, 16);

document.addEventListener("keydown", (e) => {
  if (e.key == " ") {
    velocity = -5;
    if (jumpSound.currentTime === 0 || jumpSound.ended) {
      jumpSound.play();
    }
  }
});
document.addEventListener("touchstart", (e) => {
    velocity = -5;
    if (jumpSound.currentTime === 0 || jumpSound.ended) {
      jumpSound.play();
    }
  }
);

function createPipe() {
  let scored = false;
  const topPipe = document.createElement("div");
  const bottomPipe = document.createElement("div");

  topPipe.style.backgroundImage = 'url("rahul.png")';
  topPipe.style.backgroundSize = "cover";
  topPipe.style.backgroundPosition = "center";
  topPipe.style.backgroundRepeat = "no-repeat";

  topPipe.style.top = "0";

  bottomPipe.style.backgroundImage = 'url("rahul.png")';
  bottomPipe.style.backgroundSize = "cover";
  bottomPipe.style.backgroundPosition = "center";
  bottomPipe.style.backgroundRepeat = "no-repeat";

  bottomPipe.style.bottom = "0";
  topPipe.className = "pipe";
  bottomPipe.className = "pipe";
  let maxHeight = game.clientHeight;
  let gap = 180;
  const minPipeHeight = 50;
  const maxTopPipeHeight = maxHeight - gap - minPipeHeight;
  const topHeight =
    Math.floor(Math.random() * (maxTopPipeHeight - minPipeHeight)) +
    minPipeHeight;
  const bottomHeight = maxHeight - topHeight - gap;
  topPipe.style.height = topHeight + "px";
  bottomPipe.style.height = bottomHeight + "px";
  game.append(topPipe, bottomPipe);
  let pipeLeft = game.clientWidth;
  topPipe.style.left = pipeLeft + "px";
  bottomPipe.style.left = pipeLeft + "px";
  let move = setInterval(() => {
    pipeLeft -= 2;
    topPipe.style.left = pipeLeft + "px";
    bottomPipe.style.left = pipeLeft + "px";

    let pipeTop = topPipe.getBoundingClientRect();
    let pipeBottom = bottomPipe.getBoundingClientRect();
    let birdRect = bird.getBoundingClientRect();
    let gameRect = game.getBoundingClientRect();

    if (
      !gameOver &&
      birdRect.right > pipeTop.left &&
      birdRect.left < pipeTop.right &&
      birdRect.bottom > pipeTop.top &&
      birdRect.top < pipeTop.bottom
    ) {
      gameOver = true;
      stop();
    }
    if (
      !gameOver &&
      birdRect.right > pipeBottom.left &&
      birdRect.left < pipeBottom.right &&
      birdRect.bottom > pipeBottom.top &&
      birdRect.top < pipeBottom.bottom
    ) {
      gameOver = true;
      stop();
    }

    if (pipeLeft < -topPipe.offsetWidth) {
      clearInterval(move);
      topPipe.remove();
      bottomPipe.remove();
    }

    if (!scored && pipeLeft + topPipe.offsetWidth < bird.offsetLeft) {
      score++;
      scored = true;

      document.querySelector("#score").textContent = score;
    }
  }, 16);
}
setInterval(createPipe, 2000);
