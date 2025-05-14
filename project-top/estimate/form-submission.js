document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const fileInput = document.getElementById('file-input');
    const filePreview = document.getElementById('file-preview');
    const maxFileSize = 10 * 1024 * 1024; // 10MB
    const modal = document.getElementById('confirmation-modal');
    const confirmContent = document.getElementById('confirmation-content');
    const confirmCancel = document.getElementById('confirm-cancel');
    const confirmSubmit = document.getElementById('confirm-submit');
    
    // ファイル選択時の処理（以前と同じ）
    fileInput.addEventListener('change', function() {
        // 以前のファイル処理コードをそのまま保持
    });
    
    // ファイル削除関数（以前と同じ）
    function removeFile(index) {
        // 以前のファイル削除コードをそのまま保持
    }
    
    // フォーム送信ボタンクリック時（確認モーダル表示）
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        showConfirmationModal();
    });
    
    // 確認モーダル表示関数
    function showConfirmationModal() {
        // フォームデータを収集
        const formData = new FormData(form);
        let html = '';
        
        // 各フィールドを確認用に表示
        formData.forEach((value, key) => {
            // ファイルは別処理
            if (key === 'attachments') return;
            
            // チェックボックス/ラジオボタンの処理
            if (value instanceof File) return;
            
            html += `<div class="confirmation-item">
                <span class="confirmation-label">${getFieldLabel(key)}</span>
                <span class="confirmation-value">${formatValue(key, value)}</span>
            </div>`;
        });
        
        // ファイルの表示
        if (fileInput.files.length > 0) {
            let filesHtml = '<div class="confirmation-item">';
            filesHtml += '<span class="confirmation-label">参考資料や写真</span>';
            filesHtml += '<div class="confirmation-files">';
            
            Array.from(fileInput.files).forEach(file => {
                filesHtml += `<span class="confirmation-file">${file.name} (${formatFileSize(file.size)})</span>`;
            });
            
            filesHtml += '</div></div>';
            html += filesHtml;
        }
        
        confirmContent.innerHTML = html;
        modal.style.display = 'block';
    }
    
    // フィールド名をラベルに変換
    function getFieldLabel(key) {
        const labels = {
            'name': 'お名前',
            'address': 'ご住所',
            'phone': 'お電話番号',
            'email': 'メールアドレス',
            '工事': 'プラント・現地工事',
            '製作': '製作・加工',
            'リフォーム': 'リフォーム',
            '清掃': '清掃',
            '地域サポート': '暮らしのサポート',
            'budget': 'ご予算（目安）',
            'schedule': 'ご希望の工事時期',
            'message': 'ご希望・ご相談内容'
        };
        return labels[key] || key;
    }
    
    // 値をフォーマット
    function formatValue(key, value) {
        if (value === '') return '未入力';
        if (key === 'schedule' && value === '○月ごろから') return '時期未定（要相談）';
        return value;
    }
    
    // ファイルサイズをフォーマット
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    // モーダルキャンセルボタン
    confirmCancel.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // モーダル外をクリックで閉じる
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // 確認後の送信処理
    confirmSubmit.addEventListener('click', async function() {
        modal.style.display = 'none';
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');
        
        // ファイルサイズ再チェック
        const files = fileInput.files;
        for (let file of files) {
            if (file.size > maxFileSize) {
                alert(`ファイル "${file.name}" はサイズが大きすぎます（最大10MB）`);
                return;
            }
        }
        
        // 送信ボタンを無効化
        submitButton.disabled = true;
        submitButton.textContent = '送信中...';
        
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                alert('お問い合わせが送信されました。ありがとうございます。');
                form.reset();
                filePreview.innerHTML = '';
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || '送信に失敗しました');
            }
        } catch (error) {
            alert(`エラーが発生しました: ${error.message}`);
            console.error('Error:', error);
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = '送信する';
        }
    });
});