import { isSafari } from './_class.js';

const ActiveScrollPosition = 100;

let dancingManElement = null;
let dancingManImg = null;
let currentFrame = 0;
let lastScrollTop = 0;
let animationFrameId = null;
let isInitialized = false;
let lastScrollTime = 0;
let isActive = false;
let scrollCounter = 0; // スクロール回数をカウント

// 画像のプリロード用配列
const imageCache = [];
const totalFrames = 18; // 0.webp から 17.webp まで

// 特別な画像
let kimeImage = null;
let hoverImage = null;
let isAtBottom = false;
let isHovered = false;

// ダンサーをトグルする処理
const toggleDancer = (_scrollTop) => {
    if (!dancingManElement) return;
    if (_scrollTop > ActiveScrollPosition && !isActive) {
        dancingManElement.classList.add('is-active');
        isActive = true;
    } else if (_scrollTop <= ActiveScrollPosition && isActive) {
        dancingManElement.classList.remove('is-active');
        isActive = false;
    }
};

// ベースパスを取得する関数
const getBasePath = () => {
    const metaTag = document.querySelector('meta[name="template-directory"]');
    if (metaTag) {
        const templateDir = metaTag.getAttribute('content') || '';
        return `${templateDir}/assets/img/dancers/`;
    }
    return '';
};

// 単一画像をプリロードする関数
const loadSingleImage = (src) => {
    return new Promise((resolve) => {
        const img = new Image();
        // Safari対応: crossOriginを設定
        if (isSafari()) img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null); // エラーでもresolveして処理を続行
        img.src = src;
    });
};

// 画像をプリロードする関数
const preloadImages = async () => {
    const basePath = getBasePath();
    // 並列でプリロード実行
    const loadPromises = [];
    // アニメーション画像をプリロード
    for (let i = 0; i < totalFrames; i++) {
        loadPromises.push(
            loadSingleImage(`${basePath}${i}.webp`).then((img) => {
                if (img) imageCache[i] = img;
            }),
        );
    }
    // 特別な画像をプリロード
    loadPromises.push(
        loadSingleImage(`${basePath}kime.webp`).then((img) => {
            kimeImage = img;
        }),
    );
    loadPromises.push(
        loadSingleImage(`${basePath}hover.webp`).then((img) => {
            hoverImage = img;
        }),
    );
    // すべての画像の読み込み完了を待つ
    await Promise.all(loadPromises);
};

// フレームを更新する関数
const updateFrame = (frame) => {
    if (!dancingManImg) return;

    // ホバー状態の場合はhover.webpを表示
    if (isHovered && hoverImage && hoverImage.complete) {
        dancingManImg.src = hoverImage.src;
        return;
    }

    // ページ最下部の場合はkime.webpを表示
    if (isAtBottom && kimeImage && kimeImage.complete) {
        dancingManImg.src = kimeImage.src;
        return;
    }

    // 通常のアニメーションフレーム
    if (imageCache[frame] && imageCache[frame].complete) {
        dancingManImg.src = imageCache[frame].src;
    }
};

// ページ最下部かどうかを判定する関数
const checkIfAtBottom = (scrollTop) => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const threshold = 50; // 50px手前で最下部と判定

    const wasAtBottom = isAtBottom;
    isAtBottom = scrollTop + windowHeight >= documentHeight - threshold;

    // 状態が変わった場合は画像を更新
    if (wasAtBottom !== isAtBottom) {
        updateFrame(currentFrame);
    }
};

// ホバーイベントハンドラー
const handleMouseEnter = () => {
    isHovered = true;
    updateFrame(currentFrame);
};

const handleMouseLeave = () => {
    isHovered = false;
    updateFrame(currentFrame);
};

// スクロール速度を計算する関数
const calculateScrollSpeed = (scrollDelta, timeDelta) => {
    if (timeDelta === 0) return 0;
    return Math.abs(scrollDelta) / timeDelta; // px/ms
};

// スクロール速度に応じてフレーム進行するかどうかを判定する関数
const shouldAdvanceFrame = (scrollDelta, scrollSpeed) => {
    scrollCounter++;

    // スクロール速度に応じて細かく段階的に調整
    if (scrollSpeed >= 2.0) {
        // 超高速：毎回進行
        return true;
    } else if (scrollSpeed >= 1.5) {
        // 高速：ほぼ毎回進行（10回中9回）
        return scrollCounter % 10 !== 0;
    } else if (scrollSpeed >= 1.0) {
        // やや高速：5回中4回進行
        return scrollCounter % 5 !== 0;
    } else if (scrollSpeed >= 0.7) {
        // 中速：3回中2回進行
        return scrollCounter % 3 !== 0;
    } else if (scrollSpeed >= 0.5) {
        // やや低速：2回に1回進行
        return scrollCounter % 2 === 0;
    } else if (scrollSpeed >= 0.3) {
        // 低速：3回に1回進行
        return scrollCounter % 3 === 0;
    } else if (scrollSpeed >= 0.15) {
        // かなり低速：4回に1回進行
        return scrollCounter % 4 === 0;
    } else {
        // 極低速：5回に1回進行
        return scrollCounter % 5 === 0;
    }
};

// 初期化関数
const initVariable = (scrollTop) => {
    dancingManElement = document.querySelector('.js-dancing-man');
    if (dancingManElement) {
        dancingManImg = dancingManElement.querySelector('img');
    }
    currentFrame = 0;
    // 渡されたスクロール位置を使用、なければ現在位置を取得
    lastScrollTop =
        scrollTop !== undefined
            ? scrollTop
            : window.pageYOffset || document.documentElement.scrollTop;
    lastScrollTime = performance.now();
};

// イベントリスナーの追加
const addEventListeners = () => {
    if (dancingManElement) {
        // ホバーイベントを追加
        dancingManElement.addEventListener('mouseenter', handleMouseEnter);
        dancingManElement.addEventListener('mouseleave', handleMouseLeave);
    }
};

// イベントリスナーの削除
const removeEventListeners = () => {
    if (dancingManElement) {
        dancingManElement.removeEventListener('mouseenter', handleMouseEnter);
        dancingManElement.removeEventListener('mouseleave', handleMouseLeave);
    }
};

// クリーンアップ関数
const cleanup = () => {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
    removeEventListeners();
    isInitialized = false;
    isAtBottom = false;
    isHovered = false;
    isActive = false;
    scrollCounter = 0;
};

// ページ遷移時の更新関数
export const update = () => {
    // ページ遷移時に状態をリセット
    isInitialized = false;
    isActive = false;
    isAtBottom = false;
    isHovered = false;
    scrollCounter = 0;

    // 現在のスクロール位置を取得して再初期化
    const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
    init(currentScrollTop);
};

// メイン初期化関数
export const init = (_scrollTop) => {
    // 重複初期化を防ぐ
    if (isInitialized) {
        return;
    }

    // より確実にスクロール位置を取得
    let initialScrollTop;
    if (_scrollTop !== undefined && _scrollTop !== null) {
        initialScrollTop = _scrollTop;
    } else {
        // 複数の方法でスクロール位置を取得
        initialScrollTop =
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0;
    }
    // スクロール位置を渡して初期化
    initVariable(initialScrollTop);

    if (dancingManElement && dancingManImg) {
        // 画像をプリロード（非同期）
        preloadImages().then(() => {
            // プリロード完了後にイベントリスナーを追加
            addEventListeners();
            isInitialized = true;

            // 再度現在のスクロール位置を確認
            const currentScrollTop =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop ||
                initialScrollTop;

            // 最下部判定を先に実行
            checkIfAtBottom(currentScrollTop);

            // 初期フレームを設定（最下部の場合はkime.webpが表示される）
            updateFrame(currentFrame);

            // ダンサーを表示
            toggleDancer(currentScrollTop);
        });

        // ページ離脱時のクリーンアップ
        window.addEventListener('beforeunload', cleanup);
    }
};

// 外部から呼び出し可能なスクロールハンドラー（app.jsから使用）
export const onScroll = (scrollTop) => {
    if (!isInitialized || !dancingManElement || !dancingManImg) {
        return;
    }

    // ダンサーを表示する関数
    toggleDancer(scrollTop);

    // ページ最下部かどうかをチェック
    checkIfAtBottom(scrollTop);

    // スクロール処理
    const currentTime = performance.now();
    const scrollDelta = scrollTop - lastScrollTop;
    const timeDelta = currentTime - lastScrollTime;

    // スクロール速度を計算
    const scrollSpeed = calculateScrollSpeed(scrollDelta, timeDelta);

    // フレーム進行するかどうかを判定
    if (shouldAdvanceFrame(scrollDelta, scrollSpeed)) {
        // 1フレーム進める
        currentFrame = (currentFrame + 1) % totalFrames;
        updateFrame(currentFrame);
    }

    lastScrollTop = scrollTop;
    lastScrollTime = currentTime;
};

// 外部から呼び出し可能なリサイズハンドラー（app.jsから使用）
export const onResize = () => {
    if (!isInitialized) {
        return;
    }

    // リサイズ時にスクロール位置と時間を更新
    lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    lastScrollTime = performance.now();

    // リサイズ後に最下部判定を再実行
    checkIfAtBottom(lastScrollTop);
};

// 外部から呼び出し可能な高さ再計算関数（infiniteScrollから使用）
export const recalculateHeight = () => {
    if (!isInitialized) {
        return;
    }

    // 現在のスクロール位置を取得
    const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

    // 最下部判定を再実行
    checkIfAtBottom(currentScrollTop);
};
