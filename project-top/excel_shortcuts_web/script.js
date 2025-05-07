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

"セルを選択したあとに、ドラッグアンドドロップで移動できる操作": [
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

  "選択": [
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

  "選択範囲を拡張": [
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

  "特定の条件に基づいた選択": [
    { key: "Ctrl + G または F5", action: "'移動先'ダイアログボックスを表示" },
    { key: "Ctrl + Shift + O", action: "コメントが含まれるセルを選択" },
    { key: "Ctrl + Shift + *", action: "アクティブセルを囲む現在の領域を選択" },
    { key: "Ctrl + A", action: "現在の範囲を選択" },
    { key: "Ctrl + [", action: "直接の先行セルを選択" },
    { key: "Ctrl + Shift + {", action: "すべての先行セルを選択" },
    { key: "Ctrl + ]", action: "直接の従属セルを選択" },
    { key: "Ctrl + Shift + }", action: "すべての従属セルを選択" },
    { key: "Alt + ;", action: "表示されているセルのみを選択" }
  ],

  "セル エディット モード": [
    { key: "F2", action: "アクティブセルを編集" },
    { key: "Shift + F2", action: "コメントを挿入または編集" },
    { key: "Shift + F10 , M", action: "コメントを削除" },
    { key: "Esc", action: "編集をキャンセル" },
    { key: "Shift + →", action: "右に1文字選択" },
    { key: "Shift + ←", action: "左に1文字選択" },
    { key: "Ctrl + →", action: "右に1単語移動" },
    { key: "Ctrl + ←", action: "左に1単語移動" },
    { key: "Ctrl + Shift + →", action: "右に1単語選択" },
    { key: "Ctrl + Shift + ←", action: "左に1単語選択" },
    { key: "Shift + Home", action: "セルの先頭まで選択" },
    { key: "Shift + End", action: "セルの末尾まで選択" },
    { key: "Ctrl + Delete", action: "行の末尾まで削除" },
    { key: "Backspace", action: "カーソルの左側の文字を削除" },
    { key: "Delete", action: "カーソルの右側の文字を削除" },
    { key: "Alt + Enter", action: "同じセル内で新しい行を開始" }
  ],

  "データ入力": [
    { key: "Enter", action: "データを入力して下に移動" },
    { key: "Shift + Enter", action: "データを入力して上に移動" },
    { key: "Tab", action: "データを入力して右に移動" },
    { key: "Shift + Tab", action: "データを入力して左に移動" },
    { key: "Ctrl + Enter", action: "データを入力して同じセルにとどまる（複数セルに同時入力）" },
    { key: "Enter", action: "複数のセルに同じデータを入力（コピー後、セルを選択してから）" },
    { key: "Ctrl + ;", action: "現在の日付を入力" },
    { key: "Ctrl + Shift + :", action: "現在の時間を入力" },
    { key: "Ctrl + D", action: "上のセルから下にデータをコピー" },
    { key: "Ctrl + R", action: "左のセルから右にデータをコピー" },
    { key: "Ctrl + '", action: "上のセルから数式をコピー（数式をそのままコピー）" },
    { key: "Ctrl + Shift + \"", action: "上のセルから値をコピー" },
    { key: "Ctrl + K", action: "ハイパーリンクを挿入" },
    { key: "Alt + ↓", action: "AutoCompleteリストを表示" },
    { key: "Ctrl + E", action: "フラッシュフィル" }
  ],

  "書式設定・形式変更": [
    { key: "Ctrl + 1", action: "セルの書式設定" },
    { key: "Ctrl + Shift + F", action: "書式設定ダイアログを表示（フォントタブ選択）" },
    { key: "Ctrl + B", action: "太字を適用または解除" },
    { key: "Ctrl + I", action: "斜体を適用または解除" },
    { key: "Ctrl + U", action: "下線を適用または解除" },
    { key: "Ctrl + 5", action: "取り消し線を適用または解除" },
    { key: "Alt + H , A C", action: "中央揃え" },
    { key: "Alt + H , A L", action: "左揃え" },
    { key: "Alt + H , A R", action: "右揃え" },
    { key: "Alt + H , 6", action: "インデントを増やす" },
    { key: "Alt + H , 5", action: "インデントを減らす" },
    { key: "Alt + H , W", action: "テキストの折り返し" },
    { key: "Alt + H , A T", action: "上揃え" },
    { key: "Alt + H , A M", action: "中央揃え（垂直方向）" },
    { key: "Alt + H , A B", action: "下揃え" },
    { key: "Alt + H , F G", action: "フォントサイズを1段階大きくする" },
    { key: "Alt + H , F K", action: "フォントサイズを1段階小さくする" }
  ],

  "数値の形式設定": [
    { key: "Ctrl + Shift + ~", action: "一般形式を適用" },
    { key: "Ctrl + Shift + !", action: "数値形式を適用" },
    { key: "Ctrl + Shift + @", action: "時刻形式を適用" },
    { key: "Ctrl + Shift + #", action: "日付形式を適用" },
    { key: "Ctrl + Shift + $", action: "通貨形式を適用" },
    { key: "Ctrl + Shift + %", action: "パーセンテージ形式を適用" },
    { key: "Ctrl + Shift + ^", action: "科学的記数法形式を適用" }
  ],

  "ボーダーの設定・枠線・境界線": [
    { key: "Alt + H , B", action: "リボンから枠線・境界線スタイルのリストを開く" },
    { key: "Ctrl + Shift + &", action: "選択したセルに枠線・境界線を追加" },
    { key: "Alt + H , B R", action: "右の枠線・境界線を追加または削除" },
    { key: "Alt + H , B L", action: "左の枠線・境界線を追加または削除" },
    { key: "Alt + H , B P", action: "上の枠線・境界線を追加または削除" },
    { key: "Alt + H , B O", action: "下の枠線・境界線を追加または削除" },
    { key: "Alt + H , B A", action: "選択したすべてのセルにすべての枠線・境界線を追加" },
    { key: "Ctrl + Shift + -", action: "枠線・境界線を削除" }
  ],

  "数式・関数": [
    { key: "=", action: "数式の入力を開始" },
    { key: "F4", action: "絶対参照と相対参照を切り替える（セル編集モード）" },
    { key: "Shift + F3", action: "関数の挿入ダイアログを開く" },
    { key: "Alt + =", action: "オートサム SUM関数自動挿入（選択範囲の合計）" },
    { key: "Ctrl + `", action: "数式の表示をオン/オフ" },
    { key: "Ctrl + Shift + A", action: "関数引数を挿入" },
    { key: "Ctrl + Shift + Enter", action: "配列数式を入力" },
    { key: "F9", action: "ワークシートを計算" },
    { key: "Shift + F9", action: "アクティブなワークシートを計算" },
    { key: "Ctrl + Alt + F9", action: "すべてのワークシートを強制的に計算" },
    { key: "F9", action: "数式の一部を評価（セル編集モード）" },
    { key: "Ctrl + Shift + U", action: "数式バーを展開または折りたたむ" },
    { key: "Ctrl + A", action: "関数引数ダイアログボックスを表示" },
    { key: "Ctrl + F3", action: "名前の管理者を開く" },
    { key: "Ctrl + Shift + F3", action: "行/列の値から名前を作成" },
    { key: "F3", action: "数式に名前を貼り付け" },
    { key: "Tab", action: "自動補完で関数を確定" }
  ],

  "行と列": [
    { key: "Ctrl + +", action: "挿入ダイアログボックスを表示" },
    { key: "Ctrl + +", action: "選択した行数分を挿入" },
    { key: "Ctrl + +", action: "選択した列数分を挿入" },
    { key: "Ctrl + -", action: "削除ダイアログボックスを表示" },
    { key: "Ctrl + -", action: "選択した行数分を削除" },
    { key: "Ctrl + -", action: "選択した列数分を削除" },
    { key: "Delete", action: "選択したセルの内容を削除" },
    { key: "Ctrl + 0", action: "列を非表示" },
    { key: "Ctrl + 9", action: "行を非表示" },
    { key: "Ctrl + Shift + 9", action: "行を再表示" },
    { key: "Alt + Shift + →", action: "行または列をグループ化（行/列選択時）" },
    { key: "Alt + Shift + ←", action: "行または列をグループ解除（行/列選択時）" },
    { key: "Alt + Shift + →", action: "グループダイアログボックスを開く（行/列選択なし）" },
    { key: "Alt + Shift + ←", action: "グループ解除ダイアログボックスを開く" },
    { key: "Ctrl + 8", action: "アウトライン記号の表示/非表示" }
  ],

  "ピボットテーブル": [
    { key: "Alt + N , V", action: "ピボットテーブルを作成" },
    { key: "Ctrl + A", action: "ピボットテーブル全体を選択" },
    { key: "Alt + Shift + →", action: "ピボットテーブルの項目をグループ化" },
    { key: "Alt + Shift + ←", action: "ピボットテーブルの項目のグループ解除" },
    { key: "Ctrl + -", action: "ピボットテーブルの項目を非表示（フィルター）" },
    { key: "Alt + H , S C", action: "ピボットテーブルの項目を再表示（フィルター解除）" },
    { key: "Alt + N , S Z C", action: "ピボットグラフを挿入" }
  ],

  "ダイアログボックス": [
    { key: "Tab", action: "次のコントロールに移動" },
    { key: "Shift + Tab", action: "前のコントロールに移動" },
    { key: "Ctrl + Tab", action: "次のタブに移動" },
    { key: "Ctrl + Shift + Tab", action: "前のタブに移動" },
    { key: "Enter", action: "適用してダイアログを閉じる" },
    { key: "Space", action: "チェックボックスのオン/オフを切り替える" },
    { key: "Esc", action: "キャンセルしてダイアログを閉じる" }
  ],

"右クリックメニュー": [
    { key: "Shift + F10, T", action: "切り取り" },
    { key: "Shift + F10, C", action: "コピー" },
    { key: "Shift + F10, V", action: "貼り付け" },
    { key: "Shift + F10, V V", action: "値として貼り付け" },
    { key: "Shift + F10, V R", action: "書式を貼り付け" },
    { key: "Shift + F10, I", action: "挿入" },
    { key: "Shift + F10, D", action: "削除" },
    { key: "Shift + F10, F", action: "セルの書式設定" },
    { key: "Shift + F10, M (または N）", action: "名前の定義" },
    { key: "Shift + F10, M（Excelのバージョン依存）", action: "コメントの挿入／編集" },
    { key: "Shift + F10, L", action: "セルのクリア（書式、内容など）" },
    { key: "Shift + F10, U", action: "元に戻す" },
    { key: "Shift + F10, Y", action: "やり直し（Redo）" },
    { key: "Shift + F10, Q", action: "クイック分析（表データ時）" },
    { key: "Shift + F10, S", action: "スパークライン関連（表内）" },
    { key: "Shift + F10, Z", action: "Smart Lookup（スマート検索）" },
    { key: "Shift + F10, R", action: "並べ替え" },
    { key: "Shift + F10, H", action: "ヘルプまたはフィードバック" },
    { key: "Shift + F10, K", action: "ハイパーリンクの挿入" }
  ],

  "マニアック": [
    { key: "F2, Ctrl + Shift + →", action: "セル内の文字列の末尾まで一気に選択" },
    { key: "Ctrl + Shift + Alt + F9", action: "全ブックの数式を強制的に再計算" },
    { key: "Alt + F11", action: "Ctrl + G でイミディエイトウィンドウ開いて、? Range(A1).Value でセルの中身を問答無用で吐き出せる。" },
    { key: "Ctrl + [ / Ctrl + ]", action: "参照元 / 参照先ジャンプ" },
    { key: "Ctrl + 6", action: "図形・グラフ・画像を一発で非表示にする" },
    { key: "Ctrl + `（バッククオート）+ Page Down / Up", action: "数式表示モードでシート間ジャンプ" },
    { key: "Ctrl + Alt + F5", action: "ピボットテーブルとデータ接続を即更新" },
    { key: "F3 → 名前貼り付け", action: "使ってる定義名（Named Range）を一覧表示 → セルに一発貼り付け。" },
    { key: "Alt + D → P（古のピボット起動）", action: "最新UIを無視して、昔のウィザード形式でピボットテーブルを作る裏技。" },
    { key: "Scroll Lock + 矢印キー", action: "セルを動かさずに画面だけスクロール" },
    { key: "Ctrl + F3 → 定義名一括管理", action: "すべての名前・参照先を一覧で見られる。" },
    { key: "Ctrl + Shift + スペース", action: "現在の「データ領域全体」を一発選択" },

  ],

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
