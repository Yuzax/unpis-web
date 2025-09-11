// 404 Face画像アニメーション設定（_faceAnimationのdarkModeパラメータを使用）
const FACE_404_ANIMATION_CONFIG = {
    // ライトモードアニメーション設定
    lightMode: {
        defaultImage: 'light-0.webp',
        animationSequence: [
            { image: 'light-1.webp', duration: 1000 },
            { image: 'light-2.webp', duration: 1000 },
            { image: 'light-1.webp', duration: 1000 },
        ],
        interval: 1000, // アニメーション間隔（ミリ秒）
    },

    // ダークモードアニメーション設定
    darkMode: {
        defaultImage: 'dark-0.webp',
        animationSequence: [
            { image: 'dark-1.webp', duration: 1000 },
            { image: 'dark-2.webp', duration: 1000 },
            { image: 'dark-1.webp', duration: 1000 },
        ],
        interval: 1000, // アニメーション間隔（ミリ秒）
    },
};

let faceImg = null;
let animationTimer = null;
let animationTimeoutId = null;
let isAnimating = false;

// 画像パスを生成
const getImagePath = (imageName) => {
    const templateDir =
        document
            .querySelector('meta[name="template-directory"]')
            ?.getAttribute('content') || '';
    return `${templateDir}/assets/img/404/${imageName}`;
};

// 現在のモードを取得（is-revクラスの有無で判定）
const getCurrentMode = () => {
    const htmlElement = document.documentElement;
    return htmlElement.classList.contains('is-rev') ? 'dark' : 'light';
};

// 次のアニメーション間隔を取得
const getNextInterval = () => {
    const currentMode = getCurrentMode();
    const config = FACE_404_ANIMATION_CONFIG[currentMode + 'Mode'];
    return config.interval;
};

// アニメーション実行（ライト・ダーク共通）
const playAnimation = () => {
    if (isAnimating || !faceImg) return;

    isAnimating = true;
    const currentMode = getCurrentMode();
    const config = FACE_404_ANIMATION_CONFIG[currentMode + 'Mode'];
    let sequenceIndex = 0;

    const playSequence = () => {
        if (sequenceIndex >= config.animationSequence.length) {
            // シーケンス終了、デフォルト画像に戻す
            faceImg.src = getImagePath(config.defaultImage);
            isAnimating = false;
            animationTimeoutId = null;
            return;
        }

        const currentStep = config.animationSequence[sequenceIndex];
        faceImg.src = getImagePath(currentStep.image);

        animationTimeoutId = setTimeout(() => {
            sequenceIndex++;
            playSequence();
        }, currentStep.duration);
    };

    playSequence();
};

// アニメーションタイマーを開始
const startAnimationTimer = () => {
    if (animationTimer) {
        clearInterval(animationTimer);
    }

    const interval = getNextInterval();
    animationTimer = setInterval(() => {
        playAnimation();
    }, interval);
};

// アニメーションタイマーを停止
const stopAnimationTimer = () => {
    if (animationTimer) {
        clearInterval(animationTimer);
        animationTimer = null;
    }

    // アニメーション中のsetTimeoutもクリア
    if (animationTimeoutId) {
        clearTimeout(animationTimeoutId);
        animationTimeoutId = null;
    }

    isAnimating = false;
};

// モード変更時の処理（_changeColor.jsから呼び出される）
export const handleModeChange = () => {
    if (!faceImg) return;

    // アニメーション中の場合は即座に停止
    if (isAnimating) {
        isAnimating = false;
    }

    const currentMode = getCurrentMode();
    const config = FACE_404_ANIMATION_CONFIG[currentMode + 'Mode'];
    const defaultImage = config.defaultImage;

    // 即座にデフォルト画像に切り替え
    faceImg.src = getImagePath(defaultImage);
};

// ページ遷移時の処理（Barbaから呼び出される）
export const update = () => {
    // アニメーションを一旦停止
    stopAnimationTimer();

    // モード変更処理を実行（Cookieの状態に基づいて画像を設定）
    handleModeChange();

    // アニメーションタイマーを再開始
    startAnimationTimer();
};

// 設定を更新する関数（外部から呼び出し可能）
export const updateConfig = (newConfig) => {
    Object.assign(FACE_404_ANIMATION_CONFIG, newConfig);

    // タイマーを再開始
    if (faceImg) {
        stopAnimationTimer();
        startAnimationTimer();
    }
};

// 設定を取得する関数
export const getConfig = () => {
    return { ...FACE_404_ANIMATION_CONFIG };
};

// 初期化
export const init = () => {
    faceImg = document.querySelector('.js-404-face img');

    if (!faceImg) return false;

    // 初期画像を設定
    handleModeChange();

    // アニメーションタイマー開始
    startAnimationTimer();

    return true;
};

// クリーンアップ
export const destroy = () => {
    stopAnimationTimer();
    faceImg = null;
};
