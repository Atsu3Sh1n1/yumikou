function toggleDropdown() {
  const dropdownMenu = document.getElementById('dropdown-menu');
  const dropdownButton = document.querySelector('.dropdown-button');
  
  dropdownMenu.classList.toggle('open');
  dropdownButton.classList.toggle('open');
}

function selectCategory(element, category) {
  // すべてのアイテムからselectedクラスを削除
  document.querySelectorAll('.dropdown-item').forEach(item => {
    item.classList.remove('selected');
  });
  
  // 選択したアイテムにselectedクラスを追加
  element.classList.add('selected');
  
  // ドロップダウンボタンのテキストを更新
  document.getElementById('selected-category').textContent = element.textContent;
  
  // ドロップダウンを閉じる
  toggleDropdown();
  
  // フィルター処理を実行
  filterShortcuts(category);
}

// ドキュメント全体のクリックを監視して、ドロップダウン外をクリックしたら閉じる
document.addEventListener('click', function(event) {
  const dropdownMenu = document.getElementById('dropdown-menu');
  const dropdownButton = document.querySelector('.dropdown-button');
  
  if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
    dropdownMenu.classList.remove('open');
    dropdownButton.classList.remove('open');
  }
});

// 既存のfilterShortcuts関数
function filterShortcuts(category) {
  console.log("Filtering category:", category);
  // ここに実際のフィルタリング処理を実装
}

let allShortcuts = [
  { type: "title", label: "ファンクションキー" },
  { "key": "F1", "action": "ヘルプを表示", "category": "help" },
  { "key": "F2", "action": "セル編集モードに切り替え", "category": "cell_editing" },
  { "key": "F3", "action": "[名前の貼り付け]ダイアログを開く", "category": "formula_function" },
  { "key": "F4", "action": "絶対参照切替/直前操作繰り返し", "category": "formula_function" },
  { "key": "F5", "action": "[ジャンプ]ダイアログを開く", "category": "navigation_selection" },
  { "key": "F6", "action": "ペイン間移動", "category": "navigation_selection" },
  { "key": "F7", "action": "[スペルチェック]ダイアログを開く", "category": "proofing" },
  { "key": "F8", "action": "拡張選択モードに切り替え", "category": "navigation_selection" },
  { "key": "F9", "action": "ワークシート再計算", "category": "formula_function" },
  { "key": "F10", "action": "キーヒントの表示", "category": "ui_display" },
  { "key": "F11", "action": "新しいグラフシート作成", "category": "chart_table" },
  { "key": "F12", "action": "[名前を付けて保存]ダイアログを開く", "category": "file_management" },

  { type: "title", label: "Ctrl + [単キー]" },
  { "key": "Ctrl + 0", "action": "列を非表示", "category": "row_column_sheet" },
  { "key": "Ctrl + 1", "action": "[セルの書式設定]ダイアログを開く", "category": "formatting" },
  { "key": "Ctrl + 2", "action": "太字の切り替え", "category": "formatting" },
  { "key": "Ctrl + 3", "action": "斜体の切り替え", "category": "formatting" },
  { "key": "Ctrl + 4", "action": "下線の切り替え", "category": "formatting" },
  { "key": "Ctrl + 5", "action": "取消線の切り替え", "category": "formatting" },
  { "key": "Ctrl + 6", "action": "オブジェクトの表示/非表示切り替え", "category": "ui_display" },
  { "key": "Ctrl + 7", "action": "[ツール]バーの表示切り替え", "category": "ui_display" },
  { "key": "Ctrl + 8", "action": "アウトライン記号の表示切り替え", "category": "ui_display" },
  { "key": "Ctrl + 9", "action": "行を非表示", "category": "row_column_sheet" },
  { "key": "Ctrl + A", "action": "全選択/数式全体選択", "category": "navigation_selection" },
  { "key": "Ctrl + B", "action": "太字の切り替え", "category": "formatting" },
  { "key": "Ctrl + C", "action": "選択範囲をコピー", "category": "basic_operations" },
  { "key": "Ctrl + D", "action": "下方向にコピー", "category": "cell_editing" },
  { "key": "Ctrl + E", "action": "Flash Fill (データの自動展開)", "category": "data_manipulation" },
  { "key": "Ctrl + F", "action": "[検索]ダイアログを開く", "category": "find_replace" },
  { "key": "Ctrl + G", "action": "[ジャンプ]ダイアログを開く", "category": "navigation_selection" },
  { "key": "Ctrl + H", "action": "[置換]ダイアログを開く", "category": "find_replace" },
  { "key": "Ctrl + I", "action": "斜体の切り替え", "category": "formatting" },
  { "key": "Ctrl + J", "action": "改行文字入力 (環境依存)", "category": "cell_editing" },
  { "key": "Ctrl + K", "action": "[ハイパーリンクの挿入]ダイアログを開く", "category": "formatting" },
  { "key": "Ctrl + L", "action": "[テーブルの作成]ダイアログを開く", "category": "chart_table" },
  { "key": "Ctrl + M", "action": "インデント増加 (環境依存)", "category": "formatting" },
  { "key": "Ctrl + N", "action": "新規ブックを作成", "category": "file_management" },
  { "key": "Ctrl + O", "action": "[ファイルを開く]ダイアログを開く", "category": "file_management" },
  { "key": "Ctrl + P", "action": "[印刷]ダイアログを開く", "category": "file_management" },
  { "key": "Ctrl + Q", "action": "[クイック分析]ツールを表示", "category": "data_analysis" },
  { "key": "Ctrl + R", "action": "右方向にコピー", "category": "cell_editing" },
  { "key": "Ctrl + S", "action": "上書き保存", "category": "file_management" },
  { "key": "Ctrl + T", "action": "[テーブルの作成]ダイアログを開く", "category": "chart_table" },
  { "key": "Ctrl + U", "action": "下線の切り替え", "category": "formatting" },
  { "key": "Ctrl + V", "action": "貼り付け", "category": "basic_operations" },
  { "key": "Ctrl + W", "action": "ブックを閉じる", "category": "file_management" },
  { "key": "Ctrl + X", "action": "切り取り", "category": "basic_operations" },
  { "key": "Ctrl + Y", "action": "繰り返し", "category": "basic_operations" },
  { "key": "Ctrl + Z", "action": "元に戻す", "category": "basic_operations" },

  { type: "title", label: "Ctrl + [Shift] + [キー]" },
  { "key": "Ctrl + Shift + \"", "action": "上のセルの値をコピー", "category": "cell_editing" },
    { "key": "Ctrl + Shift + &", "action": "外枠罫線を適用", "category": "formatting" },
    { "key": "Ctrl + Shift + _", "action": "罫線を削除", "category": "formatting" },
    { "key": "Ctrl + Shift + ~", "action": "標準表示形式に設定", "category": "formatting" },
    { "key": "Ctrl + Shift + !", "action": "桁区切りスタイルに設定", "category": "formatting" },
    { "key": "Ctrl + Shift + @", "action": "時刻表示形式に設定", "category": "formatting" },
    { "key": "Ctrl + Shift + #", "action": "日付表示形式に設定", "category": "formatting" },
    { "key": "Ctrl + Shift + $", "action": "通貨表示形式に設定", "category": "formatting" },
    { "key": "Ctrl + Shift + %", "action": "パーセント表示形式に設定", "category": "formatting" },
    { "key": "Ctrl + Shift + ^", "action": "指数表示形式に設定", "category": "formatting" },
    { "key": "Ctrl + Shift + *", "action": "現在領域を選択", "category": "navigation_selection" },
    { "key": "Ctrl + Shift + +", "action": "セルの挿入", "category": "row_column_sheet" },
    { "key": "Ctrl + Shift + -", "action": "セルの削除", "category": "row_column_sheet" },
    { "key": "Ctrl + Shift + (", "action": "非表示行を再表示", "category": "row_column_sheet" },
    { "key": "Ctrl + Shift + )", "action": "非表示列を再表示", "category": "row_column_sheet" },
    { "key": "Ctrl + Shift + A", "action": "関数名の引数挿入", "category": "formula_function" },
    { "key": "Ctrl + Shift + B", "action": "フォトアルバム更新", "category": "miscellaneous" },
    { "key": "Ctrl + Shift + C", "action": "書式のみコピー", "category": "formatting" },
    { "key": "Ctrl + Shift + D", "action": "下方向に書式コピー", "category": "formatting" },
    { "key": "Ctrl + Shift + E", "action": "共有ワークブックの変更履歴を表示", "category": "collaboration" },
    { "key": "Ctrl + Shift + F", "action": "[フォント]タブを開く", "category": "formatting" },
    { "key": "Ctrl + Shift + G", "action": "[ジャンプ]ダイアログを開く", "category": "navigation_selection" },
    { "key": "Ctrl + Shift + H", "action": "置換履歴を表示", "category": "find_replace" },
    { "key": "Ctrl + Shift + I", "action": "インクコメント表示", "category": "comments_notes" },
    { "key": "Ctrl + Shift + J", "action": "特殊フィルタを適用", "category": "data_filter_sort" },
    { "key": "Ctrl + Shift + K", "action": "新規アドイン作成", "category": "miscellaneous" },
    { "key": "Ctrl + Shift + L", "action": "フィルタの切り替え", "category": "data_filter_sort" },
    { "key": "Ctrl + Shift + M", "action": "メモの管理", "category": "comments_notes" },
    { "key": "Ctrl + Shift + N", "action": "ノートの挿入", "category": "comments_notes" },
    { "key": "Ctrl + Shift + O", "action": "コメントのあるセルを選択", "category": "comments_notes" },
    { "key": "Ctrl + Shift + P", "action": "[フォントサイズ]選択", "category": "formatting" },
    { "key": "Ctrl + Shift + Q", "action": "オブジェクト情報を表示", "category": "miscellaneous" },
    { "key": "Ctrl + Shift + R", "action": "相対参照の切り替え", "category": "formula_function" },
    { "key": "Ctrl + Shift + S", "action": "名前付き範囲の作成", "category": "formula_function" },
    { "key": "Ctrl + Shift + T", "action": "総計行の追加", "category": "chart_table" },
    { "key": "Ctrl + Shift + U", "action": "数式バーの拡張", "category": "ui_display" },
    { "key": "Ctrl + Shift + V", "action": "値の貼り付け", "category": "basic_operations" },
    { "key": "Ctrl + Shift + W", "action": "ワークスペースの保存", "category": "file_management" },
    { "key": "Ctrl + Shift + X", "action": "XMLデータのエクスポート", "category": "data_import_export" },
    { "key": "Ctrl + Shift + Y", "action": "マクロの記録", "category": "macros" },
    { "key": "Ctrl + Shift + Z", "action": "操作の再実行", "category": "basic_operations" },

  { type: "title", label: "Alt + [キー] シーケンス" },
  { "key": "Alt + F1", "action": "現在の範囲のグラフ作成", "category": "chart_table" },
    { "key": "Alt + F2", "action": "[名前を付けて保存]ダイアログを開く", "category": "file_management" },
    { "key": "Alt + F4", "action": "Excelを終了", "category": "file_management" },
    { "key": "Alt + F8", "action": "[マクロ]ダイアログを開く", "category": "macros" },
    { "key": "Alt + F11", "action": "VBAエディタを開く", "category": "macros" },
    { "key": "Alt + Shift + F1", "action": "新しいワークシート挿入", "category": "row_column_sheet" },
    { "key": "Alt + Shift + F2", "action": "上書き保存", "category": "file_management" },
    { "key": "Alt + Shift + F4", "action": "ウィンドウを閉じる", "category": "file_management" },
    { "key": "Alt + Shift + F10", "action": "スマートタグメニューを表示", "category": "ui_display" },
    { "key": "Alt + Shift + F11", "action": "Microsoftスクリプトエディタを開く", "category": "macros" },

  { type: "title", label: "Shift + ファンクションキー" },
  { "key": "Shift + F1", "action": "コンテキストヘルプを表示", "category": "help" },
    { "key": "Shift + F2", "action": "セルにコメント追加", "category": "comments_notes" },
    { "key": "Shift + F3", "action": "[関数の挿入]ダイアログを開く", "category": "formula_function" },
    { "key": "Shift + F4", "action": "最後の検索を繰り返す", "category": "find_replace" },
    { "key": "Shift + F5", "action": "[検索]ダイアログを開く", "category": "find_replace" },
    { "key": "Shift + F6", "action": "前のペインに移動", "category": "navigation_selection" },
    { "key": "Shift + F7", "action": "[類義語辞典]ダイアログを開く", "category": "proofing" },
    { "key": "Shift + F8", "action": "追加選択モードに切り替え", "category": "navigation_selection" },
    { "key": "Shift + F9", "action": "アクティブシート再計算", "category": "formula_function" },
    { "key": "Shift + F10", "action": "コンテキストメニューを表示", "category": "ui_display" },
    { "key": "Shift + F11", "action": "新しいワークシート挿入", "category": "row_column_sheet" },
    { "key": "Shift + F12", "action": "上書き保存", "category": "file_management" },

  { type: "title", label: "Ctrl + ファンクションキー" },
  { "key": "Ctrl + F1", "action": "リボンの表示切替", "category": "ui_display" },
    { "key": "Ctrl + F2", "action": "印刷プレビューを表示", "category": "file_management" },
    { "key": "Ctrl + F3", "action": "[名前の定義]ダイアログを開く", "category": "formula_function" },
    { "key": "Ctrl + F4", "action": "ウィンドウを閉じる", "category": "file_management" },
    { "key": "Ctrl + F5", "action": "ウィンドウサイズ復元", "category": "ui_display" },
    { "key": "Ctrl + F6", "action": "次のウィンドウに移動", "category": "navigation_selection" },
    { "key": "Ctrl + F7", "action": "ウィンドウ移動モード", "category": "ui_display" },
    { "key": "Ctrl + F8", "action": "ウィンドウサイズ変更モード", "category": "ui_display" },
    { "key": "Ctrl + F9", "action": "ブックウィンドウ最小化", "category": "ui_display" },
    { "key": "Ctrl + F10", "action": "ブックウィンドウ最大化", "category": "ui_display" },
    { "key": "Ctrl + F11", "action": "Excel 4.0マクロシート挿入", "category": "macros" },
    { "key": "Ctrl + F12", "action": "[ファイルを開く]ダイアログを開く", "category": "file_management" },

  { type: "title", label: "その他の特殊組合せ" },
  { "key": "Ctrl + Alt + V", "action": "[形式を選択して貼り付け]ダイアログを開く", "category": "basic_operations" },
    { "key": "Ctrl + Alt + F9", "action": "全シートの強制再計算", "category": "formula_function" },
    { "key": "Ctrl + Alt + Shift + F9", "action": "依存関係の再チェック", "category": "formula_function" },
    { "key": "Ctrl + Shift + Enter", "action": "配列数式確定", "category": "formula_function" },
    { "key": "Ctrl + PageUp", "action": "前のシートに移動", "category": "navigation_selection" },
    { "key": "Ctrl + PageDown", "action": "次のシートに移動", "category": "navigation_selection" },
    { "key": "Alt + Enter", "action": "セル内改行", "category": "cell_editing" },
    { "key": "Alt + PageUp", "action": "1画面左にスクロール", "category": "navigation_selection" },
    { "key": "Alt + PageDown", "action": "1画面右にスクロール", "category": "navigation_selection" },
    { "key": "Alt + ;", "action": "表示セルのみ選択", "category": "navigation_selection" },
    { "key": "Shift + Space", "action": "行全体選択", "category": "navigation_selection" },
    { "key": "Ctrl + Space", "action": "列全体選択", "category": "navigation_selection" },
    { "key": "Ctrl + Shift + Space", "action": "シート全体選択", "category": "navigation_selection" },
    { "key": "Ctrl + Shift + PageUp", "action": "複数シート選択", "category": "navigation_selection" },
    { "key": "Ctrl + Shift + PageDown", "action": "複数シート選択", "category": "navigation_selection" }

];


function filterShortcuts(category) {
  const filtered = allShortcuts.filter(item => {
    if (category === 'all') {
      return true; // すべて表示ならタイトル含めて全部
    }

    // category が配列の場合、どれかのカテゴリにマッチするかをチェック
    if (Array.isArray(category)) {
      return item.type !== "title" && category.some(cat => item.category.includes(cat));
    }

    // 個別カテゴリの場合
    return item.type !== "title" && item.category === category;
  });
  renderShortcuts(filtered);
}

function renderShortcuts(items) {
  const listContainer = document.getElementById("shortcutList");
  listContainer.innerHTML = "";

  items.forEach(item => {
    if (item.type === "title") {
      const h3 = document.createElement("h3");
      h3.textContent = item.label;
      listContainer.appendChild(h3);
    } else {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${item.key}</strong>: ${item.action}`;
      listContainer.appendChild(li);
    }
  });
}

renderShortcuts(allShortcuts);

document.getElementById("searchBox").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const filtered = allShortcuts.filter(item => {
    if (item.type === "title") return true;
    return item.key.toLowerCase().includes(query) || item.action.includes(query);
  });
  renderShortcuts(filtered);
});
