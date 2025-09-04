import * as faceAnimation from './_faceAnimation.js';

let btn = null,
    target = null,
    htmlTarget = null;

// Cookieから値を取得する関数
export const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};

const updateColor = (_change = true) => {
    const isRev = htmlTarget.classList.contains('is-rev');
    // Face画像のモード変更処理を呼び出し
    faceAnimation.handleModeChange();
    for (let i = 0; i < target.length; i++) {
        if (_change) {
            if (isRev) {
                target[i].classList.remove('is-rev');
                // Cookieにライトモードを保存
                document.cookie = 'color_mode=light; path=/; max-age=31536000';
            } else {
                target[i].classList.add('is-rev');
                // Cookieにダークモードを保存
                document.cookie = 'color_mode=dark; path=/; max-age=31536000';
            }
        } else {
            if (isRev) target[i].classList.add('is-rev');
            else target[i].classList.remove('is-rev');
        }
    }
};

// Cookieからカラーモードを復元
const restoreColorFromCookie = () => {
    if (!htmlTarget) return;

    const colorMode = getCookie('color_mode');
    const isDarkFromCookie = colorMode === 'dark';

    // Cookieの状態に基づいてhtmlタグにクラスを設定
    if (isDarkFromCookie) {
        htmlTarget.classList.add('is-rev');
    } else {
        htmlTarget.classList.remove('is-rev');
    }

    // Face画像のモード変更処理を呼び出し
    faceAnimation.handleModeChange();

    // Face画像もCookieの状態に復元
    restoreFaceImageFromCookie();

    // 他の要素にも同じ状態を適用
    for (let i = 0; i < target.length; i++) {
        if (isDarkFromCookie) {
            target[i].classList.add('is-rev');
        } else {
            target[i].classList.remove('is-rev');
        }
    }
};

// Face画像をCookieの状態に復元する処理
const restoreFaceImageFromCookie = () => {
    faceAnimation.handleModeChange();
};

const addMouseEvents = async (_target) => {
    if (_target == undefined) return false;
    _target.addEventListener('click', () => {
        updateColor();
    });
};

//- 別ページに遷移した時
export const update = () => {
    updateColor(false);
};

export const init = () => {
    ((btn = document.getElementsByClassName('js-change-color-btn')[0]),
        (target = document.getElementsByClassName('js-change-color-target')),
        (htmlTarget = document.getElementsByClassName(
            'js-change-color-target',
        )[0]));
    if (target.length == 0) return false;
    addMouseEvents(btn);

    // ページ読み込み時にCookieの状態からカラーモードを復元
    restoreColorFromCookie();
};
