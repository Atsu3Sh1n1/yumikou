const categorizedShortcuts = {
  "Ctrl + [単キー]": [
    // ... 既存のCtrl + [単キー]のデータ ...
  ],
  "Ctrl + [Shift] + [キー]": [
    // ... 既存のCtrl + [Shift] + [キー]のデータ ...
  ],
  "Alt + [キー] シーケンス": [
    // ... 既存のAlt + [キー] シーケンスのデータ ...
  ],
  "ファンクションキー": [
    // ... 既存のファンクションキーのデータ ...
  ],
  "Shift + ファンクションキー": [   
    // ... 既存のShift + ファンクションキーのデータ ...
  ],
  "Ctrl + ファンクションキー": [    
    // ... 既存のCtrl + ファンクションキーのデータ ...
  ],
  "その他の特殊組合せ": [
    // ... 既存のその他の特殊組合せのデータ ...
  ]
};

const allShortcuts = Object.values(categorizedShortcuts).flat();

// カテゴリボタンを生成
function createCategoryButtons() {
  const buttonsContainer = document.getElementById("categoryButtons");
  const categories = Object.keys(categorizedShortcuts);
  
  // 全カテゴリボタン
  const allButton = document.createElement("button");
  allButton.textContent = "すべて";
  allButton.className = "category-btn active";
  allButton.addEventListener("click", () => {
    // すべてのボタンからactiveクラスを削除
    document.querySelectorAll(".category-btn").forEach(btn => {
      btn.classList.remove("active");
    });
    allButton.classList.add("active");
    renderShortcutsByCategory(null); // nullを渡すと全カテゴリ表示
  });
  buttonsContainer.appendChild(allButton);
  
  // 各カテゴリボタン
  categories.forEach(category => {
    const button = document.createElement("button");
    button.textContent = category;
    button.className = "category-btn";
    button.addEventListener("click", () => {
      // すべてのボタンからactiveクラスを削除
      document.querySelectorAll(".category-btn").forEach(btn => {
        btn.classList.remove("active");
      });
      button.classList.add("active");
      renderShortcutsByCategory(category);
    });
    buttonsContainer.appendChild(button);
  });
}

// 指定したカテゴリのショートカットを表示
function renderShortcutsByCategory(category) {
  const listContainer = document.getElementById("shortcutList");
  listContainer.innerHTML = "";
  
  if (!category) {
    // 全カテゴリ表示
    for (const cat in categorizedShortcuts) {
      renderCategory(cat, categorizedShortcuts[cat], listContainer);
    }
  } else {
    // 特定カテゴリ表示
    renderCategory(category, categorizedShortcuts[category], listContainer);
  }
}

// 個々のカテゴリをレンダリング
function renderCategory(category, shortcuts, container) {
  const section = document.createElement("div");
  const title = document.createElement("h3");
  title.textContent = category;
  section.appendChild(title);

  const ul = document.createElement("ul");
  shortcuts.forEach(shortcut => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${shortcut.key}</strong>: ${shortcut.action}`;
    ul.appendChild(li);
  });

  section.appendChild(ul);
  container.appendChild(section);
}

// 検索機能
document.getElementById("searchBox").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const shortcutList = document.getElementById("shortcutList");
  const resultsContainer = document.getElementById("results");
  const header = document.getElementById("shortcutHeader");

  if (query) {
    const result = allShortcuts.filter(item =>
      item.key.toLowerCase().includes(query) || item.action.toLowerCase().includes(query)
    );

    resultsContainer.innerHTML = result.map(item =>
      `<li><strong>${item.key}</strong>: ${item.action}</li>`
    ).join("");
    shortcutList.style.display = "none";
    header.style.display = "none";
    resultsContainer.style.display = "block";
  } else {
    resultsContainer.innerHTML = "";
    shortcutList.style.display = "block";
    header.style.display = "block";
    resultsContainer.style.display = "none";
  }
});

// 初期化
function init() {
  createCategoryButtons();
  renderShortcutsByCategory(null); // 最初は全カテゴリ表示
}

init();