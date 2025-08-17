/* global infinite_scroll_ajax */
import { init as InitHover } from 'AppJs/_method/_hover';
import { init as InitLazyLoad } from 'AppJs/_method/_activateLazyload';
import { setStyle as SetMasonryStyle } from 'AppJs/_method/_masonry';
import { init as InitChangeStyle } from 'AppJs/_method/_changeStyle';

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
    updateButtonState();

    const formData = new FormData();
    formData.append('action', 'load_more_posts');
    formData.append('page', currentPage);
    formData.append('cat_slug', categorySlug);
    formData.append('nonce', infinite_scroll_ajax.nonce);

    try {
        const response = await fetch(infinite_scroll_ajax.ajax_url, {
            method: 'POST',
            body: formData,
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
            newItems.forEach((item) => {
                item.classList.add('is-initialized');
            });

            // ホバーイベントを再初期化
            InitHover();

            // LazyLoadを再初期化
            InitLazyLoad();

            // スタイル変更機能を再初期化
            InitChangeStyle();

            // Masonryレイアウトを再計算
            setTimeout(() => {
                SetMasonryStyle();
            }, 100);

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
