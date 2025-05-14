document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const fileInput = document.getElementById('file-input');
    const filePreview = document.getElementById('file-preview');
    const maxFileSize = 10 * 1024 * 1024; // 10MB
    
    // ファイル選択時の処理
    fileInput.addEventListener('change', function() {
        filePreview.innerHTML = '';
        const files = Array.from(this.files);
        
        // ファイルサイズチェック
        for (let file of files) {
            if (file.size > maxFileSize) {
                alert(`ファイル "${file.name}" はサイズが大きすぎます（最大10MB）`);
                this.value = '';
                filePreview.innerHTML = '';
                return;
            }
        }
        
        // ファイルプレビュー表示
        files.forEach((file, index) => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            
            const fileName = document.createElement('span');
            fileName.className = 'file-name';
            fileName.textContent = file.name;
            
            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-file';
            removeBtn.innerHTML = '&times;';
            removeBtn.addEventListener('click', () => removeFile(index));
            
            fileItem.appendChild(fileName);
            fileItem.appendChild(removeBtn);
            filePreview.appendChild(fileItem);
        });
    });
    
    // ファイル削除関数
    function removeFile(index) {
        const dt = new DataTransfer();
        const files = Array.from(fileInput.files);
        
        files.splice(index, 1);
        
        files.forEach(file => dt.items.add(file));
        fileInput.files = dt.files;
        
        // プレビュー更新
        filePreview.innerHTML = '';
        Array.from(fileInput.files).forEach((file, idx) => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            
            const fileName = document.createElement('span');
            fileName.className = 'file-name';
            fileName.textContent = file.name;
            
            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-file';
            removeBtn.innerHTML = '&times;';
            removeBtn.addEventListener('click', () => removeFile(idx));
            
            fileItem.appendChild(fileName);
            fileItem.appendChild(removeBtn);
            filePreview.appendChild(fileItem);
        });
    }
    
    // フォーム送信処理
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
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