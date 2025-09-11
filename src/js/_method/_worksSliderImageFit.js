/**
 * Works slider item の画像を contain のように表示する
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
        console.log(
            `Calculated width: ${viewportWidth} - ${widthOffset} = ${calculatedWidth}`,
        );
        return calculatedWidth;
    } else if (property === 'height') {
        const calculatedHeight = viewportHeight - heightOffset;
        console.log(
            `Calculated height: ${viewportHeight} - ${heightOffset} = ${calculatedHeight}`,
        );
        return calculatedHeight;
    }

    return 0;
};

export const worksSliderImageFit = () => {
    const images = document.querySelectorAll('.js-works-slider-image-fit__img');

    images.forEach((img) => {
        const fitImage = () => {
            const container = img.closest('.js-works-slider-image-fit__wrap');
            if (!container) return;

            // CSSから計算済みスタイルを取得
            const containerWidth = getStyleSheetValue(container, 'width');
            const containerHeight = getStyleSheetValue(container, 'height');

            const containerRatio = containerWidth / containerHeight;
            const imgRatio = img.naturalWidth / img.naturalHeight;

            console.log(container, containerWidth, containerHeight);

            // 既存のクラスを削除
            img.classList.remove('is-vertical', 'is-horizontal');

            if (imgRatio > containerRatio) {
                // 画像の方が横長の場合、幅を100%に
                img.classList.add('is-horizontal');
            } else {
                // 画像の方が縦長の場合、高さを100%に
                img.classList.add('is-vertical');
            }
        };

        const initFitImage = () => {
            // DOMが完全にレンダリングされた後に実行
            requestAnimationFrame(() => fitImage());
        };

        if (img.complete && img.naturalWidth > 0) {
            initFitImage();
        } else {
            img.addEventListener('load', initFitImage);
        }
    });

    // リサイズ時にも再計算
    window.addEventListener('resize', () => {
        images.forEach((img) => {
            const container = img.closest('.js-works-slider-image-fit__wrap');
            if (!container) return;

            // CSSから計算済みスタイルを取得
            const containerWidth = getStyleSheetValue(container, 'width');
            const containerHeight = getStyleSheetValue(container, 'height');

            const containerRatio = containerWidth / containerHeight;
            const imgRatio = img.naturalWidth / img.naturalHeight;

            // 既存のクラスを削除
            img.classList.remove('is-vertical', 'is-horizontal');

            if (imgRatio > containerRatio) {
                img.classList.add('is-horizontal');
            } else {
                img.classList.add('is-vertical');
            }
        });
    });
};
