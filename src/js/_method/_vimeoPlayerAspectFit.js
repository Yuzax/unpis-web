/**
 * Vimeo Player Aspect Fit
 * Vimeo playerのアスペクト比を判定してdata属性を設定
 */

const getStyleSheetValue = (element, property) => {
    if (!element || !property) return;

    const style = document.defaultView.getComputedStyle(element, '');

    // CSS変数からオフセット値を取得
    const widthOffset =
        parseInt(style.getPropertyValue('--container-width-offset')) || 0;
    const heightOffset =
        parseInt(style.getPropertyValue('--container-height-offset')) || 0;

    // ブラウザサイズから計算
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (property === 'width') {
        const calculatedWidth = viewportWidth - widthOffset;
        return calculatedWidth;
    } else if (property === 'height') {
        const calculatedHeight = viewportHeight - heightOffset;
        return calculatedHeight;
    }

    return 0;
};

export const vimeoPlayerAspectFit = () => {
    const videoElements = document.querySelectorAll(
        '.js-vimeo-player-aspect-fit',
    );

    videoElements.forEach((videoElement) => {
        const fitVideo = () => {
            const container = videoElement.closest(
                '.js-vimeo-player-aspect-fit__container',
            );
            if (!container) return;

            // CSSから計算済みスタイルを取得
            const containerWidth = getStyleSheetValue(container, 'width');
            const containerHeight = getStyleSheetValue(container, 'height');

            if (!containerWidth || !containerHeight) return;

            const containerRatio = containerWidth / containerHeight;
            const vimeoRatio = 16 / 9; // Vimeoの標準アスペクト比

            // 既存のdata属性を削除
            videoElement.removeAttribute('data-aspect');

            if (containerRatio > vimeoRatio) {
                // コンテナの方が横長の場合（landscape）
                videoElement.setAttribute('data-aspect', 'landscape');
            } else if (containerRatio < vimeoRatio) {
                // コンテナの方が縦長の場合（portrait）
                videoElement.setAttribute('data-aspect', 'portrait');
            }
            // containerRatio === vimeoRatio の場合は何も設定しない（デフォルト）
        };

        const initFitVideo = () => {
            // DOMが完全にレンダリングされた後に実行
            requestAnimationFrame(() => fitVideo());
        };

        // 初期化
        initFitVideo();
    });

    // リサイズ時にも再計算
    const handleResize = () => {
        videoElements.forEach((videoElement) => {
            const container = videoElement.closest(
                '.js-vimeo-player-aspect-fit__container',
            );
            if (!container) return;

            // CSSから計算済みスタイルを取得
            const containerWidth = getStyleSheetValue(container, 'width');
            const containerHeight = getStyleSheetValue(container, 'height');

            if (!containerWidth || !containerHeight) return;

            const containerRatio = containerWidth / containerHeight;
            const vimeoRatio = 16 / 9;

            // 既存のdata属性を削除
            videoElement.removeAttribute('data-aspect');

            if (containerRatio > vimeoRatio) {
                videoElement.setAttribute('data-aspect', 'landscape');
            } else if (containerRatio < vimeoRatio) {
                videoElement.setAttribute('data-aspect', 'portrait');
            }
        });
    };

    window.addEventListener('resize', handleResize);
};

/**
 * 初期化
 */
export const init = () => {
    vimeoPlayerAspectFit();
};

/**
 * 更新（ページ遷移時など）
 */
export const update = () => {
    vimeoPlayerAspectFit();
};
