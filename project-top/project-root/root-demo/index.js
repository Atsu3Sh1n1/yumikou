const form = document.getElementById('reservationForm');
const totalDisplay = document.getElementById('total');
const options = document.querySelectorAll('.option');
const confirmBtn = document.getElementById('confirmBtn');
const modal = document.getElementById('modal');
const cancelBtn = document.getElementById('cancelBtn');
const submitBtn = document.getElementById('submitBtn');
const confirmDetails = document.getElementById('confirmDetails');
const successMessage = document.getElementById('successMessage');
const reservationNumber = document.getElementById('reservationNumber');

function calculateTotal() {
  const people = parseInt(document.getElementById('people').value);
  let basePrice = people * 1000; // 例：1人1000円
  let optionTotal = 0;
  
  options.forEach(opt => {
    if (opt.checked) {
      const value = parseInt(opt.value);
      if (!isNaN(value)) {
        optionTotal += value;
      }
    }
  });
  
  const total = basePrice + optionTotal;
  totalDisplay.textContent = `¥${total.toLocaleString()}`;
  return total;
}

options.forEach(opt => opt.addEventListener('change', calculateTotal));
document.getElementById('people').addEventListener('change', calculateTotal);

confirmBtn.addEventListener('click', () => {
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const people = document.getElementById('people').value;
  const total = calculateTotal();
  const selectedOptions = Array.from(options)
    .filter(opt => opt.checked)
    .map(opt => opt.dataset.label || '不明') // ラベルが設定されていない場合のデフォルト
    .join(', ') || 'なし';

  if (!date || !time) {
    alert("日付と時間を選択してください。");
    return;
  }

  confirmDetails.innerHTML = `
    <p><strong>日付:</strong> ${date}</p>
    <p><strong>時間:</strong> ${time}</p>
    <p><strong>人数:</strong> ${people}人</p>
    <p><strong>オプション:</strong> ${selectedOptions}</p>
    <p><strong>合計金額:</strong> ¥${total.toLocaleString()}</p>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
});

cancelBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});

submitBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
  successMessage.classList.remove('hidden');
  const number = 'R' + Math.floor(100000 + Math.random() * 900000);
  reservationNumber.textContent = number;
});
