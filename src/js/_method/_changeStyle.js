import {
    setStyle as SetMasonry,
    setDefaultStyle as DeleteMasonry,
} from 'AppJs/_method/_masonry';
import { recalculate as RecalculateHeaderScroll } from 'AppJs/_method/_headerScroll';

let arrow = null,
    worksWrap = null,
    worksItem = [],
    htmlTarget = null;

const changeImageSize = (_target, _isList = false) => {
    const img = _target.getElementsByClassName('js-change-style__image')[0];
    if (_isList) {
        img.dataset.sizesTile = img.sizes;
        img.sizes = img.dataset.sizesList;
    } else {
        img.dataset.sizesList = img.sizes;
        img.sizes = img.dataset.sizesTile;
    }
};

const changeArrowState = (_isList = false) => {
    if (_isList) arrow.classList.add('is-list');
    else arrow.classList.remove('is-list');
};

const changeToTile = (_targetButton) => {
    // 他のボタンからis-activeクラスを削除
    const listButton = document.getElementsByClassName(
        'js-change-style__button--list',
    )[0];
    if (listButton) listButton.classList.remove('is-active');

    _targetButton.classList.add('is-active');
    changeArrowState();
    worksWrap.classList.remove('is-active-list');
    // htmlタグからis-listクラスを削除
    if (htmlTarget) htmlTarget.classList.remove('is-list');
    // Cookieにタイルレイアウトを保存
    document.cookie = 'layout_style=tile; path=/; max-age=31536000'; // 1年間有効
    for (let i = 0; i < worksItem.length; i++) {
        changeImageSize(worksItem[i]);
        worksItem[i].classList.remove('is-active-list');
        if (i == worksItem.length - 1) {
            SetMasonry();
            // タイルレイアウト変更後にヘッダー位置を再計算
            setTimeout(() => {
                RecalculateHeaderScroll();
            }, 50);
        }
    }
};

const changeToList = (_targetButton) => {
    // 他のボタンからis-activeクラスを削除
    const tileButton = document.getElementsByClassName(
        'js-change-style__button--tile',
    )[0];
    if (tileButton) tileButton.classList.remove('is-active');

    _targetButton.classList.add('is-active');
    changeArrowState(true);
    DeleteMasonry();
    worksWrap.classList.add('is-active-list');
    // htmlタグにis-listクラスを追加
    if (htmlTarget) htmlTarget.classList.add('is-list');
    // Cookieにリストレイアウトを保存
    document.cookie = 'layout_style=list; path=/; max-age=31536000'; // 1年間有効
    for (let i = 0; i < worksItem.length; i++) {
        changeImageSize(worksItem[i], true);
        worksItem[i].classList.add('is-active-list');
        if (i == worksItem.length - 1) {
            // リストレイアウト変更後にヘッダー位置を再計算
            setTimeout(() => {
                RecalculateHeaderScroll();
            }, 50);
        }
    }
};

const setEventListener = (_targetButtons) => {
    for (let i = 0; i < _targetButtons.length; i++) {
        _targetButtons[i].addEventListener('click', (_e) => {
            if (_e.target.classList.contains('is-active')) return false;
            _targetButtons[i == 0 ? 1 : 0].classList.remove('is-active');
            if (_e.target.classList.contains('js-change-style__button--tile'))
                changeToTile(_e.target);
            else changeToList(_e.target);
        });
    }
};

// Cookieから値を取得する関数
const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};

// ページ遷移時にスタイルを復元
const restoreStyleFromCookie = () => {
    if (!htmlTarget || !worksWrap) return;

    const layoutStyle = getCookie('layout_style');
    const isListFromCookie = layoutStyle === 'list';

    // ボタンの状態を更新
    const tileButton = document.getElementsByClassName(
        'js-change-style__button--tile',
    )[0];
    const listButton = document.getElementsByClassName(
        'js-change-style__button--list',
    )[0];

    if (tileButton && listButton) {
        if (isListFromCookie) {
            tileButton.classList.remove('is-active');
            listButton.classList.add('is-active');
        } else {
            tileButton.classList.add('is-active');
            listButton.classList.remove('is-active');
        }
    }

    // Cookieの状態に基づいてhtmlタグにクラスを設定
    if (isListFromCookie) {
        htmlTarget.classList.add('is-list');
    } else {
        htmlTarget.classList.remove('is-list');
    }

    const isListFromWrap = worksWrap.classList.contains('is-active-list');

    // Cookieの状態とworksWrapの状態が異なる場合、Cookieの状態に合わせる
    if (isListFromCookie && !isListFromWrap) {
        // リストスタイルに変更
        worksWrap.classList.add('is-active-list');
        changeArrowState(true);
        DeleteMasonry();
        for (let i = 0; i < worksItem.length; i++) {
            changeImageSize(worksItem[i], true);
            worksItem[i].classList.add('is-active-list');
            if (i == worksItem.length - 1) {
                // Cookie復元時のリストレイアウト変更後にヘッダー位置を再計算
                setTimeout(() => {
                    RecalculateHeaderScroll();
                }, 50);
            }
        }
    } else if (!isListFromCookie && isListFromWrap) {
        // タイルスタイルに変更
        worksWrap.classList.remove('is-active-list');
        changeArrowState();
        for (let i = 0; i < worksItem.length; i++) {
            changeImageSize(worksItem[i]);
            worksItem[i].classList.remove('is-active-list');
            if (i == worksItem.length - 1) {
                SetMasonry();
                // Cookie復元時のタイルレイアウト変更後にヘッダー位置を再計算
                setTimeout(() => {
                    RecalculateHeaderScroll();
                }, 50);
            }
        }
    } else {
        // 状態が同じ場合でも矢印の状態を確実に設定
        changeArrowState(isListFromCookie);
    }
};

export const init = () => {
    const buttons = document.getElementsByClassName('js-change-style__button');
    ((arrow = document.getElementsByClassName('js-change-style__arrow')[0]),
        (worksWrap = document.getElementsByClassName('js-change-style')[0]),
        (worksItem = document.getElementsByClassName('js-change-style__item')),
        (htmlTarget = document.getElementsByClassName(
            'js-change-style-target',
        )[0]));
    if (worksItem.length == 0) return false;
    setEventListener(buttons);

    // ページ読み込み時にCookieの状態からスタイルを復元
    restoreStyleFromCookie();
};
