const WORLD = {
  peak: { x: 640, y: 360 },
};
const SPEED = 4;
const DIRECTION = { x: 1, y: 0 };

const score = document.getElementById("score");
const main = document.getElementById("main");
const ctx = main.getContext("2d");

const player = new Player();
const star = new Star();

const navigation = {
  "ArrowUp"   : () => (player._dir.x =  0, player._dir.y = -1),
  "ArrowDown" : () => (player._dir.x =  0, player._dir.y =  1),
  "ArrowLeft" : () => (player._dir.x = -1, player._dir.y =  0),
  "ArrowRight": () => (player._dir.x =  1, player._dir.y =  0),
};


window.addEventListener("keydown", ({ key, keyCode }) => {
  // loop = undefined;

  // Do nothing if key pressed isn't arrow.
  if (keyCode < 37 || keyCode > 40) return;

  // Prevent player to move opposite directly.
  const { x, y } = player._dir;
  if (
    (x ===  1 && keyCode === 37) ||
    (x === -1 && keyCode === 39) ||
    (y ===  1 && keyCode === 38) ||
    (y === -1 && keyCode === 40)
  ) return;

  navigation[key]();
});

loop();


function loop(i) {
  player.spawn();
  star.spawn();

  player.update();
  star.update();

  const playerSide = player.side;
  const starSide = star.side;

  if (
    playerSide.left < starSide.right &&
    playerSide.top < starSide.bottom &&
    playerSide.right > starSide.left &&
    playerSide.bottom > starSide.top
  ) {
    addScore();
    star.respawn();
  }

  window.requestAnimationFrame(loop);
}


function addScore() {
  multiplier = 10;
  value = parseInt(score.innerText);

  score.innerText = value + multiplier;
}

