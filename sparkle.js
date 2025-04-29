const canvas = document.getElementById('sparkCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Spark {
  constructor(x, y, baseSpeed = 1, lifeMultiplier = 1, trailMultiplier = 1, fadeSpeed = 0.04, isSecondary = false, color = null) {
    this.x = x;
    this.y = y;
    this.radius = isSecondary ? Math.random() * 1 + 0.3 : Math.random() * 2 + 1;
    this.color = color;
    const hue = color ? 0 : 40 + Math.random() * 20; // 白の場合はhue 0（白に近い）
    this.hue = hue;
    this.saturation = color ? 0 : 100; // 白の場合は彩度0
    this.lightness = 60;
    const angle = Math.random() * Math.PI * 2;
    const speed = (isSecondary ? 1 + Math.random() * 1.5 : 5 + Math.random() * 5) * baseSpeed;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.life = (isSecondary ? 10 + Math.random() * 15 : 60 + Math.random() * 40) * lifeMultiplier;
    this.maxLife = this.life;
    this.trail = [];
    this.trailMaxLength = Math.floor((Math.random() * (isSecondary ? 2 : 6) + 2) * trailMultiplier);
    this.isSecondary = isSecondary;
    this.hasSpawnedSecondary = false;
    this.fadeSpeed = fadeSpeed;
  }
  update() {
    this.trail.push({ x: this.x, y: this.y });
    if (this.trail.length > this.trailMaxLength) {
      this.trail.shift();
    }

    this.x += this.vx;
    this.y += this.vy;

    this.vx *= 0.92;
    this.vy *= 0.92;
    this.vy += 0.04; // gravity

    this.life--;
    this.lightness = 30 + (this.life / this.maxLife) * 30;
    this.radius *= (1 - this.fadeSpeed);

    if (!this.isSecondary && !this.hasSpawnedSecondary && this.life < this.maxLife * 0.5) {
      this.hasSpawnedSecondary = true;
      if (Math.random() < 0.8) {
        createSecondarySparks(this.x, this.y, this.fadeSpeed);
      }
    }
  }
  draw() {
    ctx.beginPath();
    for (let i = 0; i < this.trail.length - 1; i++) {
      const p1 = this.trail[i];
      const p2 = this.trail[i + 1];
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
    }
    if (this.color) {
      ctx.strokeStyle = this.color;
      ctx.fillStyle = this.color;
    } else {
      ctx.strokeStyle = `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`;
      ctx.fillStyle = `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`;
    }
    ctx.lineWidth = this.radius / 1.5;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

let sparks = [];

function createFirework(x, y) {
  let baseCount = 20 + Math.floor(Math.random() * 30);
  let baseSpeed = 1;
  let lifeMultiplier = 1;
  let trailMultiplier = 1;
  let fadeSpeed = 0.04;

  const rand = Math.random();
  if (rand < 0.5) {
    // 小パラパラ
    baseCount *= 1;
    baseSpeed = 1.0;
    lifeMultiplier = 1.0;
    trailMultiplier = 1.0;
    fadeSpeed = 0.05;
  } else {
    // 白キラキラ
    baseCount *= 0.5;
    baseSpeed = 1.2;
    lifeMultiplier = 1.2;
    trailMultiplier = 1.2;
    fadeSpeed = 0.02;
  }

  baseCount = Math.floor(baseCount);

  for (let i = 0; i < baseCount; i++) {
    if (rand >= 0.5) {
      sparks.push(new Spark(x, y, baseSpeed, lifeMultiplier, trailMultiplier, fadeSpeed, false, 'white'));
    } else {
      sparks.push(new Spark(x, y, baseSpeed, lifeMultiplier, trailMultiplier, fadeSpeed));
    }
  }
}

function createSecondarySparks(x, y, parentFadeSpeed) {
  const count = 3 + Math.floor(Math.random() * 5);
  for (let i = 0; i < count; i++) {
    sparks.push(new Spark(x, y, 0.8, 0.8, 0.8, parentFadeSpeed * 1.2, true));
  }
}

function animate() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = sparks.length - 1; i >= 0; i--) {
    const spark = sparks[i];
    spark.update();
    spark.draw();
    if (spark.life <= 0 || spark.y > canvas.height) {
      sparks.splice(i, 1);
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
