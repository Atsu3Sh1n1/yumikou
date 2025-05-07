// ショートカットデータ
const shortcutsData = [
  { "key": "Ctrl + T", "action": "表作成", "category": "table" },
  { "key": "Ctrl + 0", "action": "列を非表示", "category": "table" },
  { "key": "Ctrl + C", "action": "コピー", "category": "edit" },
  { "key": "Ctrl + V", "action": "貼り付け", "category": "edit" },
  { "key": "Ctrl + E", "action": "画像編集", "category": "image" },
  { "key": "Ctrl + R", "action": "回転", "category": "image" },
  { "key": "Ctrl + S", "action": "保存", "category": "save" },
  { "key": "Ctrl + Shift + S", "action": "名前を付けて保存", "category": "save" },
  { "key": "Ctrl + F", "action": "検索", "category": "search" },
  { "key": "F3", "action": "次を検索", "category": "search" },
  // ここに追加でデータを増やしてください（計400件程度）
];

// 初期表示のため、全ショートカットを表示する関数
function renderShortcuts() {
  const shortcutsContainer = document.getElementById('shortcuts');
  shortcutsContainer.innerHTML = '';  // 既存のコンテンツをクリア
  shortcutsData.forEach(shortcut => {
    const div = document.createElement('div');
    div.classList.add('shortcut', shortcut.category);
    div.textContent = `${shortcut.action}：${shortcut.key}`;
    shortcutsContainer.appendChild(div);
  });
}

// カテゴリでフィルタリングする関数
function filterShortcuts(category) {
  const shortcuts = document.querySelectorAll('.shortcut');
  shortcuts.forEach(el => {
    if (category === 'all') {
      el.classList.add('active');
    } else if (el.classList.contains(category)) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
}

// 初期表示で全ショートカットを表示
renderShortcuts();
filterShortcuts('all');
