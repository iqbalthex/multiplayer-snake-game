const main = document.getElementById("main");
const mainRect = main.getBoundingClientRect();
const MAIN_WIDTH = mainRect.width;
const MAIN_HEIGHT = mainRect.height;

const SPEED = 20;
const DIRECTION = { x: 1, y: 0 };

const player = document.getElementById("player");

let intv = setInterval(() => {
  const { x, y, left, top, right, bottom } = getPlayerSide();

  if (top <= 0 || bottom >= MAIN_HEIGHT) {
    DIRECTION.y *= -1;
  }

  if (left <= 0 || right >= MAIN_WIDTH) {
    DIRECTION.x *= -1;
  }

  move(x-1, y-1);
}, 50);


window.addEventListener("keydown", changeDir);


function changeDir(event) {
  // clearInterval(intv);
  // do nothing if key pressed isn't arrow
  if (event.keyCode < 37 || event.keyCode > 40) return;

  ({
    "ArrowUp"   : () => (DIRECTION.y = -1, DIRECTION.x = 0),
    "ArrowDown" : () => (DIRECTION.y =  1, DIRECTION.x = 0),
    "ArrowLeft" : () => (DIRECTION.x = -1, DIRECTION.y = 0),
    "ArrowRight": () => (DIRECTION.x =  1, DIRECTION.y = 0),
  })[event.key]();
}


function getPlayerSide() {
  const { x, y, width, height } = player.getBoundingClientRect();

  const left = x - 1;
  const top  = y - 1;
  const right  = left + width;
  const bottom = top + height;

  return { x, y, left, top, right, bottom };
}


function move(x, y) {
  x += SPEED * DIRECTION.x;
  y += SPEED * DIRECTION.y;

  player.style.transform = `translate(${x}px, ${y}px)`;
}

