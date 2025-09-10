let header = null,
    headerContainer = null,
    headerLinks = null;
let headerOffsetTop = 0;
let initialHeaderOffsetTop = 0; // 初期位置を保存
let isHeaderFixed = false;
let isFrontPage = false;
let lastScrollTop = 0;
let isLinksHidden = false;

const updateHeaderPosition = (scrollTop) => {
    if (!headerContainer) return;

    // フロントページの場合のみ、ヘッダーの固定制御を行う
    if (isFrontPage) {
        // 初期位置が設定されていない場合は設定
        if (initialHeaderOffsetTop === 0) {
            initialHeaderOffsetTop = headerContainer.offsetTop;
            headerOffsetTop = initialHeaderOffsetTop;
        }

        // 固定状態でない場合のみ、現在の位置を確認
        if (!isHeaderFixed) {
            const currentOffset = headerContainer.offsetTop;
            // 現在の位置が0でない場合のみ更新（ブラウザ高さ変更時の誤計算を防ぐ）
            if (currentOffset > 0) {
                headerOffsetTop = currentOffset;
            } else {
                // 0になった場合は初期位置を使用
                headerOffsetTop = initialHeaderOffsetTop;
            }
        }

        // フロントページ：ヘッダーがブラウザ上部に当たったら追従
        if (scrollTop >= headerOffsetTop) {
            if (!isHeaderFixed) {
                header.classList.add('is-fixed');
                headerContainer.classList.add('is-fixed');
                isHeaderFixed = true;
            }
        } else {
            if (isHeaderFixed) {
                header.classList.remove('is-fixed');
                headerContainer.classList.remove('is-fixed');
                isHeaderFixed = false;
            }
        }
    }

    // .js-headerの下部についた時のリンク表示/非表示制御（全ページ共通）
    // ヘッダーの下端位置を毎回計算（ページ遷移時に正しく更新されるように）
    const currentHeaderBottomOffset = header.offsetTop + header.offsetHeight;

    const isCurrentlyFixed = headerContainer.classList.contains('is-fixed');
    if (isCurrentlyFixed && scrollTop >= currentHeaderBottomOffset) {
        const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';

        if (scrollDirection === 'down' && !isLinksHidden) {
            // 下スクロール：リンクを隠す
            for (let i = 0; i < headerLinks.length; i++) {
                headerLinks[i].classList.add('is-hide');
            }
            isLinksHidden = true;
        } else if (scrollDirection === 'up' && isLinksHidden) {
            // 上スクロール：リンクを表示
            for (let i = 0; i < headerLinks.length; i++) {
                headerLinks[i].classList.remove('is-hide');
            }
            isLinksHidden = false;
        }
    } else {
        // fixedでない時、またはヘッダー下部に到達していない時はリンクを表示
        if (isLinksHidden) {
            for (let i = 0; i < headerLinks.length; i++) {
                headerLinks[i].classList.remove('is-hide');
            }
            isLinksHidden = false;
        }
    }

    lastScrollTop = scrollTop;
};

// app.jsから呼び出されるスクロール処理
export const onScroll = (scrollTop) => {
    updateHeaderPosition(scrollTop);
};

const onResize = () => {
    // ヘッダーの位置を再計算
    if (headerContainer) {
        if (isFrontPage) {
            const currentOffset = headerContainer.offsetTop;
            // リサイズ時も0でない場合のみ更新
            if (currentOffset > 0) {
                initialHeaderOffsetTop = currentOffset;
                headerOffsetTop = currentOffset;
            }
        }
        const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;
        updateHeaderPosition(scrollTop);
    }
};

const initVariable = () => {
    header = document.getElementsByClassName('js-header')[0];
    headerContainer = document.getElementsByClassName(
        'js-header__container',
    )[0];
    headerLinks = document.getElementsByClassName('js-header__link');
    // フロントページかどうかを判定（KVがあるかどうか）
    isFrontPage = document.getElementsByClassName('l-kv')[0] !== null;
};

const initEvents = () => {
    // リサイズイベントを追加（スクロールはapp.jsで管理）
    window.addEventListener('resize', onResize);
};

export const init = (scrollTop = 0) => {
    initVariable();
    if (headerContainer) {
        initEvents();
        // 初期位置を設定
        updateHeaderPosition(scrollTop);
    }
};

export const update = (scrollTop = 0) => {
    initVariable();
    if (headerContainer) {
        headerOffsetTop = 0; // リセット
        initialHeaderOffsetTop = 0; // リセット
        isHeaderFixed = false; // リセット
        isLinksHidden = false; // リセット
        lastScrollTop = 0; // リセット
        header.classList.remove('is-fixed'); // クラスもリセット
        headerContainer.classList.remove('is-fixed'); // クラスもリセット
        for (let i = 0; i < headerLinks.length; i++) {
            headerLinks[i].classList.remove('is-hide');
        }
        updateHeaderPosition(scrollTop);
    }
};

export const resize = () => {
    onResize();
};
