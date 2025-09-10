// import css
import 'AppSass/_style.sass';

// import methods
import { init as InitHover } from 'AppJs/_method/_hover';
import {
    init as InitChangeColor,
    update as UpdateChangeColor,
} from 'AppJs/_method/_changeColor';
import {
    init as InitFaceAnimation,
    update as UpdateFaceAnimation,
} from 'AppJs/_method/_faceAnimation';
import { init as InitCopyAddress } from 'AppJs/_method/_copyAddress';
import { init as InitLazyLoad } from 'AppJs/_method/_activateLazyload';
import { init as InitTargetScroll } from 'AppJs/_method/_targetScroll';
import { init as InitBarba } from 'AppJs/_method/_barba';
import { init as InitAvoidReload } from 'AppJs/_method/_avoidReload';
import {
    init as InitIsInKV,
    toggle as ToggleIsInKV,
} from 'AppJs/_method/_isInKV';
import { init as InitKvNote } from 'AppJs/_method/_kvNote';
import {
    init as InitMasonry,
    resize as ResizeMasonry,
} from 'AppJs/_method/_masonry';
import { init as InitChangeStyle } from 'AppJs/_method/_changeStyle';
import { init as InitInfiniteScroll } from 'AppJs/_method/_infiniteScroll';
import { init as InitWorksModal } from 'AppJs/_method/_worksModal';
import {
    init as InitWorksSeen,
    update as UpdateWorksSeen,
} from 'AppJs/_method/_worksSeen';
// import { init as InitIframeDetection } from 'AppJs/_method/_iframeDetection';
import { init as InitWorksSlider } from 'AppJs/_method/_worksSlider';
import {
    init as InitWorksInformationModal,
    resize as ResizeWorksInformationModal,
} from 'AppJs/_method/_worksInformationModal';
import {
    init as InitDancingMan,
    onScroll as OnScrollDancingMan,
    onResize as OnResizeDancingMan,
    update as UpdateDancingMan,
} from 'AppJs/_method/_dancingMan';
import {
    init as InitKv,
    resize as ResizeKv,
    update as UpdateKv,
} from 'AppJs/_method/_kv';
import {
    init as InitHeaderScroll,
    resize as ResizeHeaderScroll,
    update as UpdateHeaderScroll,
    onScroll as OnScrollHeaderScroll,
} from 'AppJs/_method/_headerScroll';
import 'AppJs/_method/_faviconAnimation';

// // variable
let ticking = false;
let scrollTop = 0;

// 下記で環境変数を取得可能
// process.env.NODE_ENV

///////////////////////////////////////////////////////
// ONCLICK
///////////////////////////////////////////////////////

///////////////////////////////////////////////////////
// DOM LOADED
///////////////////////////////////////////////////////
const init = async () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    InitMasonry();
    InitHover();
    InitLazyLoad();
    InitTargetScroll();
    InitAvoidReload();
    InitChangeColor();
    InitFaceAnimation();
    InitCopyAddress();
    InitIsInKV(scrollTop);
    InitKvNote();
    InitChangeStyle();
    InitInfiniteScroll();
    InitWorksModal();
    InitWorksSeen();
    // InitIframeDetection();
    InitWorksSlider();
    InitWorksInformationModal();
    InitDancingMan(scrollTop);
    InitKv();
    InitHeaderScroll(scrollTop);
};
init();

///////////////////////////////////////////////////////
// UPDATE（ページ遷移時のBarbaの挙動）
///////////////////////////////////////////////////////
const update = () => {
    UpdateChangeColor();
    UpdateFaceAnimation();
    UpdateDancingMan();
    UpdateWorksSeen();
    UpdateKv();
    UpdateHeaderScroll();
};

///////////////////////////////////////////////////////
// RESIZE
///////////////////////////////////////////////////////
const resize = () => {
    window.addEventListener('resize', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                ticking = false;
                const scrollTop =
                    window.pageYOffset || document.documentElement.scrollTop;
                ResizeMasonry();
                ToggleIsInKV(scrollTop);
                ResizeWorksInformationModal();
                // dancing-manのリサイズ処理を統合
                OnResizeDancingMan();
                ResizeKv();
                ResizeHeaderScroll(scrollTop);
            });
            ticking = true;
        }
    });
};
resize();

///////////////////////////////////////////////////////
// SCROLL
///////////////////////////////////////////////////////
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            ticking = false;
            scrollTop =
                window.pageYOffset || document.documentElement.scrollTop;
            ToggleIsInKV(scrollTop);
            // dancing-manのスクロール処理を統合
            OnScrollDancingMan(scrollTop);
            // ヘッダースクロール処理を統合
            OnScrollHeaderScroll(scrollTop);
        });
        ticking = true;
    }
});

///////////////////////////////////////////////////////
// Barba
///////////////////////////////////////////////////////
InitBarba(init, update);
