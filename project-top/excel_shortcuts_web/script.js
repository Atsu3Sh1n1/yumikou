const categorizedShortcuts = {
  "基本操作": [
    { key: "F1", action: "ヘルプを開く" },
    { key: "Ctrl + Z", action: "最後の操作を元に戻す" },
    { key: "Ctrl + Y", action: "最後の操作をやり直す" },
    { key: "Ctrl + C", action: "選択範囲をコピー" },
    { key: "F4", action: "最後の操作を繰り返す" },
    { key: "Ctrl + X", action: "選択範囲を切り取る" },
    { key: "Ctrl + V", action: "クリップボードの内容を貼り付け" },
    { key: "Ctrl + Alt + V", action: "「形式を選択して貼り付け」ダイアログを表示" },
    { key: "Ctrl + F", action: "検索と置換（検索タブを選択）を表示" },
    { key: "Ctrl + H", action: "検索と置換（置換タブを選択）を表示" },
    { key: "Ctrl + Shift + F4", action: "前の一致を検索（初回の検索後）" },
    { key: "Shift + F4", action: "次の一致を検索（初回の検索後）" },
    { key: "Alt + F1", action: "埋め込みグラフを挿入" },
    { key: "F11", action: "新しいシートにグラフを挿入" },
    { key: "Ctrl + Shift + L", action: "オートフィルタを切り替える" },
    { key: "Alt + ↓", action: "フィルタを有効にする" },
    { key: "Ctrl + T", action: "テーブルを作成" },
    { key: "Shift + Space", action: "テーブルの行を選択" },
    { key: "Ctrl + Space", action: "テーブルの列を選択" },
    { key: "Ctrl + A", action: "テーブル全体を選択（アクティブセルがテーブル内にあるとき）" },
    { key: "Alt + C", action: "スライサーフィルタをクリア" },
    { key: "F7", action: "スペルチェックを実行" },
    { key: "Shift + F7", action: "類語辞典を開く" },
    { key: "Alt + F8", action: "マクロダイアログボックスを開く" },
    { key: "Alt + F11", action: "VBAエディターを開く" },
    { key: "Ctrl + D", action: "オブジェクトを複製" },
    { key: "Alt", action: "ドラッグ中にグリッドにスナップ" },
    { key: "Ctrl + 6", action: "オブジェクトの表示/非表示を切り替える" },
    { key: "Alt + '", action: "セルスタイルの変更ダイアログを開く" },
    { key: "Shift + F10", action: "右クリックメニューを表示" },
    { key: "Alt + Space", action: "コントロールメニューを表示" }
  ],

  "編集": [
    { key: "Ctrl + C", action: "コピー" },
    { key: "Ctrl + X", action: "切り取り" },
    { key: "Ctrl + V", action: "貼り付け" },
    { key: "Delete", action: "内容を削除" },
    { key: "Ctrl + Z", action: "元に戻す" },
    { key: "Ctrl + Y", action: "やり直す" },
    { key: "Ctrl + F", action: "検索" },
    { key: "Ctrl + H", action: "置換" }
  ],
  "書式設定": [
    { key: "Ctrl + B", action: "太字" },
    { key: "Ctrl + I", action: "斜体" },
    { key: "Ctrl + U", action: "下線" },
    { key: "Alt + E, S, V", action: "形式を選択して貼り付け" },
    { key: "Ctrl + 1", action: "セルの書式設定" }
  ],
  "行・列操作": [
    { key: "Ctrl + Shift + +", action: "セルを挿入" },
    { key: "Ctrl + -", action: "セルを削除" },
    { key: "Ctrl + 9", action: "行を非表示" },
    { key: "Ctrl + Shift + 9", action: "行を再表示" },
    { key: "Ctrl + 0", action: "列を非表示" },
    { key: "Ctrl + Shift + 0", action: "列を再表示" }
  ],
  "移動・選択": [
    { key: "Ctrl + →", action: "右端のセルへ移動" },
    { key: "Ctrl + ←", action: "左端のセルへ移動" },
    { key: "Ctrl + ↑", action: "上端のセルへ移動" },
    { key: "Ctrl + ↓", action: "下端のセルへ移動" },
    { key: "Shift + 矢印キー", action: "セルを範囲選択" },
    { key: "Ctrl + Space", action: "列全体を選択" },
    { key: "Shift + Space", action: "行全体を選択" }
  ],
  "数式": [
    { key: "=", action: "数式入力開始" },
    { key: "Alt + =", action: "オートサム" },
    { key: "Ctrl + `", action: "数式を表示" }
  ],
  "データ": [
    { key: "Ctrl + T", action: "テーブル作成" },
    { key: "Ctrl + Shift + L", action: "フィルターの切り替え" }
  ],
  "日付・時刻": [
    { key: "Ctrl + ;", action: "今日の日付を入力" },
    { key: "Ctrl + Shift + :", action: "現在の時刻を入力" }
  ],
  "その他": [
    { key: "F2", action: "セルの編集" },
    { key: "Alt + Enter", action: "セル内で改行" },
    { key: "Ctrl + Tab", action: "ブック間を移動" },
    { key: "Ctrl + Page Up", action: "左のシートに移動" },
    { key: "Ctrl + Page Down", action: "右のシートに移動" }
  ]
};

const allShortcuts = Object.values(categorizedShortcuts).flat();

document.getElementById("searchBox").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const shortcutList = document.getElementById("shortcutList");
  const resultsContainer = document.getElementById("results");
  const header = document.getElementById("shortcutHeader");

  if (query) {
    const result = allShortcuts.filter(item =>
      item.key.toLowerCase().includes(query) || item.action.includes(query)
    );

    resultsContainer.innerHTML = result.map(item =>
      `<li><strong>${item.key}</strong>: ${item.action}</li>`
    ).join("");
    shortcutList.style.display = "none";
    header.style.display = "none";
  } else {
    resultsContainer.innerHTML = "";
    shortcutList.style.display = "block";
  }
});

function renderFullList() {
  const listContainer = document.getElementById("shortcutList");
  for (const category in categorizedShortcuts) {
    const section = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = category;
    section.appendChild(title);

    const ul = document.createElement("ul");
    categorizedShortcuts[category].forEach(shortcut => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${shortcut.key}</strong>: ${shortcut.action}`;
      ul.appendChild(li);
    });

    section.appendChild(ul);
    listContainer.appendChild(section);
  }
}

renderFullList();
