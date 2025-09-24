/**
 * Vimeo Player
 * js-vimeo-player要素でVimeo動画を制御
 */

let players = [];
let apiLoadPromise = null;

/**
 * Vimeo Player API を動的に読み込む
 */
const loadVimeoAPI = () => {
    if (apiLoadPromise) {
        return apiLoadPromise;
    }

    apiLoadPromise = new Promise((resolve) => {
        // 既にAPIが読み込まれている場合
        if (window.Vimeo && window.Vimeo.Player) {
            resolve();
            return;
        }

        // APIスクリプトを動的に追加
        if (
            !document.querySelector(
                'script[src*="player.vimeo.com/api/player.js"]',
            )
        ) {
            const script = document.createElement('script');
            script.src = 'https://player.vimeo.com/api/player.js';
            script.async = true;
            script.onload = () => resolve();
            document.head.appendChild(script);
        } else {
            resolve();
        }
    });

    return apiLoadPromise;
};

/**
 * プレイヤーを作成
 */
const createPlayer = (element, videoId, autoPlay = false) => {
    // プレイヤー作成前に再生ボタンの参照とスライドインデックスを保存
    const videoWrap = element.closest('.js-vimeo-player__video-wrap');
    const playButton = videoWrap
        ? videoWrap.querySelector('.js-vimeo-player__play-button')
        : null;

    // スライドインデックスを事前に計算
    const sliderItem = element.closest('.js-works-slider__item');
    const slideIndex = sliderItem
        ? Array.from(
              document.querySelectorAll('.js-works-slider__item'),
          ).indexOf(sliderItem)
        : 0;

    const player = new window.Vimeo.Player(element, {
        id: videoId,
        width: '100%',
        height: '100%',
        autoplay: autoPlay,
        muted: autoPlay, // 自動再生の場合はミュート
        loop: autoPlay, // 自動再生の場合はループ
        controls: true, // Vimeoは常にコントロールを有効にする
        responsive: true,
        // ミュート解除ボタンを非表示にする
        autopause: false,
        byline: false,
        portrait: false,
        title: false,
        // 自動再生の場合はミュート解除ボタンを非表示
        ...(autoPlay && {
            background: true, // バックグラウンドモードでミュート解除ボタンを非表示
        }),
    });

    const playerData = {
        player: player,
        element: element,
        videoId: videoId,
        autoPlay: autoPlay,
        isPlaying: false,
        slideIndex: slideIndex,
        playButton: playButton,
    };
    players.push(playerData);

    // イベントリスナーを設定
    player.on('play', () => {
        playerData.isPlaying = true;

        // 現在表示されているスライドかチェック
        if (isCurrentSlide(playerData.slideIndex)) {
            hidePlayButton(playerData);
        } else {
            // 現在のスライドでない場合は一時停止
            playerData.player.pause();
        }
    });

    player.on('pause', () => {
        playerData.isPlaying = false;
    });

    player.on('ended', () => {
        playerData.isPlaying = false;
    });

    // 自動再生の場合の処理
    if (autoPlay) {
        handleAutoPlay(playerData);
    }

    // 再生ボタンのイベントリスナーを追加
    addPlayButtonListener(playerData);
};

/**
 * 再生ボタンのイベントリスナーを追加
 */
const addPlayButtonListener = (playerData) => {
    const playButton = playerData.playButton;

    if (playButton) {
        playButton.addEventListener('click', () => {
            // クリックした瞬間に再生ボタンを非表示
            hidePlayButton(playerData);
            playerData.player.play();
        });
    }
};

/**
 * 現在表示されているスライドかどうかをチェック
 */
const isCurrentSlide = (slideIndex) => {
    const allItems = document.querySelectorAll('.js-works-slider__item');
    for (let i = 0; i < allItems.length; i++) {
        if (!allItems[i].classList.contains('is-hide') && i === slideIndex) {
            return true;
        }
    }
    return false;
};

/**
 * 再生ボタンを非表示にする
 */
const hidePlayButton = (playerData) => {
    const playButton = playerData.playButton;
    if (playButton) {
        playButton.classList.add('is-hide');
    }
};

/**
 * 再生ボタンを表示する
 */
const showPlayButton = (playerData) => {
    const playButton = playerData.playButton;
    if (playButton) {
        playButton.classList.remove('is-hide');
    }
};

/**
 * 自動再生の処理
 */
const handleAutoPlay = (playerData) => {
    const isFirstSlide = playerData.slideIndex === 0;
    const isModalOpen = window.self !== window.top; // iframe内かどうかで判定

    // 1ページ目でモーダルが表示された時に再生
    if (isFirstSlide && isModalOpen) {
        setTimeout(() => {
            playerData.player.play();
        }, 500); // 少し遅延させて確実に再生
    }
};

/**
 * 指定したスライドインデックスの自動再生動画を再生
 */
const playAutoPlayVideosInSlide = (slideIndex) => {
    players.forEach((playerData) => {
        if (playerData.slideIndex === slideIndex && playerData.autoPlay) {
            playerData.player.play();
        }
    });
};

/**
 * 指定したスライドインデックスの動画を一時停止
 */
const pauseVideosInSlide = (slideIndex) => {
    players.forEach((playerData) => {
        if (playerData.slideIndex === slideIndex && playerData.isPlaying) {
            playerData.player.pause();
        }
    });
};

/**
 * 全ての動画を一時停止
 */
const pauseAllVideos = () => {
    players.forEach((playerData) => {
        if (playerData.isPlaying) {
            playerData.player.pause();
        }
    });
};

/**
 * 全ての動画を停止
 */
const stopAllVideos = () => {
    players.forEach((playerData) => {
        playerData.player.pause();
        playerData.player.setCurrentTime(0);
        showPlayButton(playerData);
    });
};

/**
 * 初期化
 */
const init = async () => {
    const vimeoPlayerElements = document.querySelectorAll('.js-vimeo-player');

    if (vimeoPlayerElements.length === 0) return;

    try {
        // Vimeo APIを読み込み
        await loadVimeoAPI();

        // 各プレイヤーを作成
        vimeoPlayerElements.forEach((element) => {
            const videoId = element.getAttribute('data-video-id');
            const autoPlay = element.getAttribute('data-auto-play') === '1';

            if (videoId) {
                createPlayer(element, videoId, autoPlay);
            }
        });
    } catch (error) {
        console.error('Error in Vimeo Player init:', error);
    }
};

/**
 * 更新（ページ遷移時など）
 */
const update = () => {
    // 既存のプレイヤーをクリア
    players = [];
};

export {
    init,
    update,
    playAutoPlayVideosInSlide,
    pauseVideosInSlide,
    pauseAllVideos,
    stopAllVideos,
};
