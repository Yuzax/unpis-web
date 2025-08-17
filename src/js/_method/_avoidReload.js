const cbk = (_event) => {
    const currentUrl = window.location.href;
    const targetUrl = _event.currentTarget.href;

    // URLを正規化して比較（トレイリングスラッシュを統一）
    const normalizeUrl = (url) => {
        const urlObj = new URL(url);
        // パスの末尾のスラッシュを統一（ルート以外は削除、ルートは保持）
        if (urlObj.pathname !== '/' && urlObj.pathname.endsWith('/')) {
            urlObj.pathname = urlObj.pathname.slice(0, -1);
        }
        return urlObj.href;
    };

    const normalizedCurrentUrl = normalizeUrl(currentUrl);
    const normalizedTargetUrl = normalizeUrl(targetUrl);

    // 同じページの場合はリロードを防ぐ
    if (normalizedCurrentUrl === normalizedTargetUrl) {
        _event.preventDefault();
        _event.stopPropagation();
        return false;
    }
};

export const init = () => {
    const target = document.getElementsByClassName('js-avoid-reload');
    for (let i = 0; i < target.length; i++) {
        target[i].addEventListener('click', cbk);
    }
};
