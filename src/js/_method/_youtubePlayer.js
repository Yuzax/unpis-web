/**
 * YouTube Player
 * js-yt-player要素でYouTube動画を制御
 */

let players = [];
let apiLoadPromise = null;

/**
 * YouTube API を動的に読み込む
 */
const loadYouTubeAPI = () => {
    if (apiLoadPromise) {
        return apiLoadPromise;
    }

    apiLoadPromise = new Promise((resolve) => {
        // 既にAPIが読み込まれている場合
        if (window.YT && window.YT.Player) {
            resolve();
            return;
        }

        // グローバルコールバック関数を設定
        window.onYouTubeIframeAPIReady = () => {
            resolve();
        };

        // APIスクリプトを動的に追加
        if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
            const script = document.createElement('script');
            script.src = 'https://www.youtube.com/iframe_api';
            script.async = true;
            document.head.appendChild(script);
        }
    });

    return apiLoadPromise;
};

/**
 * プレイヤーを作成
 */
const createPlayer = (element, videoId, autoPlay = false) => {
    const playerId = `yt-player-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // プレイヤー作成前に再生ボタンの参照とスライドインデックスを保存
    const videoWrap = element.closest('.js-yt-player__video-wrap');
    const playButton = videoWrap
        ? videoWrap.querySelector('.js-yt-player__play-button')
        : null;

    // スライドインデックスを事前に計算
    const sliderItem = element.closest('.js-works-slider__item');
    const slideIndex = sliderItem
        ? Array.from(
              document.querySelectorAll('.js-works-slider__item'),
          ).indexOf(sliderItem)
        : 0;

    element.id = playerId;

    new window.YT.Player(playerId, {
        videoId: videoId,
        width: '100%',
        height: '100%',
        playerVars: {
            autoplay: autoPlay ? 1 : 0,
            mute: autoPlay ? 1 : 0, // 自動再生の場合はミュート
            loop: autoPlay ? 1 : 0, // 自動再生の場合はループ
            playlist: autoPlay ? videoId : undefined, // ループに必要
            controls: 0, // 初期状態ではコントロールを非表示
            rel: 0,
            showinfo: 0,
            modestbranding: 1,
            playsinline: 1,
        },
        events: {
            onReady: (event) => {
                const playerData = {
                    player: event.target,
                    element: element,
                    videoId: videoId,
                    autoPlay: autoPlay,
                    isPlaying: false,
                    hasPlayed: false,
                    slideIndex: slideIndex,
                    playButton: playButton,
                };
                players.push(playerData);

                // 自動再生の場合の処理
                if (autoPlay) {
                    handleAutoPlay(playerData);
                }

                // 再生ボタンのイベントリスナーを追加
                addPlayButtonListener(playerData);
            },
            onStateChange: (event) => {
                const playerData = players.find(
                    (p) => p.player === event.target,
                );
                if (playerData) {
                    playerData.isPlaying =
                        event.data === window.YT.PlayerState.PLAYING;

                    // 再生開始時の処理
                    if (event.data === window.YT.PlayerState.PLAYING) {
                        // 初回再生時にis-playedクラスを追加
                        if (!playerData.hasPlayed) {
                            playerData.hasPlayed = true;
                            playerData.element.classList.add('is-played');
                        }

                        // 現在表示されているスライドかチェック
                        if (isCurrentSlide(playerData.slideIndex)) {
                            hidePlayButton(playerData);
                            showControls(playerData);
                        } else {
                            // 現在のスライドでない場合は一時停止
                            playerData.player.pauseVideo();
                        }
                    }
                }
            },
        },
    });
};

/**
 * 再生ボタンのイベントリスナーを追加
 */
const addPlayButtonListener = (playerData) => {
    const playButton = playerData.playButton;

    if (playButton) {
        playButton.addEventListener('click', () => {
            // クリックした瞬間に再生ボタンを非表示し、コントロールを表示
            hidePlayButton(playerData);
            showControls(playerData);
            playerData.player.playVideo();
        });
    }
};

/**
 * コントロールを表示する
 */
const showControls = (playerData) => {
    // YouTube APIでコントロールを動的に表示する方法がないため、
    // iframe要素に直接アクセスしてURLパラメータを変更
    const iframe = playerData.element.querySelector('iframe');
    if (iframe) {
        const currentSrc = iframe.src;
        if (currentSrc.includes('controls=0')) {
            iframe.src = currentSrc.replace('controls=0', 'controls=1');
        }
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
            playerData.player.playVideo();
        }, 100); // 少し遅延させて確実に再生
    }
};

/**
 * 指定したスライドインデックスの自動再生動画を再生
 */
const playAutoPlayVideosInSlide = (slideIndex) => {
    players.forEach((playerData) => {
        if (playerData.slideIndex === slideIndex && playerData.autoPlay) {
            playerData.player.playVideo();
        }
    });
};

/**
 * 指定したスライドインデックスの動画を一時停止
 */
const pauseVideosInSlide = (slideIndex) => {
    players.forEach((playerData) => {
        if (playerData.slideIndex === slideIndex && playerData.isPlaying) {
            playerData.player.pauseVideo();
        }
    });
};

/**
 * 全ての動画を一時停止
 */
const pauseAllVideos = () => {
    players.forEach((playerData) => {
        if (playerData.isPlaying) {
            playerData.player.pauseVideo();
        }
    });
};

/**
 * 全ての動画を停止
 */
const stopAllVideos = () => {
    players.forEach((playerData) => {
        playerData.player.stopVideo();
        showPlayButton(playerData);
    });
};

/**
 * 初期化
 */
const init = async () => {
    const ytPlayerElements = document.querySelectorAll('.js-yt-player');

    if (ytPlayerElements.length === 0) return;

    try {
        // YouTube APIを読み込み
        await loadYouTubeAPI();

        // 各プレイヤーを作成
        ytPlayerElements.forEach((element) => {
            const videoId = element.getAttribute('data-video-id');
            const autoPlay = element.getAttribute('data-auto-play') === '1';

            if (videoId) {
                createPlayer(element, videoId, autoPlay);
            }
        });
    } catch (error) {
        console.error('Error in YouTube Player init:', error);
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
