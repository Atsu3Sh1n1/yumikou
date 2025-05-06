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

  "ワークシート": [
    { key: "Shift + F11", action: "新しいワークシートを挿入" },
    { key: "Ctrl + PgDn", action: "次のワークシートに移動" },
    { key: "Ctrl + PgUp", action: "前のワークシートに移動" },
    { key: "Alt + O , H R", action: "現在のワークシートの名前を変更" },
    { key: "Alt + E , L", action: "現在のワークシートを削除" },
    { key: "Alt + E , M", action: "現在のワークシートを移動" },
    { key: "F6 または Shift + F6", action: "ワークシート、リボン、作業ウィンドウ、ズームコントロール間を移動（分割ビュー時）" },
    { key: "Ctrl + Shift + PgUp / PgDn", action: "隣接するワークシートを選択" },
    { key: "Ctrl + Click", action: "離れたワークシートを選択" },
    { key: "ScrLk", action: "スクロールロックの切り替え" },
    { key: "Ctrl + Shift + F1", action: "全画面表示の切り替え" },
    { key: "Ctrl + P", action: "印刷" },
    { key: "Ctrl + F2", action: "印刷プレビューウィンドウを開く" },
    { key: "Alt + P , R S", action: "印刷範囲を設定" },
    { key: "Alt + P , R C", action: "印刷範囲をクリア" },
    { key: "Ctrl + Mouse Wheel Up", action: "ズームイン" },
    { key: "Ctrl + Mouse Wheel Down", action: "ズームアウト" },
    { key: "Alt + R , P S", action: "シートを保護" }
  ],

  "ワークブック": [
    { key: "Ctrl + N", action: "新しいブックを作成" },
    { key: "Ctrl + O", action: "ブックを開く" },
    { key: "Ctrl + S", action: "ブックを保存" },
    { key: "F12", action: "名前を付けて保存" },
    { key: "Ctrl + Tab", action: "次のブックに移動" },
    { key: "Ctrl + Shift + Tab", action: "前のブックに移動" },
    { key: "Ctrl + F9", action: "現在のブックウィンドウを最小化" },
    { key: "Ctrl + F10", action: "現在のブックウィンドウを最大化" },
    { key: "Alt + R , P W", action: "ブックを保護" },
    { key: "Ctrl + F4", action: "現在のブックを閉じる" },
    { key: "Alt + F4", action: "Excelを終了" }
  ],

  "リボン": [
    { key: "Ctrl + F1", action: "リボンを展開／折りたたみ" },
    { key: "Alt", action: "アクセスキーを有効化" },
    { key: "→ ← ↑ ↓", action: "リボンのタブやグループ間を移動" },
    { key: "Space または Enter", action: "選択したコントロールを有効化または開く" },
    { key: "Enter", action: "コントロールの変更を確定" },
    { key: "F1", action: "選択中のコントロールに関するヘルプを表示" }
  ],

"セルを選択したあとに、ドラッグ・アンド・ドロップで移動できる操作": [
  { key: "Drag", action: "ドラッグして切り取り" },
  { key: "Ctrl + Drag", action: "ドラッグしてコピー" },
  { key: "Shift + Drag", action: "ドラッグして挿入" },
  { key: "Ctrl + Shift + Drag", action: "ドラッグしてコピーを挿入" },
  { key: "Alt + Drag", action: "ドラッグして別のワークシートへ移動" },
  { key: "Ctrl + Drag", action: "ドラッグしてワークシートを複製" }
  ],
  
  "ナビゲーション": [
    { key: "→", action: "1つ右のセルに移動" },
    { key: "←", action: "1つ左のセルに移動" },
    { key: "↑", action: "1つ上のセルに移動" },
    { key: "↓", action: "1つ下のセルに移動" },
    { key: "Alt + PgDn", action: "1画面分右に移動" },
    { key: "Alt + PgUp", action: "1画面分左に移動" },
    { key: "PgUp", action: "1画面分上に移動" },
    { key: "PgDn", action: "1画面分下に移動" },
    { key: "Ctrl + →", action: "データ領域の右端に移動" },
    { key: "Ctrl + ←", action: "データ領域の左端に移動" },
    { key: "Ctrl + ↑", action: "データ領域の上端に移動" },
    { key: "Ctrl + ↓", action: "データ領域の下端に移動" },
    { key: "Home", action: "行の先頭に移動" },
    { key: "Ctrl + End", action: "ワークシート内の最後のデータセルに移動" },
    { key: "Ctrl + Home", action: "ワークシート内の最初のセルに移動" },
    { key: "End", action: "Endモードをオンにする" }
  ],
  
  "アクティブセル": [
    { key: "Shift + Backspace", action: "アクティブセルを選択（複数セルが選択されている場合）" },
    { key: "Ctrl + Backspace", action: "ワークシートでアクティブセルを表示" },
    { key: "Ctrl + .", action: "選択範囲の角にアクティブセルを時計回りに移動" },
    { key: "Enter", action: "選択範囲内でアクティブセルを下に移動 - 次の列にラップ" },
    { key: "Shift + Enter", action: "選択範囲内でアクティブセルを上に移動 - 前の列にラップ" },
    { key: "Tab", action: "選択範囲内でアクティブセルを右に移動 - 次の行にラップ" },
    { key: "Shift + Tab", action: "選択範囲内でアクティブセルを左に移動 - 前の行にラップ" }
  ],

  "セクション(選択)": [
    { key: "Shift + Space", action: "行全体を選択" },
    { key: "Ctrl + Space", action: "列全体を選択" },
    { key: "Ctrl + A", action: "現在の範囲を選択（データがある場合）- 再度押すと集計行を選択、さらに押すとワークシート全体を選択" },
    { key: "Shift + Click", action: "選択範囲を拡張" },
    { key: "Ctrl + Click", action: "選択範囲に離れたセルを追加" },
    { key: "Ctrl + Alt + →", action: "離れた選択範囲間で右に移動" },
    { key: "Ctrl + Alt + ←", action: "離れた選択範囲間で左に移動" },
    { key: "Shift + F8", action: "'選択を追加'モードを切り替える" },
    { key: "Esc", action: "'選択を追加'モードを終了" }
  ],

  "エクステンド セレクション（選択範囲を拡張）": [
    { key: "Shift + →", action: "選択範囲を右に拡張" },
    { key: "Shift + ←", action: "選択範囲を左に拡張" },
    { key: "Shift + ↑", action: "選択範囲を上に拡張" },
    { key: "Shift + ↓", action: "選択範囲を下に拡張" },
    { key: "Ctrl + Shift + →", action: "データが含まれている右端のセル、または次のデータがあるセル、または最後の列まで選択範囲を拡張" },
    { key: "Ctrl + Shift + ←", action: "データが含まれている左端のセル、または次のデータがあるセル、または最初の列まで選択範囲を拡張" },
    { key: "Ctrl + Shift + ↑", action: "データが含まれている上端のセル、または次のデータがあるセル、または最初の行まで選択範囲を拡張" },
    { key: "Ctrl + Shift + ↓", action: "データが含まれている下端のセル、または次のデータがあるセル、または最後の行まで選択範囲を拡張" },
    { key: "Shift + PgUp", action: "1画面分上に選択範囲を拡張" },
    { key: "Shift + PgDn", action: "1画面分下に選択範囲を拡張" },
    { key: "Alt + Shift + PgDn", action: "1画面分右に選択範囲を拡張" },
    { key: "Alt + Shift + PgUp", action: "1画面分左に選択範囲を拡張" },
    { key: "Shift + Home", action: "行の先頭まで選択範囲を拡張" },
    { key: "Ctrl + Shift + Home", action: "ワークシート内の最初のセルまで選択範囲を拡張" },
    { key: "Ctrl + Shift + End", action: "ワークシート内の最後のセルまで選択範囲を拡張" },
    { key: "F8", action: "'選択範囲拡張'モードを切り替える" },
    { key: "Esc", action: "'選択範囲拡張'モードを終了" }
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
