import { isMobile } from './_class.js';

// Face画像アニメーション設定
const FACE_ANIMATION_CONFIG = {
    // ライトモードアニメーション設定
    lightMode: {
        defaultImage: 'light-0.webp',
        animationImage: 'light-1.webp',
        animationDuration: 400, // 2秒間表示
        interval: 5000, // アニメーション間隔（ミリ秒）
    },

    // ダークモードアニメーション設定
    darkMode: {
        defaultImage: 'dark-0.webp',
        animationSequence: [
            { image: 'dark-1.webp', duration: 1000 },
            { image: 'dark-2.webp', duration: 1000 },
            { image: 'dark-1.webp', duration: 1000 },
        ],
        interval: 4000, // アニメーション間隔（ミリ秒）
    },
};

let faceImg = null;
let faceButton = null;
let animationTimer = null;
let animationTimeoutId = null;
let isAnimating = false;

// 画像パスを生成
const getImagePath = (imageName) => {
    const templateDir =
        document
            .querySelector('meta[name="template-directory"]')
            ?.getAttribute('content') || '';
    return `${templateDir}/assets/img/face/${imageName}`;
};

// 現在のモードを取得（is-revクラスの有無で判定）
const getCurrentMode = () => {
    const htmlElement = document.documentElement;
    return htmlElement.classList.contains('is-rev') ? 'dark' : 'light';
};

// 次のアニメーション間隔を取得
const getNextInterval = () => {
    const currentMode = getCurrentMode();
    const config = FACE_ANIMATION_CONFIG[currentMode + 'Mode'];
    return config.interval;
};

// ライトモードアニメーション
const playLightModeAnimation = () => {
    if (isAnimating || !faceImg) return;

    isAnimating = true;
    const config = FACE_ANIMATION_CONFIG.lightMode;

    // アニメーション画像に切り替え
    faceImg.src = getImagePath(config.animationImage);

    // 指定時間後にデフォルト画像に戻す
    animationTimeoutId = setTimeout(() => {
        if (faceImg) {
            faceImg.src = getImagePath(config.defaultImage);
        }
        isAnimating = false;
        animationTimeoutId = null;
    }, config.animationDuration);
};

// ダークモードアニメーション
const playDarkModeAnimation = () => {
    if (isAnimating || !faceImg) return;

    isAnimating = true;
    const config = FACE_ANIMATION_CONFIG.darkMode;
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

// アニメーション実行
const executeAnimation = () => {
    const currentMode = getCurrentMode();

    if (currentMode === 'light') {
        playLightModeAnimation();
    } else {
        playDarkModeAnimation();
    }
};

// アニメーションタイマーを開始
const startAnimationTimer = () => {
    if (animationTimer) {
        clearInterval(animationTimer);
    }

    const interval = getNextInterval();
    animationTimer = setInterval(() => {
        executeAnimation();
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

// ホバー開始時の処理
const handleMouseEnter = () => {
    // アニメーションタイマーを停止（setTimeoutもクリア）
    stopAnimationTimer();

    // デフォルト画像に即座に切り替え
    const currentMode = getCurrentMode();
    const config = FACE_ANIMATION_CONFIG[currentMode + 'Mode'];
    const defaultImage = config.defaultImage;

    if (faceImg) {
        faceImg.src = getImagePath(defaultImage);
    }
};

// ホバー終了時の処理
const handleMouseLeave = () => {
    // アニメーションタイマーを再開始
    startAnimationTimer();
};

// クリック時の処理
const handleClick = () => {
    // 前のアニメーション停止
    if (isAnimating) {
        isAnimating = false;
    }
    stopAnimationTimer();

    // 次のモードのデフォルト画像に変更
    const currentMode = getCurrentMode();
    const config = FACE_ANIMATION_CONFIG[currentMode + 'Mode'];
    const defaultImage = config.defaultImage;

    if (faceImg) {
        faceImg.src = getImagePath(defaultImage);
    }
};

// タッチ開始時の処理（タッチデバイス専用）
const handleTouchStart = () => {
    // アニメーションタイマーを停止（setTimeoutもクリア）
    stopAnimationTimer();

    // デフォルト画像に即座に切り替え
    const currentMode = getCurrentMode();
    const config = FACE_ANIMATION_CONFIG[currentMode + 'Mode'];
    const defaultImage = config.defaultImage;

    if (faceImg) {
        faceImg.src = getImagePath(defaultImage);
    }
};

// タッチ終了時の処理（タッチデバイス専用）
const handleTouchEnd = () => {
    // 少し遅延してからアニメーション再開（clickイベントとの競合を避ける）
    setTimeout(() => {
        startAnimationTimer();
    }, 300);
};

// ホバーイベントを追加
const addHoverEvents = () => {
    if (!faceButton) return;

    if (isMobile()) {
        // タッチデバイス（スマホ・タブレット・iPad）の場合：タッチイベントのみ
        faceButton.addEventListener('touchstart', handleTouchStart);
        faceButton.addEventListener('touchend', handleTouchEnd);
        faceButton.addEventListener('touchcancel', handleTouchEnd);
        faceButton.addEventListener('click', handleClick);
    } else {
        // デスクトップの場合：マウスイベントのみ
        faceButton.addEventListener('mouseenter', handleMouseEnter);
        faceButton.addEventListener('mouseleave', handleMouseLeave);
        faceButton.addEventListener('click', handleClick);
    }
};

// モード変更時の処理（_changeColor.jsから呼び出される）
export const handleModeChange = () => {
    if (!faceImg) return;

    // アニメーション中の場合は即座に停止
    if (isAnimating) {
        isAnimating = false;
    }

    const currentMode = getCurrentMode();
    const config = FACE_ANIMATION_CONFIG[currentMode + 'Mode'];
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
    Object.assign(FACE_ANIMATION_CONFIG, newConfig);

    // タイマーを再開始
    if (faceImg) {
        stopAnimationTimer();
        startAnimationTimer();
    }
};

// 設定を取得する関数
export const getConfig = () => {
    return { ...FACE_ANIMATION_CONFIG };
};

// 初期化
export const init = () => {
    faceImg = document.querySelector('.js-face-animation');
    faceButton = document.querySelector('.l-header__button--face');

    if (!faceImg) return false;

    // 初期画像を設定
    handleModeChange();

    // ホバーイベントを追加
    addHoverEvents();

    // アニメーションタイマー開始
    startAnimationTimer();

    return true;
};

// クリーンアップ
export const destroy = () => {
    stopAnimationTimer();

    // ホバーイベントを削除
    if (faceButton) {
        if (isMobile()) {
            // タッチデバイス（スマホ・タブレット・iPad）の場合：タッチイベントを削除
            faceButton.removeEventListener('touchstart', handleTouchStart);
            faceButton.removeEventListener('touchend', handleTouchEnd);
            faceButton.removeEventListener('touchcancel', handleTouchEnd);
            faceButton.removeEventListener('click', handleClick);
        } else {
            // デスクトップの場合：マウスイベントを削除
            faceButton.removeEventListener('mouseenter', handleMouseEnter);
            faceButton.removeEventListener('mouseleave', handleMouseLeave);
            faceButton.removeEventListener('click', handleClick);
        }
    }

    faceImg = null;
    faceButton = null;
};
