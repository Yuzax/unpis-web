// 画像のロード完了を検知してis-loadedクラスを追加する機能

const processImageLoad = (img) => {
    // 画像がすでにロード済みの場合
    if (img.complete && img.naturalHeight !== 0) {
        img.classList.add('is-loaded');
        return;
    }

    // 画像のロードイベントを監視
    const handleLoad = () => {
        img.classList.add('is-loaded');
        img.removeEventListener('load', handleLoad);
        img.removeEventListener('error', handleError);
    };

    // 画像のエラーイベントを監視
    const handleError = () => {
        img.classList.add('is-loaded'); // エラーの場合もis-loadedを追加
        img.removeEventListener('load', handleLoad);
        img.removeEventListener('error', handleError);
    };

    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);
};

const initImageLoad = () => {
    const targets = document.getElementsByClassName('js-img-load');

    for (let i = 0; i < targets.length; i++) {
        processImageLoad(targets[i]);
    }
};

// 動的に追加された画像に対してもis-loadedクラスを追加する関数
export const processNewImages = (elements) => {
    if (!elements) return;

    // NodeListまたは配列の場合
    if (elements.length !== undefined) {
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].classList.contains('js-img-load')) {
                processImageLoad(elements[i]);
            }
        }
    } else {
        // 単一要素の場合
        if (elements.classList.contains('js-img-load')) {
            processImageLoad(elements);
        }
    }
};

export const init = () => {
    initImageLoad();
};
