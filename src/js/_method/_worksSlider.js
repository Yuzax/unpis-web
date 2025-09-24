import { isDesktop } from 'AppJs/_method/_class';
import { toggleModalState as ToggleInformationModalState } from 'AppJs/_method/_worksInformationModal';
import {
    playAutoPlayVideosInSlide as playAutoPlayYouTubeVideosInSlide,
    pauseVideosInSlide as pauseYouTubeVideosInSlide,
    stopAllVideos as stopAllYouTubeVideos,
} from 'AppJs/_method/_youtubePlayer';
import {
    playAutoPlayVideosInSlide as playAutoPlayVimeoVideosInSlide,
    pauseVideosInSlide as pauseVimeoVideosInSlide,
    stopAllVideos as stopAllVimeoVideos,
} from 'AppJs/_method/_vimeoPlayer';

let item = [],
    leftHandle = null,
    rightHandle = null,
    hideTarget = [],
    itemIndex = 0,
    informationButton = null,
    informationModal = null,
    informationModalCloseButton = null,
    sliderContainer = null;

const updateHandleStates = () => {
    // leftHandleの状態を更新
    if (itemIndex === 0) {
        leftHandle.classList.add('is-disable');
    } else {
        leftHandle.classList.remove('is-disable');
    }

    // rightHandleの状態を更新
    if (itemIndex === item.length - 1) {
        rightHandle.classList.add('is-disable');
    } else {
        rightHandle.classList.remove('is-disable');
    }
};

const switchSlide = (_isRight = false) => {
    const oldIndex = itemIndex;

    item[itemIndex].classList.add('is-hide');
    itemIndex = _isRight ? itemIndex + 1 : itemIndex - 1;

    // ループ処理を削除し、境界チェックのみ行う
    if (itemIndex < 0) itemIndex = 0;
    if (itemIndex > item.length - 1) itemIndex = item.length - 1;

    // 前のスライドの動画を一時停止
    pauseYouTubeVideosInSlide(oldIndex);
    pauseVimeoVideosInSlide(oldIndex);

    // 前の画像が完全に隠れてから次の画像を表示
    item[itemIndex].classList.remove('is-hide');

    // 新しいスライドの自動再生動画を再生
    playAutoPlayYouTubeVideosInSlide(itemIndex);
    playAutoPlayVimeoVideosInSlide(itemIndex);

    // ハンドルのdisable状態を更新
    updateHandleStates();
};

const addEventListener = () => {
    leftHandle.addEventListener('click', () => {
        switchSlide();
        // クリック時にもUIタイマーをリセット
        if (resetUITimer) resetUITimer();
    });
    rightHandle.addEventListener('click', () => {
        switchSlide(true);
        // クリック時にもUIタイマーをリセット
        if (resetUITimer) resetUITimer();
    });
};

const addInformationModalEventListener = () => {
    informationButton.addEventListener('click', () => {
        // 情報モーダル表示時に全ての動画を一時停止
        pauseYouTubeVideosInSlide(itemIndex);
        pauseVimeoVideosInSlide(itemIndex);

        informationModal.classList.add('is-active');
        ToggleInformationModalState(true);
    });

    informationModalCloseButton.addEventListener('click', () => {
        informationModal.classList.remove('is-active');
        ToggleInformationModalState(false);

        // 情報モーダル閉じた時に現在のスライドの自動再生動画を再開
        playAutoPlayYouTubeVideosInSlide(itemIndex);
        playAutoPlayVimeoVideosInSlide(itemIndex);
    });
};

const addIframeCloseEvent = () => {
    // iframe内の場合、クローズボタンにイベントリスナーを追加
    if (window.self !== window.top) {
        const closeButton = document.querySelector('.js-works-close-button');
        if (closeButton && !closeButton.hasAttribute('data-modal-listener')) {
            // 重複登録を防ぐためのフラグを設定
            closeButton.setAttribute('data-modal-listener', 'true');
            // aタグのデフォルト動作（ホームページへの移動）を防ぐ
            closeButton.addEventListener(
                'click',
                (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleModalClose();
                },
                { once: false },
            );
        }
    }
};

const handleModalClose = () => {
    // 全ての動画を停止
    stopAllYouTubeVideos();
    stopAllVimeoVideos();

    // iframe内からの場合、親ウィンドウにメッセージを送信
    if (window.self !== window.top) {
        window.parent.postMessage({ action: 'closeModal' }, '*');
    }
};

let resetUITimer = null;

const hideUI = () => {
    let hideTimer = null;
    const hideUIElements = () => {
        for (let i = 0; i < hideTarget.length; i++) {
            hideTarget[i].classList.add('is-hide');
        }
    };
    const showUIElements = () => {
        for (let i = 0; i < hideTarget.length; i++) {
            hideTarget[i].classList.remove('is-hide');
        }
    };
    const resetTimer = () => {
        // 既存のタイマーをクリア
        if (hideTimer) {
            clearTimeout(hideTimer);
        }
        // UIを表示
        showUIElements();
        // 5秒後にUIを隠すタイマーを設定
        hideTimer = setTimeout(() => {
            hideUIElements();
        }, 5000);
    };
    const handleMouseLeave = () => {
        // マウスがブラウザ外に出た時は即座にUIを隠す
        if (hideTimer) {
            clearTimeout(hideTimer);
        }
        hideUIElements();
    };

    // resetTimerを外部からアクセス可能にする
    resetUITimer = resetTimer;

    // スライダーコンテナにマウス移動イベントリスナーを追加
    if (sliderContainer) {
        sliderContainer.addEventListener('mousemove', resetTimer);
        sliderContainer.addEventListener('mouseleave', handleMouseLeave);
    }
    // フォールバックとしてdocumentにも追加
    document.addEventListener('mousemove', resetTimer);
    document.addEventListener('mouseleave', handleMouseLeave);
    // 初期タイマーを設定
    resetTimer();
};

export const init = () => {
    ((item = document.getElementsByClassName('js-works-slider__item')),
        (leftHandle = document.getElementsByClassName(
            'js-works-slider__left-handle',
        )[0]),
        (rightHandle = document.getElementsByClassName(
            'js-works-slider__right-handle',
        )[0]),
        (hideTarget = document.getElementsByClassName(
            'js-works-slider__hide-target',
        )),
        (informationButton = document.querySelector(
            '.js-works-slider__information-button',
        )),
        (informationModal = document.querySelector(
            '.js-works-slider__information-modal',
        )),
        (informationModalCloseButton = document.querySelector(
            '.js-works-slider__information-modal-close-button',
        )),
        (sliderContainer = document.querySelector('.js-works-slider')));
    if (item.length != 0 && item.length != 1) addEventListener();
    if (informationModal) addInformationModalEventListener();
    if (hideTarget.length != 0 && isDesktop()) hideUI();
    addIframeCloseEvent();
};
