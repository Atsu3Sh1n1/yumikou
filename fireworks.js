const canvas = document.getElementById('sparkCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const FIREWORK_SCALE = 2; // 花火のサイズ倍率（倍に）

class Spark {
  constructor(x, y, baseSpeed = 1, lifeMultiplier = 1, trailMultiplier = 1, fadeSpeed = 0.04, isSecondary = false, isRainbow = false, isWhiteSpark = false) {
    this.x = x;
    this.y = y;
    this.radius = isSecondary ? Math.random() * 1 + 0.3 : Math.random() * 2 + 1;
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    const speed = (isSecondary ? 1 + Math.random() * 1.5 : 5 + Math.random() * 5) * baseSpeed;
    this.vx = Math.sin(phi) * Math.cos(theta) * speed;
    this.vy = Math.sin(phi) * Math.sin(theta) * speed;
    this.vz = Math.cos(phi) * speed;

    if (isWhiteSpark) {
      this.hue = 0;
      this.saturation = 0;
      this.lightness = 100;
    } else if (isRainbow) {
      this.hue = (theta * 180 / Math.PI + 360) % 360;
      this.saturation = 100;
      this.lightness = 60;
    } else {
      this.hue = 40 + Math.random() * 20;
      this.saturation = 100;
      this.lightness = 60;
    }

    this.life = (isSecondary ? 10 + Math.random() * 15 : 60 + Math.random() * 40) * lifeMultiplier;
    this.maxLife = this.life;
    this.trail = [];
    this.trailMaxLength = Math.floor((Math.random() * (isSecondary ? 2 : 6) + 2) * trailMultiplier);
    this.isSecondary = isSecondary;
    this.hasSpawnedSecondary = false;
    this.fadeSpeed = fadeSpeed;
    this.isRainbow = isRainbow;
    this.isWhiteSpark = isWhiteSpark;
    this.spawnWhiteSpark = !isSecondary && !isWhiteSpark && Math.random() < 0.7;
  }

  update() {
    this.trail.push({x: this.x, y: this.y});
    if (this.trail.length > this.trailMaxLength) this.trail.shift();

    this.x += this.vx;
    this.y += this.vy;
    this.vx *= 0.92;
    this.vy *= 0.92;
    this.vz *= 0.92;
    this.vy += 0.04; // 重力

    this.life--;
    this.lightness = 30 + (this.life / this.maxLife) * 30;
    this.radius *= (1 - this.fadeSpeed);

    if (this.life <= 0 && this.spawnWhiteSpark) {
      createWhiteSparks(this.x, this.y);
    }
    return this.life <= 0;
  }

  draw() {
    ctx.beginPath();
    for (let i = 0; i < this.trail.length - 1; i++) {
      const p1 = this.trail[i];
      const p2 = this.trail[i + 1];
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
    }
    ctx.strokeStyle = `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`;
    ctx.lineWidth = this.radius / 1.5;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`;
    ctx.fill();
  }
}

let sparks = [];

function createFirework(x, y) {
  let baseCount = (20 + Math.floor(Math.random() * 30)) * FIREWORK_SCALE;
  let baseSpeed = 1.5;
  let lifeMultiplier = 1.5;
  let trailMultiplier = 1.5;
  let fadeSpeed = 0.03;
  let isRainbow = false;

  const rand = Math.random();
  if (rand < 0.05) { // 超特大
    baseCount *= 10;
    baseSpeed = 3;
    lifeMultiplier = 3;
    trailMultiplier = 3;
    fadeSpeed = 0.01;

    if (Math.random() < 0.5) { // 50%でレインボー
      isRainbow = true;
    }
  } else if (rand < 0.15) { // 特大
    baseCount *= 5;
    baseSpeed = 2.5;
    lifeMultiplier = 2.5;
    trailMultiplier = 2.5;
    fadeSpeed = 0.015;
  } else if (rand < 0.40) { // 大
    baseCount *= 2;
    baseSpeed = 2;
    lifeMultiplier = 2;
    trailMultiplier = 2;
    fadeSpeed = 0.02;
  }

  baseCount = Math.floor(baseCount);

  for (let i = 0; i < baseCount; i++) {
    sparks.push(new Spark(x, y, baseSpeed, lifeMultiplier, trailMultiplier, fadeSpeed, false, isRainbow));
  }
}

function createWhiteSparks(x, y) {
  const count = 5 + Math.floor(Math.random() * 10);
  for (let i = 0; i < count; i++) {
    sparks.push(new Spark(x, y, 0.5, 0.5, 0.5, 0.1, true, false, true));
  }
}

function animate() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = sparks.length - 1; i >= 0; i--) {
    const spark = sparks[i];
    if (spark.update() || spark.y > canvas.height) {
      sparks.splice(i, 1);
    } else {
      spark.draw();
    }
  }

  if (Math.random() < 0.02) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.8 + canvas.height * 0.1;
    createFirework(x, y);
  }

  requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
