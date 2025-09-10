import * as Devices from 'AppJs/_method/_class';

let kv = null,
    images = [],
    activeImgWrapIndex = null,
    activeImgIndex = 0,
    parallaxWraps = [],
    containerRect = null,
    isParallaxActive = false,
    baseMouseX = 0,
    baseMouseY = 0,
    hasBasePosition = false;

//------------
// CLICK & HOLD ELEMENTS
//------------

const setTargetImages = (_kv) => {
    const imgWrap = _kv.getElementsByClassName('js-kv__image-wrap');
    for (let i = 0; i < 2; i++)
        images.push(imgWrap[i].getElementsByTagName('img'));
};

const setActiveIndex = () => {
    //- 0:pc, 1:sp
    if (Devices.isPhoneWindowSize()) activeImgWrapIndex = 1;
    else activeImgWrapIndex = 0;
};

//------------
// CLICK ELEMENTS
//------------

const hideAllImages = () => {
    for (let i = 0; i < 2; i++) {
        for (let k = 0; k < images[i].length; k++) {
            images[i][k].classList.add('is-hide');
        }
    }
};

const showTargetImage = () => {
    if (activeImgIndex > images[activeImgWrapIndex].length - 1)
        activeImgIndex = 0;
    let disActiveIndex =
        activeImgIndex > images[1 - activeImgWrapIndex].length - 1
            ? images[1 - activeImgWrapIndex].length - 1
            : activeImgIndex;
    images[activeImgWrapIndex][activeImgIndex].classList.remove('is-hide');
    images[1 - activeImgWrapIndex][disActiveIndex].classList.remove('is-hide');
};

const clickEvent = () => {
    hideAllImages();
    activeImgIndex++;
    showTargetImage();
};

const initClickKv = (_kv) => {
    setTargetImages(_kv);
    setActiveIndex();
    kv.addEventListener('click', clickEvent);
};

//------------
// HOLD ELEMENTS
//------------

const startHoldEvent = () => {
    images[activeImgWrapIndex][1].classList.remove('is-hide');
};

const endHoldEvent = () => {
    images[activeImgWrapIndex][1].classList.add('is-hide');
};

const initHoldKv = (_kv) => {
    setTargetImages(_kv);
    setActiveIndex();
    if (Devices.isDesktop()) {
        kv.addEventListener('mousedown', startHoldEvent);
        kv.addEventListener('mouseup', endHoldEvent);
        kv.addEventListener('mouseleave', endHoldEvent);
    } else {
        kv.addEventListener('touchstart', startHoldEvent);
        kv.addEventListener('touchend', endHoldEvent);
        kv.addEventListener('touchcancel', endHoldEvent);
    }
};

//------------
// PARALLAX ELEMENTS
//------------

const setParallaxElements = (_kv) => {
    parallaxWraps = Array.from(_kv.getElementsByClassName('js-kv__image-wrap'));
    containerRect = _kv.getBoundingClientRect();
};

const setBasePosition = (x, y) => {
    baseMouseX = x;
    baseMouseY = y;
    hasBasePosition = true;
};

const calculateParallax = (x, y) => {
    if (!containerRect || !hasBasePosition) return;

    // 基準位置からの相対移動を計算
    const deltaX = x - baseMouseX;
    const deltaY = y - baseMouseY;

    // コンテナサイズに対する相対値に変換（-1 ~ 1の範囲）
    const relativeX = (deltaX / containerRect.width) * 2;
    const relativeY = (deltaY / containerRect.height) * 2;

    parallaxWraps.forEach((wrap) => {
        const strength = parseInt(wrap.dataset.parallaxStrength) || 0;
        const maxMove = strength * 0.5; // strengthの50%を最大移動量とする

        const moveX = relativeX * maxMove;
        const moveY = relativeY * maxMove;

        wrap.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
};

const parallaxMouseMove = (e) => {
    if (!isParallaxActive) return;
    calculateParallax(e.clientX, e.clientY);
};

const parallaxTouchMove = (e) => {
    if (!isParallaxActive || e.touches.length === 0) return;
    // スクロールを阻害しないよう、条件付きでpreventDefault
    if (hasBasePosition) {
        e.preventDefault();
    }
    const touch = e.touches[0];
    calculateParallax(touch.clientX, touch.clientY);
};

const parallaxTouchStart = (e) => {
    isParallaxActive = true;
    if (e.touches.length > 0) {
        const touch = e.touches[0];
        // タッチ開始位置を基準位置として設定
        setBasePosition(touch.clientX, touch.clientY);
    }
};

const parallaxTouchEnd = () => {
    isParallaxActive = false;
};

const resetParallax = () => {
    parallaxWraps.forEach((wrap) => {
        wrap.style.transform = 'translate(0px, 0px)';
    });
    hasBasePosition = false;
};

const resizeParallaxKv = () => {
    if (kv) {
        containerRect = kv.getBoundingClientRect();
    }
};

// グローバルマウス位置を追跡
let globalMouseX = 0;
let globalMouseY = 0;

const trackGlobalMouse = (e) => {
    globalMouseX = e.clientX;
    globalMouseY = e.clientY;

    // パララックスが有効で、マウスがKVエリア内にある場合
    if (isParallaxActive && containerRect) {
        if (
            globalMouseX >= containerRect.left &&
            globalMouseX <= containerRect.right &&
            globalMouseY >= containerRect.top &&
            globalMouseY <= containerRect.bottom
        ) {
            calculateParallax(globalMouseX, globalMouseY);
        }
    }
};

const checkInitialMousePositionImproved = () => {
    if (!Devices.isDesktop() || !containerRect) return;

    // マウス位置を直接取得してチェック
    const checkMousePosition = (e) => {
        globalMouseX = e.clientX;
        globalMouseY = e.clientY;

        // KVエリア内にあるかチェック
        if (
            globalMouseX >= containerRect.left &&
            globalMouseX <= containerRect.right &&
            globalMouseY >= containerRect.top &&
            globalMouseY <= containerRect.bottom
        ) {
            isParallaxActive = true;
            setBasePosition(globalMouseX, globalMouseY);
            calculateParallax(globalMouseX, globalMouseY);
        }

        // 一度だけ実行するためにイベントリスナーを削除
        document.removeEventListener('mousemove', checkMousePosition);
    };

    // グローバルマウス位置が初期化されていない場合は、次のマウス移動を待つ
    if (globalMouseX === 0 && globalMouseY === 0) {
        document.addEventListener('mousemove', checkMousePosition, {
            once: true,
        });
        return;
    }

    // グローバルマウス位置でKVエリア内にあるかチェック
    if (
        globalMouseX >= containerRect.left &&
        globalMouseX <= containerRect.right &&
        globalMouseY >= containerRect.top &&
        globalMouseY <= containerRect.bottom
    ) {
        isParallaxActive = true;
        setBasePosition(globalMouseX, globalMouseY);
        calculateParallax(globalMouseX, globalMouseY);
    }
};

const initParallaxKv = (_kv) => {
    setParallaxElements(_kv);

    if (Devices.isDesktop()) {
        // グローバルマウス追跡を即座に開始（既に開始されていない場合のみ）
        if (!document.hasGlobalMouseTracking) {
            document.addEventListener('mousemove', trackGlobalMouse);
            document.hasGlobalMouseTracking = true;
        }

        // デスクトップ：マウス移動でパララックス
        kv.addEventListener('mouseenter', (e) => {
            isParallaxActive = true;
            setBasePosition(e.clientX, e.clientY);
        });
        kv.addEventListener('mouseleave', () => {
            isParallaxActive = false;
            resetParallax();
        });
        kv.addEventListener('mousemove', parallaxMouseMove);

        // シンプルな初期マウス位置チェック（効果的だった部分のみ）
        const performInitialCheck = () => {
            containerRect = _kv.getBoundingClientRect();
            checkInitialMousePositionImproved();
        };

        // 最小限のタイミングでのみチェック
        setTimeout(performInitialCheck, 100);
        setTimeout(performInitialCheck, 300);

        // DOM読み込み完了後にもチェック
        if (document.readyState === 'complete') {
            setTimeout(performInitialCheck, 100);
        } else {
            window.addEventListener('load', () => {
                setTimeout(performInitialCheck, 100);
            });
        }
    } else {
        // passive: falseを明示的に設定してpreventDefaultを有効にする
        kv.addEventListener('touchstart', parallaxTouchStart, {
            passive: false,
        });
        kv.addEventListener('touchmove', parallaxTouchMove, { passive: false });
        kv.addEventListener('touchend', parallaxTouchEnd);
        kv.addEventListener('touchcancel', parallaxTouchEnd);
    }
};

//------------
// COMMON
//------------

const resetVariables = () => {
    // 既存のグローバルマウストラッキングを削除
    if (
        kv &&
        kv.classList.contains('js-kv--parallax') &&
        document.hasGlobalMouseTracking
    ) {
        document.removeEventListener('mousemove', trackGlobalMouse);
        document.hasGlobalMouseTracking = false;
    }

    kv = null;
    images = [];
    activeImgWrapIndex = null;
    activeImgIndex = 0;
    parallaxWraps = [];
    containerRect = null;
    isParallaxActive = false;
    // グローバルマウス位置はリセットしない（他のページでも使用される可能性があるため）
    baseMouseX = 0;
    baseMouseY = 0;
    hasBasePosition = false;
};

export const resize = () => {
    if (kv == undefined) return;
    if (
        kv.classList.contains('js-kv--click') ||
        kv.classList.contains('js-kv--hold')
    )
        setActiveIndex();
    else if (kv.classList.contains('js-kv--parallax')) resizeParallaxKv();
};

export const update = () => {
    resetVariables();
    init();
};

export const init = () => {
    kv = document.getElementsByClassName('js-kv')[0];
    if (kv == undefined) return;
    if (kv.classList.contains('js-kv--click')) initClickKv(kv);
    else if (kv.classList.contains('js-kv--hold')) initHoldKv(kv);
    else if (kv.classList.contains('js-kv--parallax')) initParallaxKv(kv);
};
