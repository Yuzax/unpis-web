/**
 * Works Seen Management
 * 閲覧済みのworksを管理し、seenアイコンの表示/非表示を制御
 */

// 閲覧済みのworks URLを保存するキー
const SEEN_STORAGE_KEY = 'unpis_works_seen';

/**
 * URLからハッシュを生成（簡易版）
 * @param {string} url - URL
 * @returns {string} ハッシュ値
 */
const generateUrlHash = (url) => {
    let hash = 0;
    if (url.length === 0) return hash.toString();
    for (let i = 0; i < url.length; i++) {
        const char = url.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // 32bit整数に変換
    }
    return Math.abs(hash).toString();
};

/**
 * 閲覧済みのworks URLハッシュリストを取得
 * @returns {Array} 閲覧済みのworks URLハッシュの配列
 */
const getSeenWorks = () => {
    const stored = localStorage.getItem(SEEN_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
};

/**
 * works URLを閲覧済みとしてマーク
 * @param {string} workUrl - works URL
 */
const markAsSeen = (workUrl) => {
    const seenWorks = getSeenWorks();
    const urlHash = generateUrlHash(workUrl);

    if (!seenWorks.includes(urlHash)) {
        seenWorks.push(urlHash);
        localStorage.setItem(SEEN_STORAGE_KEY, JSON.stringify(seenWorks));
    }
};

/**
 * works URLが閲覧済みかチェック
 * @param {string} workUrl - works URL
 * @returns {boolean} 閲覧済みの場合true
 */
const isSeen = (workUrl) => {
    const seenWorks = getSeenWorks();
    const urlHash = generateUrlHash(workUrl);
    return seenWorks.includes(urlHash);
};

/**
 * seenアイコンの表示状態を更新
 * @param {Element} element - works要素
 * @param {string} workUrl - works URL
 */
const updateSeenIcon = (element, workUrl) => {
    const seenIcon = element.querySelector('.js-works-seen-icon');
    if (!seenIcon) return;

    if (isSeen(workUrl)) {
        seenIcon.classList.add('is-visible');
    } else {
        seenIcon.classList.remove('is-visible');
    }
};

/**
 * 全てのworks要素のseenアイコンを更新
 */
const updateAllSeenIcons = () => {
    const workItems = document.querySelectorAll('.c-works-list__item');
    workItems.forEach((item) => {
        const link = item.querySelector('.js-works-seen-trigger');
        if (link) {
            const workUrl =
                link.getAttribute('data-work-url') || link.getAttribute('href');
            if (workUrl) {
                updateSeenIcon(item, workUrl);
            }
        }
    });
};

/**
 * モーダル表示時にseenマークを付与
 * @param {string} workUrl - works URL
 */
const markModalAsSeen = (workUrl) => {
    markAsSeen(workUrl);
    updateAllSeenIcons();
};

/**
 * 現在のページをseenとしてマーク（single.php用）
 */
const markCurrentPageAsSeen = () => {
    const currentUrl = window.location.href;
    markAsSeen(currentUrl);
};

/**
 * 初期化
 */
const init = () => {
    // ページ読み込み時にseenアイコンを更新
    updateAllSeenIcons();

    // single.phpページの場合、現在のページをseenとしてマーク
    if (
        document.body.classList.contains('single') ||
        document.querySelector('.c-works-slider')
    ) {
        markCurrentPageAsSeen();
    }
};

/**
 * 更新（ページ遷移時など）
 */
const update = () => {
    // 新しく追加された要素のseenアイコンを更新
    updateAllSeenIcons();
};

export { init, update, markModalAsSeen, markCurrentPageAsSeen, isSeen };
