const canvas = document.getElementById('sparkCanvas');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

document.addEventListener("DOMContentLoaded", function() {
  const images = document.querySelectorAll(".fade-image");
  let currentIndex = 0;

  function changeImage() {
      images[currentIndex].classList.remove("active"); // 現在表示中の画像を非表示
      currentIndex = (currentIndex + 1) % images.length; // 次の画像へ（最後に達したら最初に戻る）
      images[currentIndex].classList.add("active"); // 新しい画像を表示
  }

  // 初期画像の表示
  images[currentIndex].classList.add("active");

  // 画像を3秒ごとに切り替える
  setInterval(changeImage, 3000);
});
