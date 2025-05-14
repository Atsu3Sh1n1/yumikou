document.querySelector('form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    
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
        } else {
            throw new Error('送信に失敗しました');
        }
    } catch (error) {
        alert('エラーが発生しました。もう一度お試しください。');
        console.error('Error:', error);
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = '送信する';
    }
});