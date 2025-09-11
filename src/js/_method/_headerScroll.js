let header = null,
    headerContainer = null,
    headerLinks = null;
let initialHeaderTopOffset = 0; // 初期のヘッダー上部位置を保存
let isHeaderFixed = false;
let isFrontPage = false;
let lastScrollTop = 0;
let isLinksHidden = false;
let isLinksOn = false; // is-onクラスの状態管理

const updateHeaderPosition = (scrollTop) => {
    if (!headerContainer) return;

    // ヘッダーの位置を計算
    const currentHeaderBottomOffset = header.offsetTop + header.offsetHeight;
    const currentHeaderTopOffset = header.offsetTop;

    // ページ種別に応じたヘッダー固定制御
    if (isFrontPage) {
        // フロントページ：KVがあるので、ヘッダーの位置に応じて制御
        // 初期のヘッダー上部位置を保存（リセット後または固定されていない時）
        if (
            initialHeaderTopOffset === 0 &&
            !isHeaderFixed &&
            currentHeaderTopOffset > 0
        ) {
            initialHeaderTopOffset = currentHeaderTopOffset;
        }

        // ブラウザの上がheaderの最下部についたら追従開始
        if (scrollTop >= currentHeaderBottomOffset) {
            if (!isHeaderFixed) {
                header.classList.add('is-fixed');
                headerContainer.classList.add('is-fixed');
                document.body.classList.add('is-header-fixed');
                isHeaderFixed = true;
            }

            // 最初にくっつくタイミングでis-onクラスを追加（timeout付き）
            if (!isLinksOn) {
                setTimeout(() => {
                    for (let i = 0; i < headerLinks.length; i++) {
                        headerLinks[i].classList.add('is-on');
                    }
                }, 10);
                isLinksOn = true;
            }
        } else if (
            initialHeaderTopOffset > 0 &&
            scrollTop <= initialHeaderTopOffset
        ) {
            // 初期のヘッダー上部位置まで戻ったらis-fixedを外す
            if (isHeaderFixed) {
                header.classList.remove('is-fixed');
                headerContainer.classList.remove('is-fixed');
                document.body.classList.remove('is-header-fixed');
                isHeaderFixed = false;

                // is-fixedが外れたらis-onクラスもremove
                if (isLinksOn) {
                    for (let i = 0; i < headerLinks.length; i++) {
                        headerLinks[i].classList.remove('is-on');
                    }
                    isLinksOn = false;
                }
            }
        }
    } else {
        // 非フロントページ：KVがないので、ページトップを基準に制御
        // ブラウザの上がheaderの最下部についたら追従開始
        if (scrollTop >= currentHeaderBottomOffset) {
            if (!isHeaderFixed) {
                header.classList.add('is-fixed');
                headerContainer.classList.add('is-fixed');
                document.body.classList.add('is-header-fixed');
                isHeaderFixed = true;
            }

            // 最初にくっつくタイミングでis-onクラスを追加（timeout付き）
            if (!isLinksOn) {
                setTimeout(() => {
                    for (let i = 0; i < headerLinks.length; i++) {
                        headerLinks[i].classList.add('is-on');
                    }
                }, 10);
                isLinksOn = true;
            }
        } else if (scrollTop <= 0) {
            // ページトップ（scrollTop = 0）まで戻ったらis-fixedを外す
            if (isHeaderFixed) {
                header.classList.remove('is-fixed');
                headerContainer.classList.remove('is-fixed');
                document.body.classList.remove('is-header-fixed');
                isHeaderFixed = false;

                // is-fixedが外れたらis-onクラスもremove
                if (isLinksOn) {
                    for (let i = 0; i < headerLinks.length; i++) {
                        headerLinks[i].classList.remove('is-on');
                    }
                    isLinksOn = false;
                }
            }
        }
    }

    // is-outの制御（全ページ共通）
    const isCurrentlyFixed = headerContainer.classList.contains('is-fixed');
    if (isCurrentlyFixed && scrollTop >= currentHeaderBottomOffset) {
        const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';

        if (scrollDirection === 'down' && !isLinksHidden) {
            // 下スクロール：リンクを隠す
            for (let i = 0; i < headerLinks.length; i++) {
                headerLinks[i].classList.add('is-out');
            }
            isLinksHidden = true;
        } else if (scrollDirection === 'up' && isLinksHidden) {
            // 上スクロール：リンクを表示
            for (let i = 0; i < headerLinks.length; i++) {
                headerLinks[i].classList.remove('is-out');
            }
            isLinksHidden = false;
        }
    } else {
        // fixedでない時、またはヘッダー下部に到達していない時はリンクを表示
        if (isLinksHidden) {
            for (let i = 0; i < headerLinks.length; i++) {
                headerLinks[i].classList.remove('is-out');
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
    // リサイズ時にヘッダー位置を再計算
    if (headerContainer) {
        // リサイズ時は一度状態を完全にリセット
        if (isFrontPage) {
            // 状態をリセット
            initialHeaderTopOffset = 0;
            isHeaderFixed = false;

            // クラスも一度リセット
            header.classList.remove('is-fixed');
            headerContainer.classList.remove('is-fixed');
            document.body.classList.remove('is-header-fixed');

            // リンクのクラスもリセット
            if (headerLinks && headerLinks.length > 0) {
                for (let i = 0; i < headerLinks.length; i++) {
                    headerLinks[i].classList.remove('is-out');
                    headerLinks[i].classList.remove('is-on');
                }
            }
            isLinksHidden = false;
            isLinksOn = false;
        }

        const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;
        updateHeaderPosition(scrollTop);
    }
};

// コンテンツ変更時の位置再計算（works追加読み込み等）
export const recalculate = () => {
    if (headerContainer && isFrontPage) {
        // フロントページの場合、現在固定されていない場合のみ初期位置をリセット
        if (!isHeaderFixed) {
            initialHeaderTopOffset = 0;
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
    const kvElements = document.getElementsByClassName('c-kv');
    isFrontPage = kvElements.length > 0;
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
        // 状態を完全にリセット
        initialHeaderTopOffset = 0;
        isHeaderFixed = false;
        isLinksHidden = false;
        isLinksOn = false;
        lastScrollTop = 0;

        // クラスを確実にリセット
        if (header) {
            header.classList.remove('is-fixed');
        }
        if (headerContainer) {
            headerContainer.classList.remove('is-fixed');
        }
        document.body.classList.remove('is-header-fixed');

        // リンクのクラスもリセット
        if (headerLinks && headerLinks.length > 0) {
            for (let i = 0; i < headerLinks.length; i++) {
                headerLinks[i].classList.remove('is-out');
                headerLinks[i].classList.remove('is-on');
            }
        }

        // 少し遅延してから新しいページの状態で位置を更新
        setTimeout(() => {
            updateHeaderPosition(scrollTop);
        }, 50);
    }
};

export const resize = () => {
    onResize();
};
