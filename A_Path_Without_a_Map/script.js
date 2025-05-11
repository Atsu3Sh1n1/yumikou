// optional: animate background (soft noise movement)
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function drawNoise() {
  const imageData = ctx.createImageData(canvas.width, canvas.height);
  for (let i = 0; i < imageData.data.length; i += 4) {
    const val = Math.random() * 10 + 10;
    imageData.data[i] = val;
    imageData.data[i + 1] = val;
    imageData.data[i + 2] = val;
    imageData.data[i + 3] = 8; // very low opacity
  }
  ctx.putImageData(imageData, 0, 0);
}

setInterval(drawNoise, 100);

// Add gentle fade or animation on click (placeholder)
document.querySelectorAll('.branch').forEach(branch => {
  branch.addEventListener('click', () => {
    alert(`You chose ${branch.dataset.branch}`);
    // Here, you could transition to a new page or expand content.
  });
});
