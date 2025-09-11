/* global infinite_scroll_ajax */
import { init as InitHover } from 'AppJs/_method/_hover';
import { processIntersectingLazyImages } from 'AppJs/_method/_activateLazyload';
import { processNewImages } from 'AppJs/_method/_imageLoad';
import { setStyle as SetMasonryStyle } from 'AppJs/_method/_masonry';
import { init as InitChangeStyle } from 'AppJs/_method/_changeStyle';
import { update as UpdateWorksModal } from 'AppJs/_method/_worksModal';
import { update as UpdateWorksSeen } from 'AppJs/_method/_worksSeen';
import { recalculateHeight as RecalculateDancingManHeight } from 'AppJs/_method/_dancingMan';
import { recalculate as RecalculateHeaderScroll } from 'AppJs/_method/_headerScroll';

let targetContainer = null;
let loadMoreButton = null;
let isLoading = false;
let hasMorePosts = true;
let currentPage = 2; // 最初のページは既に表示されているので2から開始
let categorySlug = '';

const updateButtonState = () => {
    if (!loadMoreButton) return;

    if (hasMorePosts && !isLoading) {
        loadMoreButton.classList.add('is-active');
        loadMoreButton.setAttribute('aria-pressed', 'false');
    } else {
        loadMoreButton.classList.remove('is-active');
        loadMoreButton.setAttribute('aria-pressed', 'true');
    }
};

const loadMorePosts = async () => {
    if (isLoading || !hasMorePosts) return;

    isLoading = true;
    // updateButtonState();

    const formData = new FormData();
    formData.append('action', 'load_more_posts');
    formData.append('page', currentPage);
    formData.append('cat_slug', categorySlug);
    formData.append('nonce', infinite_scroll_ajax.nonce);

    try {
        const response = await fetch(infinite_scroll_ajax.ajax_url, {
            method: 'POST',
            body: formData,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
            credentials: 'same-origin',
        });

        const result = await response.json();

        if (result.success && result.data.posts.length > 0) {
            // 新しい投稿をDOMに追加
            result.data.posts.forEach((postHtml) => {
                targetContainer.insertAdjacentHTML('beforeend', postHtml);
            });

            // 新しく追加された要素に対してイベントを再初期化
            const newItems = targetContainer.querySelectorAll(
                '.js-masonry__item:not(.is-initialized)',
            );

            // 現在のレイアウト状態を確認（htmlタグの状態を優先）
            const htmlTarget = document.getElementsByClassName(
                'js-change-style-target',
            )[0];
            const isListLayout = htmlTarget
                ? htmlTarget.classList.contains('is-list')
                : targetContainer.classList.contains('is-active-list');

            newItems.forEach((item) => {
                item.classList.add('is-initialized');

                // 現在のレイアウトに合わせてクラスを追加
                if (isListLayout) {
                    item.classList.add('is-active-list');

                    // 画像のsizesを調整
                    const img = item.querySelector('.js-change-style__image');
                    if (img && img.dataset.sizesList) {
                        img.dataset.sizesTile = img.sizes;
                        img.sizes = img.dataset.sizesList;
                    }
                }
            });

            // 新しく追加された要素のカラーモードを現在の状態に合わせる
            const colorHtmlTarget = document.getElementsByClassName(
                'js-change-color-target',
            )[0];
            const isCurrentlyDark = colorHtmlTarget
                ? colorHtmlTarget.classList.contains('is-rev')
                : false;

            newItems.forEach((item) => {
                const colorTargets = item.querySelectorAll(
                    '.js-change-color-target',
                );
                colorTargets.forEach((target) => {
                    if (isCurrentlyDark) {
                        target.classList.add('is-rev');
                    } else {
                        target.classList.remove('is-rev');
                    }
                });
            });

            // ホバーイベントを再初期化
            InitHover();

            // 新しく追加された画像のlazyload処理（交差チェック付き）
            const newLazyImages = Array.from(newItems)
                .map((item) => item.querySelector('.js-lazy'))
                .filter((img) => img !== null);

            if (newLazyImages.length > 0) {
                processIntersectingLazyImages(newLazyImages);
            }

            // 新しく追加された画像のロード完了検知処理
            const newImageLoadTargets = Array.from(newItems)
                .map((item) => item.querySelector('.js-img-load'))
                .filter((img) => img !== null);

            if (newImageLoadTargets.length > 0) {
                processNewImages(newImageLoadTargets);
            }

            // スタイル変更機能を再初期化
            InitChangeStyle();

            // worksModalのイベントリスナーを再初期化
            UpdateWorksModal();

            // worksSeenの状態を更新
            UpdateWorksSeen();

            // レイアウトに応じてMasonryを再計算
            if (!isListLayout) {
                setTimeout(() => {
                    SetMasonryStyle();
                }, 100);
            }

            // dancing-manの最下部判定を再計算（新しいコンテンツ追加後）
            setTimeout(() => {
                RecalculateDancingManHeight();
            }, 150); // Masonryの再計算後に実行

            // ヘッダーの位置を再計算（新しいコンテンツ追加後）
            setTimeout(() => {
                RecalculateHeaderScroll();
            }, 200); // Masonryとdancing-manの再計算後に実行

            // 次のページ情報を更新
            currentPage = result.data.next_page;
            hasMorePosts = result.data.has_more;
        } else {
            hasMorePosts = false;
        }
    } catch (error) {
        console.error('Error loading more posts:', error);
        hasMorePosts = false;
    }

    isLoading = false;
    updateButtonState();
};

const handleButtonClick = (event) => {
    event.preventDefault();
    loadMorePosts();
};

export const init = () => {
    // ページ遷移時に状態をリセット
    currentPage = 2;
    hasMorePosts = true;
    isLoading = false;

    targetContainer = document.getElementsByClassName('js-masonry')[0];
    loadMoreButton = document.getElementsByClassName(
        'js-infinite-scroll-button',
    )[0];

    if (!targetContainer) return false;

    // カテゴリスラッグをdata属性から取得
    categorySlug = targetContainer.getAttribute('data-category-slug') || '';

    // ボタンが存在する場合のみイベントリスナーを追加
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', handleButtonClick);
        // 初期状態でボタンの状態を更新
        updateButtonState();
    }

    // 既存のアイテムに初期化フラグを追加
    const existingItems = targetContainer.querySelectorAll('.js-masonry__item');
    existingItems.forEach((item) => {
        item.classList.add('is-initialized');
    });
};

export const reset = () => {
    currentPage = 2;
    hasMorePosts = true;
    isLoading = false;
    updateButtonState();
};
