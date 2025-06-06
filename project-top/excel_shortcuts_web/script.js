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
document.addEventListener('click', function (event) {
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
  { type: "title", label: "基本操作 " },
  { "key": "Esc", "action": "入力のキャンセル", "category": "basic" },
  { "key": "F1", "action": "ヘルプを表示", "category": "basic" },
  { "key": "F2", "action": "セル編集モードに切り替え", "category": "basic" },
  { "key": "F3", "action": "[名前の貼り付け]ダイアログを開く", "category": "basic" },
  { "key": "F4", "action": "絶対参照切替/直前操作繰り返し", "category": "formubasicla_function" },
  { "key": "F5", "action": "[ジャンプ]ダイアログを開く", "category": "basic" },
  { "key": "F6", "action": "ペイン間移動", "category": "basic" },
  { "key": "F7", "action": "[スペルチェック]ダイアログを開く", "category": "basic" },
  { "key": "F8", "action": "拡張選択モードに切り替え", "category": "basic" },
  { "key": "F9", "action": "ワークシート再計算", "category": "basic" },
  { "key": "F10", "action": "キーヒントの表示", "category": "basic" },
  { "key": "F11", "action": "新しいグラフシート作成", "category": "basic" },
  { "key": "F12", "action": "[名前を付けて保存]ダイアログを開く", "category": "basic" },
  { "key": "Insert", "action": "上書きモードの切り替え", "category": "basic" },
  { "key": "Delete", "action": "セル内容の削除", "category": "basic" },
  { "key": "Home", "action": "行の先頭に移動", "category": "basic" },
  { "key": "End", "action": "データ範囲の端に移動", "category": "basic" },
  { "key": "Page Up", "action": "1画面分上にスクロール", "category": "basic" },
  { "key": "Page Down", "action": "1画面分下にスクロール", "category": "basic" },
  { "key": "Backspace", "action": "1文字削除", "category": "basic" },
  { "key": "Num Lock", "action": "テンキーの数字/機能切り替え", "category": "basic" },
  { "key": "Enter", "action": "セルの確定／下のセルに移動", "category": "basic" },
  { "key": "Alt", "action": "リボンのキーヒント表示", "category": "basic" },
  { "key": "Space", "action": "セルの選択／チェックボックスの切り替え", "category": "basic" },
  { "key": "Tab", "action": "セルの確定／右のセルに移動", "category": "basic" },
  { "key": "Caps Lock", "action": "大文字入力モードの切り替え", "category": "basic" },
  { "key": "↑", "action": "上のセルに移動", "category": "basic" },
  { "key": "↓", "action": "下のセルに移動", "category": "basic" },
  { "key": "←", "action": "左のセルに移動", "category": "basic" },
  { "key": "→", "action": "右のセルに移動", "category": "basic" },

  { type: "title", label: "Ctrl + " },
  { "key": "Ctrl + A", "action": "すべて選択", "category": "Ctrl" },
  { "key": "Ctrl + B", "action": "太字", "category": "Ctrl" },
  { "key": "Ctrl + C", "action": "コピー", "category": "Ctrl" },
  { "key": "Ctrl + D", "action": "上のセルの内容をコピー", "category": "Ctrl" },
  { "key": "Ctrl + E", "action": "クイック分析", "category": "Ctrl" },
  { "key": "Ctrl + F", "action": "検索", "category": "Ctrl" },
  { "key": "Ctrl + G", "action": "移動", "category": "Ctrl" },
  { "key": "Ctrl + H", "action": "置換", "category": "Ctrl" },
  { "key": "Ctrl + I", "action": "斜体", "category": "Ctrl" },
  { "key": "Ctrl + J", "action": "配置", "category": "Ctrl" },
  { "key": "Ctrl + K", "action": "ハイパーリンク挿入", "category": "Ctrl" },
  { "key": "Ctrl + L", "action": "テーブル作成", "category": "Ctrl" },
  { "key": "Ctrl + M", "action": "インデントの増加", "category": "Ctrl" },
  { "key": "Ctrl + N", "action": "新しいブック", "category": "Ctrl" },
  { "key": "Ctrl + O", "action": "ファイルを開く", "category": "Ctrl" },
  { "key": "Ctrl + P", "action": "印刷", "category": "Ctrl" },
  { "key": "Ctrl + Q", "action": "クイック分析", "category": "Ctrl" },
  { "key": "Ctrl + R", "action": "左のセルの内容をコピー", "category": "Ctrl" },
  { "key": "Ctrl + S", "action": "保存", "category": "Ctrl" },
  { "key": "Ctrl + T", "action": "テーブル作成", "category": "Ctrl" },
  { "key": "Ctrl + U", "action": "下線", "category": "Ctrl" },
  { "key": "Ctrl + V", "action": "貼り付け", "category": "Ctrl" },
  { "key": "Ctrl + W", "action": "ウィンドウを閉じる", "category": "Ctrl" },
  { "key": "Ctrl + X", "action": "切り取り", "category": "Ctrl" },
  { "key": "Ctrl + Y", "action": "やり直し", "category": "Ctrl" },
  { "key": "Ctrl + Z", "action": "元に戻す", "category": "Ctrl" },
  { "key": "Ctrl + 0", "action": "列の非表示", "category": "Ctrl" },
  { "key": "Ctrl + 1", "action": "セルの書式設定", "category": "Ctrl" },
  { "key": "Ctrl + 2", "action": "太字", "category": "Ctrl" },
  { "key": "Ctrl + 3", "action": "斜体", "category": "Ctrl" },
  { "key": "Ctrl + 4", "action": "下線", "category": "Ctrl" },
  { "key": "Ctrl + 5", "action": "取り消し線", "category": "Ctrl" },
  { "key": "Ctrl + 6", "action": "オブジェクト表示切替", "category": "Ctrl" },
  { "key": "Ctrl + 7", "action": "ツールバー切替", "category": "Ctrl" },
  { "key": "Ctrl + 8", "action": "アウトライン表示切替", "category": "Ctrl" },
  { "key": "Ctrl + 9", "action": "行の非表示", "category": "Ctrl" },
  { "key": "Ctrl + F1", "action": "リボンの表示切替", "category": "Ctrl" },
  { "key": "Ctrl + F2", "action": "印刷プレビュー", "category": "Ctrl" },
  { "key": "Ctrl + F3", "action": "名前の管理", "category": "Ctrl" },
  { "key": "Ctrl + F4", "action": "ブックを閉じる", "category": "Ctrl" },
  { "key": "Ctrl + F5", "action": "ウィンドウの復元", "category": "Ctrl" },
  { "key": "Ctrl + F6", "action": "次のブックに切替", "category": "Ctrl" },
  { "key": "Ctrl + F7", "action": "ウィンドウの移動", "category": "Ctrl" },
  { "key": "Ctrl + F8", "action": "ウィンドウのサイズ変更", "category": "Ctrl" },
  { "key": "Ctrl + F9", "action": "ウィンドウを最小化", "category": "Ctrl" },
  { "key": "Ctrl + F10", "action": "ウィンドウを最大化", "category": "Ctrl" },
  { "key": "Ctrl + F11", "action": "マクロシートを挿入", "category": "Ctrl" },
  { "key": "Ctrl + F12", "action": "ファイルを開く", "category": "Ctrl" },
  { "key": "Ctrl + ↑", "action": "データ範囲の上端へ移動", "category": "Ctrl" },
  { "key": "Ctrl + ↓", "action": "データ範囲の下端へ移動", "category": "Ctrl" },
  { "key": "Ctrl + →", "action": "データ範囲の右端へ移動", "category": "Ctrl" },
  { "key": "Ctrl + ←", "action": "データ範囲の左端へ移動", "category": "Ctrl" },
  { "key": "Ctrl + ;", "action": "今日の日付を挿入", "category": "Ctrl" },
  { "key": "Ctrl + :", "action": "現在時刻を挿入", "category": "Ctrl" },
  { "key": "Ctrl + `", "action": "数式の表示切替", "category": "Ctrl" },
  { "key": "Ctrl + -", "action": "行/列の削除", "category": "Ctrl" },
  { "key": "Ctrl + +", "action": "行/列の挿入", "category": "Ctrl" },
  { "key": "Ctrl + Home", "action": "A1セルへ移動", "category": "Ctrl" },
  { "key": "Ctrl + End", "action": "最終データへ移動", "category": "Ctrl" },
  { "key": "Ctrl + PageUp", "action": "前のシートへ移動", "category": "Ctrl" },
  { "key": "Ctrl + PageDown", "action": "次のシートへ移動", "category": "Ctrl" },
  { "key": "Ctrl + Space", "action": "列全体を選択", "category": "Ctrl" },
  { "key": "Ctrl + Enter", "action": "複数セルに同時入力", "category": "Ctrl" },
  { "key": "Ctrl + Tab", "action": "ブック切り替え", "category": "Ctrl" },
  { "key": "Ctrl + Backspace", "action": "アクティブセルを表示", "category": "Ctrl" },
  { "key": "Ctrl + Delete", "action": "セル内容の右側を削除", "category": "Ctrl" },
  { "key": "Ctrl + Shift + F", "action": "フォント書式ダイアログを開く", "category": "Ctrl" },
  { "key": "Ctrl + Shift + O", "action": "コメント付きセルを選択", "category": "Ctrl" },
  { "key": "Ctrl + Shift + K", "action": "スパークラインを挿入", "category": "Ctrl" },
  { "key": "Ctrl + Shift + P", "action": "フォントサイズ変更ダイアログ", "category": "Ctrl" },
  { "key": "Ctrl + Shift + L", "action": "オートフィルターのオン/オフ", "category": "Ctrl" },
  { "key": "Ctrl + Shift + U", "action": "数式バーの展開/折りたたみ", "category": "Ctrl" },
  { "key": "Ctrl + Shift + 1", "action": "小数2桁の数値形式（#,##0.00）", "category": "Ctrl" },
  { "key": "Ctrl + Shift + 2", "action": "時刻形式（h:mm AM/PM）", "category": "Ctrl" },
  { "key": "Ctrl + Shift + 3", "action": "日付形式（dd-mmm-yy）", "category": "Ctrl" },
  { "key": "Ctrl + Shift + 4", "action": "通貨形式（$#,##0.00）", "category": "Ctrl" },
  { "key": "Ctrl + Shift + 5", "action": "パーセンテージ形式（0.00%）", "category": "Ctrl" },
  { "key": "Ctrl + Shift + 6", "action": "指数表示形式（0.00E+00）", "category": "Ctrl" },
  { "key": "Ctrl + Shift + F3", "action": "選択範囲から名前を定義", "category": "Ctrl" },
  { "key": "Ctrl + Shift + F4", "action": "前回の検索を繰り返す", "category": "Ctrl" },
  { "key": "Ctrl + Shift + F5", "action": "検索と置換（検索タブ）を開く", "category": "Ctrl" },
  { "key": "Ctrl + Shift + F6", "action": "前のウィンドウに切り替え", "category": "Ctrl" },
  { "key": "Ctrl + Shift + F8", "action": "拡張選択モードの切り替え", "category": "Ctrl" },
  { "key": "Ctrl + Shift + F9", "action": "無効な数式の再計算", "category": "Ctrl" },
  { "key": "Ctrl + Shift + F11", "action": "新しいマクロシートを挿入", "category": "Ctrl" },
  { "key": "Ctrl + Shift + F12", "action": "印刷ダイアログを表示", "category": "Ctrl" },
  { "key": "Ctrl + Alt + V", "action": "形式を選択して貼り付け", "category": "Ctrl" },
  { "key": "Ctrl + Shift + $", "action": "通貨書式", "category": "Ctrl" },
  { "key": "Ctrl + Shift + %", "action": "パーセンテージ書式", "category": "Ctrl" },
  { "key": "Ctrl + Shift + #", "action": "日付書式", "category": "Ctrl" },
  { "key": "Ctrl + Shift + @", "action": "時刻書式", "category": "Ctrl" },
  { "key": "Ctrl + Shift + ^", "action": "指数書式", "category": "Ctrl" },
  { "key": "Ctrl + Shift + !", "action": "桁区切り書式", "category": "Ctrl" },
  { "key": "Ctrl + Shift + &", "action": "外枠を付ける", "category": "Ctrl" },
  { "key": "Ctrl + Shift + _", "action": "枠線の削除", "category": "Ctrl" },
  { "key": "Ctrl + Shift + +", "action": "行または列の挿入", "category": "Ctrl" },
  { "key": "Ctrl + Shift + Enter", "action": "配列数式確定（旧式）", "category": "Ctrl" },
  { "key": "Ctrl + Shift + ↑", "action": "上方向に範囲選択", "category": "Ctrl" },
  { "key": "Ctrl + Shift + ↓", "action": "下方向に範囲選択", "category": "Ctrl" },
  { "key": "Ctrl + Shift + →", "action": "右方向に範囲選択", "category": "Ctrl" },
  { "key": "Ctrl + Shift + ←", "action": "左方向に範囲選択", "category": "Ctrl" },
  { "key": "Ctrl + Shift + Tab", "action": "前のブックに移動", "category": "Ctrl" },
  { "key": "Ctrl + Shift + Space", "action": "ワークシート全体を選択", "category": "Ctrl" },
  { "key": "Ctrl + Shift + （ダブルクォーテーション）", "action": "上のセルの値をコピー", "category": "Ctrl" },
  { "key": "Ctrl + Shift + '（シングルクォーテーション）", "action": "上のセルの数式をコピー", "category": "Ctrl" },
  { "key": "Ctrl + Shift + `", "action": "数式の表示切替", "category": "Ctrl" },
  { "key": "Ctrl + Alt + Shift + F9", "action": "すべての数式を強制再計算", "category": "Ctrl" },
  { "key": "Ctrl + Alt + Shift + F1", "action": "新しいワークシートを挿入", "category": "Ctrl" },
  { "key": "Ctrl + Alt + Shift + F2", "action": "名前の定義を編集", "category": "Ctrl" },

  { type: "title", label: "Shift + " },
  { "key": "Shift + F1", "action": "選択対象のヘルプを表示", "category": "Shift" },
  { "key": "Shift + F2", "action": "コメントを挿入または編集", "category": "Shift" },
  { "key": "Shift + F3", "action": "関数挿入ダイアログを表示", "category": "Shift" },
  { "key": "Shift + F4", "action": "検索の次を検索", "category": "Shift" },
  { "key": "Shift + F5", "action": "検索ダイアログを表示", "category": "Shift" },
  { "key": "Shift + F6", "action": "ウィンドウ間を逆順で移動", "category": "Shift" },
  { "key": "Shift + F7", "action": "類語辞典を表示（英語環境）", "category": "Shift" },
  { "key": "Shift + F8", "action": "複数範囲選択モードの切り替え", "category": "Shift" },
  { "key": "Shift + F9", "action": "アクティブなシートのみ再計算", "category": "Shift" },
  { "key": "Shift + F10", "action": "右クリックメニューを表示", "category": "Shift" },
  { "key": "Shift + F11", "action": "新しいワークシートを挿入", "category": "Shift" },
  { "key": "Shift + F12", "action": "上書き保存", "category": "Shift" },
  { "key": "Shift + Space", "action": "行全体を選択", "category": "Shift" },
  { "key": "Shift + Enter", "action": "上のセルに移動", "category": "Shift" },
  { "key": "Shift + Tab", "action": "左のセルに移動", "category": "Shift" },
  { "key": "Shift + ↑", "action": "選択範囲を上に拡張", "category": "Shift" },
  { "key": "Shift + ↓", "action": "選択範囲を下に拡張", "category": "Shift" },
  { "key": "Shift + ←", "action": "選択範囲を左に拡張", "category": "Shift" },
  { "key": "Shift + →", "action": "選択範囲を右に拡張", "category": "Shift" },
  { "key": "Shift + Page Up", "action": "1画面分上に選択を拡張", "category": "Shift" },
  { "key": "Shift + Page Down", "action": "1画面分下に選択を拡張", "category": "Shift" },
  { "key": "Shift + Home", "action": "行の先頭まで選択範囲を拡張", "category": "Shift" },
  { "key": "Shift + End", "action": "行の末尾まで選択範囲を拡張", "category": "Shift" },
  { "key": "Shift + ドラッグ", "action": "セルを移動", "category": "Shift" },
  { "key": "Shift + クリック（シートタブ）", "action": "複数シートの選択", "category": "Shift" },
  { "key": "Shift + クリック（セル）", "action": "セル範囲を選択", "category": "Shift" },
  { "key": "Shift + マウスホイール", "action": "横スクロール（環境依存）", "category": "Shift" },
  { "key": "Shift + Shift（2回押し）", "action": "IME入力モード切替（Windowsの設定による）", "category": "Shift" },
  { "key": "Shift + Insert", "action": "貼り付け（ただしExcelでは機能しない場合あり）", "category": "Shift" },
  { "key": "Shift + Delete", "action": "切り取り（通常のWindows操作、Excelでも可）", "category": "Shift" },
  { "key": "Shift + Backspace", "action": "入力内容のクリア（環境依存・一部フォームで機能）", "category": "Shift" },
  { "key": "Shift + Enter（フォーム内）", "action": "セル内での改行（Ctrl + Enterが標準だがShiftで動作することも）", "category": "Shift" },
  { "key": "Shift + クリック（オブジェクト）", "action": "複数オブジェクトの選択（図形や画像など）", "category": "Shift" },

  { type: "title", label: "Alt + " },
  { "key": "Alt + A", "action": "データタブを開く", "category": "alt" },
  { "key": "Alt + A, A", "action": "すべてのフィルターを解除", "category": "alt" },
  { "key": "Alt + A, C", "action": "列を削除", "category": "alt" },
  { "key": "Alt + A, R", "action": "行を削除", "category": "alt" },
  { "key": "Alt + A, S", "action": "データを降順に並べ替え", "category": "alt" },
  { "key": "Alt + A, T", "action": "データを昇順に並べ替え", "category": "alt" },
  { "key": "Alt + B", "action": "太字の設定/解除", "category": "alt" },
  { "key": "Alt + C", "action": "数式タブ内の特定の操作", "category": "alt" },
  { "key": "Alt + E", "action": "編集メニューを開く（旧バージョン）", "category": "alt" },
  { "key": "Alt + F", "action": "ファイルメニューを開く", "category": "alt" },
  { "key": "Alt + G", "action": "ページレイアウトタブを開く", "category": "alt" },
  { "key": "Alt + H", "action": "ホームタブを開く", "category": "alt" },
  { "key": "Alt + H, A", "action": "セルの配置を変更", "category": "alt" },
  { "key": "Alt + H, B", "action": "太字の設定/解除", "category": "alt" },
  { "key": "Alt + H, C", "action": "列の幅を自動調整", "category": "alt" },
  { "key": "Alt + H, D, C", "action": "列を削除", "category": "alt" },
  { "key": "Alt + H, D, R", "action": "行を削除", "category": "alt" },
  { "key": "Alt + H, D, S", "action": "シートを削除", "category": "alt" },
  { "key": "Alt + H, F", "action": "フォントを変更", "category": "alt" },
  { "key": "Alt + H, H", "action": "塗りつぶしの色を変更", "category": "alt" },
  { "key": "Alt + H, I", "action": "斜体の設定/解除", "category": "alt" },
  { "key": "Alt + H, K", "action": "標準の数値形式を適用", "category": "alt" },
  { "key": "Alt + H, L", "action": "セルの書式設定ダイアログを開く", "category": "alt" },
  { "key": "Alt + H, M", "action": "セルの結合", "category": "alt" },
  { "key": "Alt + H, N", "action": "新しいシートを挿入", "category": "alt" },
  { "key": "Alt + H, O, I", "action": "列の幅を自動調整", "category": "alt" },
  { "key": "Alt + H, T", "action": "フォントの色を変更", "category": "alt" },
  { "key": "Alt + H, U", "action": "下線の設定/解除", "category": "alt" },
  { "key": "Alt + I", "action": "挿入タブを開く", "category": "alt" },
  { "key": "Alt + I, C", "action": "列を挿入", "category": "alt" },
  { "key": "Alt + I, R", "action": "行を挿入", "category": "alt" },
  { "key": "Alt + J", "action": "数式タブを開く", "category": "alt" },
  { "key": "Alt + M", "action": "数式タブを開く", "category": "alt" },
  { "key": "Alt + N", "action": "挿入タブを開く", "category": "alt" },
  { "key": "Alt + N, V", "action": "ピボットテーブルを挿入", "category": "alt" },
  { "key": "Alt + P", "action": "ページレイアウトタブを開く", "category": "alt" },
  { "key": "Alt + R", "action": "レビュータブを開く", "category": "alt" },
  { "key": "Alt + S", "action": "データタブを開く", "category": "alt" },
  { "key": "Alt + T", "action": "ツールメニューを開く（旧バージョン）", "category": "alt" },
  { "key": "Alt + W", "action": "表示タブを開く", "category": "alt" },
  { "key": "Alt + W, F", "action": "ウィンドウを分割", "category": "alt" },
  { "key": "Alt + W, S", "action": "ウィンドウの分割を解除", "category": "alt" },
  { "key": "Alt + X", "action": "切り取り", "category": "alt" },
  { "key": "Alt + Y", "action": "操作を繰り返す", "category": "alt" },
  { "key": "Alt + F1", "action": "選択範囲からグラフを作成", "category": "alt" },
  { "key": "Alt + F2", "action": "名前を付けて保存", "category": "alt" },
  { "key": "Alt + F4", "action": "Excelを終了", "category": "alt" },
  { "key": "Alt + F8", "action": "マクロダイアログを開く", "category": "alt" },
  { "key": "Alt + F11", "action": "VBAエディタを開く", "category": "alt" },
  { "key": "Alt + Enter", "action": "セル内で改行", "category": "alt" },
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
  const result = [];
  let currentGroup = [];
  let inGroup = false;

  allShortcuts.forEach(item => {
    if (item.type === "title") {
      // 前のグループを追加（ショートカット付きのみ）
      if (currentGroup.length > 1) result.push(...currentGroup);
      currentGroup = [item];
      inGroup = true;
    } else {
      const match =
        item.key.toLowerCase().includes(query) ||
        item.action.toLowerCase().includes(query);

      if (match) {
        if (!inGroup) currentGroup = []; // タイトルなしのグループも許可
        currentGroup.push(item);
      }
    }
  });

  // 最後のグループも忘れずに追加
  if (currentGroup.length > 1 || (currentGroup.length === 1 && currentGroup[0].type !== "title")) {
    result.push(...currentGroup);
  }

  renderShortcuts(result);
});
