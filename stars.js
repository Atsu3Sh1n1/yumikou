const canvas = document.getElementById('warpCanvas');
const ctx = canvas.getContext('2d');

let stars = [];
const numStars = 500;
let width, height;
let focalLength;

function init() {
  width = window.innerWidth;
  height = window.innerHeight;
  focalLength = width / 2;

  canvas.width = width;
  canvas.height = height;

  stars = Array.from({ length: numStars }, () => ({
    x: Math.random() * width - width / 2,
    y: Math.random() * height - height / 2,
    z: Math.random() * width
  }));
}

function draw() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, width, height);

  for (let star of stars) {
    star.z -= 1;
    if (star.z <= 0) {
      star.x = Math.random() * width - width / 2;
      star.y = Math.random() * height - height / 2;
      star.z = width;
    }

    const k = focalLength / star.z;
    const sx = star.x * k + width / 2;
    const sy = star.y * k + height / 2;
    const size = (1 - star.z / width) * 3;

    ctx.beginPath();
    ctx.arc(sx, sy, size, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
  }

  requestAnimationFrame(draw);
}

window.addEventListener('resize', init);
init();
draw();
