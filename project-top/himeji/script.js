
    // 超リッチな桜の花びら生成関数
    function spawnBlossom() {
        const blossom = document.createElement('div');
        blossom.className = 'cherry-blossom';
        
        // ランダムパラメータ生成
        const size = 8 + Math.random() * 12;
        const delay = Math.random() * 5;
        const duration = 8 + Math.random() * 15;
        const left = Math.random() * 100;
        const rotation = Math.random() * 360;
        const sway = 50 + Math.random() * 100;
        const swayDirection = Math.random() > 0.5 ? '' : '-';
        
        // 色バリエーション（5種類）
        const colors = ['#ffb7c5', '#ffdfea', '#ff9eb5', '#ffcad4', '#ffa8c2'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // 形バリエーション（4種類）
        const shapes = [
            '50% 0 50% 50%',
            '40% 40% 20% 60%',
            '60% 30% 30% 60%',
            '50% 50% 0 50%'
        ];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        
        // スタイル一括適用
        blossom.style.cssText = `
            left: ${left}%;
            width: ${size}px;
            height: ${size}px;
            background-color: ${color};
            border-radius: ${shape};
            animation: fall ${duration}s ease-in-out ${delay}s forwards;
            transform: rotate(${rotation}deg);
            opacity: ${0.3 + Math.random() * 0.7};
            z-index: 10;
            position: fixed;
            pointer-events: none;
            top: -30px;
        `;

        // 白鷺を動的に追加（画像がない場合の代替）
function createHeron() {
    const heron = document.createElement('div');
    heron.className = 'floating-element heron';
    heron.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" style="width:100%;height:100%">
            <path fill="#ffffff" d="M50 20L30 50L50 80L70 50Z" />
            <path fill="#f5f5f5" d="M50 30L35 50L50 70L65 50Z" />
        </svg>
    `;
    heron.style.cssText = `
        top: ${15 + Math.random() * 10}%;
        left: ${15 + Math.random() * 10}%;
        width: 120px;
        height: 120px;
        z-index: 2;
    `;
    document.querySelector('section').prepend(heron);
}

// 初期化時に実行
document.addEventListener('DOMContentLoaded', createHeron);
        
        // 個別アニメーション定義
        const animationName = `fall-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ${animationName} {
                0% { transform: translateY(0) translateX(0) rotate(${rotation}deg); opacity: 0; }
                10% { opacity: ${0.5 + Math.random() * 0.5}; }
                90% { opacity: ${0.5 + Math.random() * 0.5}; }
                100% { transform: translateY(calc(100vh + 30px)) translateX(${swayDirection}${sway}px) rotate(${rotation + 360}deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        blossom.style.animationName = animationName;
        document.body.appendChild(blossom);
        
        // アニメーション終了後クリーンアップ
        blossom.addEventListener('animationend', () => {
            blossom.remove();
            style.remove();
        });
    }

    // スクロールインジケーター制御（超精密版）
    const scrollIndicator = document.querySelector('.scroll-indicator');
    let lastScrollPos = 0;
    let scrollTimeout;
    
    function handleScroll() {
        const scrollPos = window.scrollY;
        const scrollDelta = scrollPos - lastScrollPos;
        lastScrollPos = scrollPos;
        
        // スクロール方向と速度に応じた処理
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        
        // スクロールインジケーター制御
        if (scrollPos > 300 || scrollPos + windowHeight >= docHeight - 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else if (Math.abs(scrollDelta) > 5) { // ある程度のスクロール速度がある場合
            scrollIndicator.style.opacity = '1';
        }
        
        // パララックス効果（最適化版）
if (Math.abs(scrollDelta) > 1) {
    const isMobile = window.innerWidth <= 768;
    const parallaxStrength = isMobile ? 0.05 : 0.05; // スマホは弱く
    const offsetY = isMobile ? -30 : -80; // 初期位置調整（必要に応じて調整）

    document.querySelectorAll('.parallax').forEach(element => {
        const rect = element.getBoundingClientRect();

        if (rect.top < windowHeight && rect.bottom > 0) {
            const scrollPos = window.scrollY;
            const positionY = (scrollPos - rect.top) * -parallaxStrength + offsetY;
            element.style.backgroundPositionY = `${positionY}px`;
        }
    });
}        
        // スクロール停止検出
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            scrollIndicator.style.opacity = '0';
        }, 2000);
    }

    // イベントリスナー設定（高性能版）
    let lastAnimationFrame;
    window.addEventListener('scroll', () => {
        if (lastAnimationFrame) cancelAnimationFrame(lastAnimationFrame);
        lastAnimationFrame = requestAnimationFrame(() => {
            handleScroll();
            // スクロール速度に応じた花びら生成
            if (Math.random() > 0.97) spawnBlossom();
        });
    });

    // 初期化処理（スマート版）
    document.addEventListener('DOMContentLoaded', () => {
        // 初期花びら生成（密度調整）
        const blossomCount = Math.min(20, Math.floor(window.innerWidth / 50));
        for (let i = 0; i < blossomCount; i++) {
            setTimeout(spawnBlossom, i * 800 * Math.random());
        }
        
        // マップマーカーイベント（強化版）
        document.querySelectorAll('.map-marker').forEach(marker => {
            marker.addEventListener('click', () => {
                marker.style.transform = 'scale(1.2)';
                setTimeout(() => marker.style.transform = '', 300);
                alert(`${marker.getAttribute('title')}\n\n詳細情報は公式サイトをご覧ください`);
            });
        });
        
        // タッチデバイス判定
        if ('ontouchstart' in window) {
            scrollIndicator.style.display = 'none';
        }
    });

    // スタイル動的注入（確実化版）
    const style = document.createElement('style');
    style.textContent = `
        .scroll-indicator {
            transition: opacity 0.5s ease, transform 0.3s ease !important;
            will-change: opacity, transform;
        }
        .scroll-indicator:hover {
            transform: scale(1.1);
        }
        @media (max-width: 768px) {
            .scroll-indicator {
                display: none !important;
            }
        }
    `;
    document.head.appendChild(style);
