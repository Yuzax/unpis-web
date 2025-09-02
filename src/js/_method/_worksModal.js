/**
 * Works Modal
 * .c-works-list__item-linkクリック時にモーダルを開き、Push Stateでリンクを設定
 */

let modal = null;
let modalClose = null;
let modalContent = null;
let originalUrl = null;

/**
 * モーダルを開く
 * @param {string} url - 開くURL
 */
const openModal = (url) => {
    if (!modal) return;

    // 現在のURLを保存
    originalUrl = window.location.href;

    // Push Stateでリンクを設定
    history.pushState({ modal: true, url: url }, '', url);

    // モーダルコンテンツにiframeを追加
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';

    // モーダルコンテンツをクリア
    modalContent.innerHTML = '';
    modalContent.appendChild(iframe);

    // モーダルを表示
    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
};

/**
 * モーダルを閉じる
 */
const closeModal = () => {
    if (!modal) return;

    // モーダルを非表示
    modal.classList.remove('is-active');
    document.body.style.overflow = '';

    // モーダルコンテンツをクリア
    modalContent.innerHTML = '';

    // Push Stateで元のURLに戻る
    if (originalUrl) {
        history.pushState(null, '', originalUrl);
        originalUrl = null;
    }
};

/**
 * ブラウザの戻るボタン対応
 */
const handlePopState = (event) => {
    if (event.state && event.state.modal) {
        // モーダル状態の場合は何もしない（既に開いている）
        return;
    } else {
        // モーダルが開いている場合は閉じる
        if (modal && modal.classList.contains('is-active')) {
            closeModal();
        }
    }
};

/**
 * クリックイベントハンドラ
 */
const handleLinkClick = (event) => {
    event.preventDefault();
    const url = event.currentTarget.getAttribute('href');
    if (url) {
        openModal(url);
    }
};

/**
 * 初期化
 */
const init = () => {
    // モーダル要素を取得
    modal = document.querySelector('.js-works-modal');
    modalClose = document.querySelector('.js-works-close-button');
    modalContent = modal
        ? modal.querySelector('.js-works-modal__content')
        : null;

    if (!modal || !modalContent) {
        console.warn('Works modal elements not found');
        return;
    }

    // works-listのリンクにイベントリスナーを追加
    const workLinks = document.querySelectorAll('.js-works-modal-link');
    workLinks.forEach((link) => {
        link.addEventListener('click', handleLinkClick);
    });

    // モーダルを閉じるイベントリスナー（modalCloseが存在する場合のみ）
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // ESCキーでモーダルを閉じる
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('is-active')) {
            closeModal();
        }
    });

    // ブラウザの戻るボタン対応
    window.addEventListener('popstate', handlePopState);

    // iframe内からのメッセージを受信
    window.addEventListener('message', (event) => {
        // React DevToolsなどの不要なメッセージを除外
        if (
            event.data &&
            event.data.action === 'closeModal' &&
            !event.data.source
        ) {
            closeModal();
        }
    });
};

/**
 * 更新（ページ遷移時など）
 */
const update = () => {
    // 新しいリンクにイベントリスナーを追加
    const workLinks = document.querySelectorAll('.js-works-modal-link');
    workLinks.forEach((link) => {
        // 既存のイベントリスナーを削除してから追加
        link.removeEventListener('click', handleLinkClick);
        link.addEventListener('click', handleLinkClick);
    });
};

export { init, update };
