/**
 * Iframe Detection
 * iframe内で表示されている場合に特定のクラスを追加する
 */

/**
 * iframe内かどうかを判定してクラスを追加
 */
const detectIframe = () => {
    // iframe内かどうかを判定
    if (window.self !== window.top) {
        const closeButton = document.querySelector(
            '.js-iframe-detection-target',
        );
        if (closeButton) {
            closeButton.classList.add('is-in-iframe');
        }
    }
};

/**
 * 初期化
 */
const init = () => {
    detectIframe();
};

export { init };
