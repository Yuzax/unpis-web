// ==========================================================================
// Favicon Animation
// ==========================================================================

let faviconFiles = [];
let currentIndex = 0;
let animationInterval = null;

const initFaviconAnimation = () => {
    // テンプレートディレクトリのパスを取得
    const templateDirectory = document
        .querySelector('meta[name="template-directory"]')
        ?.getAttribute('content');
    if (!templateDirectory) return;

    // 3つのicoファイルを配列に設定
    faviconFiles = [
        templateDirectory + '/assets/img/favicon/0_favicon.ico',
        templateDirectory + '/assets/img/favicon/1_favicon.ico',
        templateDirectory + '/assets/img/favicon/2_favicon.ico',
    ];

    startAnimation();
};

const animateFavicon = () => {
    if (faviconFiles.length === 0) return;

    currentIndex = (currentIndex + 1) % faviconFiles.length;

    // 既存のfaviconを全て削除
    const existingFavicons = document.querySelectorAll('link[rel*="icon"]');
    existingFavicons.forEach((link) => link.remove());

    // 新しいfaviconを作成（複数の方法で試す）
    const timestamp = Date.now();

    // 方法1: shortcut icon
    const favicon1 = document.createElement('link');
    favicon1.rel = 'shortcut icon';
    favicon1.type = 'image/x-icon';
    favicon1.href = faviconFiles[currentIndex] + '?v=' + timestamp;

    // 方法2: icon
    const favicon2 = document.createElement('link');
    favicon2.rel = 'icon';
    favicon2.type = 'image/x-icon';
    favicon2.href = faviconFiles[currentIndex] + '?v=' + timestamp;

    // headに追加
    document.head.appendChild(favicon1);
    document.head.appendChild(favicon2);

    // faviconの参照を保持（デバッグ用）
    window.currentFavicon = favicon2;
};

const startAnimation = () => {
    if (animationInterval) return;

    // 1秒毎にfaviconを切り替え
    animationInterval = setInterval(animateFavicon, 1000);

    // 初回実行
    animateFavicon();
};

const stopAnimation = () => {
    if (animationInterval) {
        clearInterval(animationInterval);
        animationInterval = null;
    }
};

const resetFavicon = () => {
    if (faviconFiles.length === 0) return;

    currentIndex = 0;

    // 既存のfaviconを削除
    const existingFavicons = document.querySelectorAll('link[rel*="icon"]');
    existingFavicons.forEach((link) => link.remove());

    // 最初のfaviconに戻す
    const favicon1 = document.createElement('link');
    favicon1.rel = 'shortcut icon';
    favicon1.type = 'image/x-icon';
    favicon1.href = faviconFiles[0];

    const favicon2 = document.createElement('link');
    favicon2.rel = 'icon';
    favicon2.type = 'image/x-icon';
    favicon2.href = faviconFiles[0];

    document.head.appendChild(favicon1);
    document.head.appendChild(favicon2);

    // faviconの参照を保持（デバッグ用）
    window.currentFavicon = favicon2;
};

// 初期化
document.addEventListener('DOMContentLoaded', initFaviconAnimation);

// エクスポート（必要に応じて他のファイルから制御可能）
export { startAnimation, stopAnimation, resetFavicon };
