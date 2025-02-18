const getRandomTimeout = () => {
    // const min = 500, max = 800;
    // return Math.floor(Math.random() * (max - min + 1) + min);
    return 0;
};

const initImageLazyload = () => {
    // https://weblasts.com/javascript/intersection-observer
    const targets = document.getElementsByClassName('js-lazy');
    // 範囲の設定
    const options = {
        root: null,
        rootMargin: '100px 0px',
        threshold: 0,
    };
    // 交差したときに実行する関数
    const intersect = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // 監視中の要素が交差した状態ならtrue
                const lazyImage = entry.target,
                    lazySource = lazyImage.previousElementSibling;
                setTimeout(() => {
                    if (lazyImage.dataset.hasOwnProperty('src')) {
                        // data-src 属性値があれば、src 属性にコピーします
                        lazyImage.src = lazyImage.dataset.src;
                    }
                    if (lazyImage.dataset.hasOwnProperty('srcset')) {
                        // data-srcset 属性値があれば、srcset 属性にコピーします
                        lazyImage.srcset = lazyImage.dataset.srcset;
                    }
                    if (lazySource !== undefined && lazySource != null) {
                        lazySource.srcset = lazySource.dataset.srcset;
                    }
                    lazyImage.classList.add('is-entered');
                }, getRandomTimeout());
                observer.unobserve(entry.target);
            }
        });
    };
    // Intersection Observerを使えるようにする
    const observer = new IntersectionObserver(intersect, options);
    // 対象の要素をそれぞれ監視する
    for (let i = 0; i < targets.length; i++) {
        observer.observe(targets[i]);
    }
};

// const initVideoLazyLoad = () => {
//     // https://weblasts.com/javascript/intersection-observer
//     const targets = document.getElementsByClassName('js-lazy-video');
//     // 範囲の設定
//     const options = {
//         root: null,
//         rootMargin: '0px 0px',
//         threshold: 0,
//     };
//     // 交差したときに実行する関数
//     const intersect = (entries) => {
//         entries.forEach((video) => {
//             if (video.isIntersecting) {
//                 // 監視中の要素が交差した状態ならtrue
//                 // 監視中の要素が交差したときの処理
//                 // https://medium.com/@bogdanfromkyiv/lazy-load-for-videos-with-plain-js-ef0671dda64
//                 setTimeout(() => {
//                     for (let source in video.target.children) {
//                         let videoSource = video.target.children[source];
//                         if (
//                             typeof videoSource.tagName === 'string' &&
//                             videoSource.tagName === 'SOURCE'
//                         ) {
//                             videoSource.src = videoSource.dataset.src;
//                         }
//                     }
//                     video.target.load();
//                     video.target.classList.add('entered');
//                 }, getRandomTimeout());
//                 observer.unobserve(video.target);
//             } else {
//                 // 監視中の要素が交差してない状態ならfalse
//                 // 監視中の要素が交差していないときの処理
//             }
//         });
//     };
//     // Intersection Observerを使えるようにする
//     const observer = new IntersectionObserver(intersect, options);
//     // 対象の要素をそれぞれ監視する
//     for (let i = 0; i < targets.length; i++) {
//         observer.observe(targets[i]);
//     }
// };

export const init = () => {
    initImageLazyload();
    // initVideoLazyLoad();
};
