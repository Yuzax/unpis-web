import * as Devices from 'AppJs/_method/_class';

let target = null,
    targetText = null,
    visibleTarget = [],
    kvGesture = null;

// Blinkのアニメーション自体はcssで管理してます。

const setDeviceSpecificText = () => {
    if (!target || !targetText) return;

    // data-kv-gesture属性からgestureを取得
    kvGesture = target.dataset.kvGesture || '';

    // PC/SP判定に基づいてテキストを設定
    let textContent = '';
    if (Devices.isDesktop()) {
        // PC用テキスト
        if (kvGesture === 'click') {
            textContent = 'Click';
        } else if (kvGesture === 'hold') {
            textContent = 'Keep pushing';
        } else if (kvGesture === 'parallax') {
            textContent = 'Keep moving';
        } else {
            textContent = 'Keep pushing';
        }
    } else {
        // SP用テキスト
        if (kvGesture === 'click') {
            textContent = 'Tap';
        } else if (kvGesture === 'hold') {
            textContent = 'Keep pushing';
        } else if (kvGesture === 'parallax') {
            textContent = 'Keep dragging';
        } else {
            textContent = 'Keep pushing';
        }
    }

    // テキストを設定して表示
    targetText.textContent = textContent;
};

const setEventListener = () => {
    targetText.addEventListener('animationend', () => {
        setTimeout(() => {
            if (targetText == null || target == null) return false;
            targetText.classList.remove('is-animating');
            target.classList.add('is-hide');
            for (let i = 0; i < visibleTarget.length; i++) {
                visibleTarget[i].classList.remove('is-hide');
            }
        }, 800);
    });
};

export const init = () => {
    target = document.getElementsByClassName('js-kv-note')[0];
    visibleTarget = document.getElementsByClassName(
        'js-kv-note__visible-target',
    );
    if (target == null || visibleTarget.length == 0) return false;
    targetText = target.getElementsByClassName('js-kv-note__text')[0];

    // デバイス判定後にテキストを設定・表示
    setDeviceSpecificText();

    targetText.classList.add('is-animating');
    setEventListener();
};
