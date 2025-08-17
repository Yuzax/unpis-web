// import css
import 'AppSass/_style.sass';

// import methods
import { init as InitHover } from 'AppJs/_method/_hover';
import {
    init as InitChangeColor,
    update as UpdateChangeColor,
} from 'AppJs/_method/_changeColor';
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
    InitCopyAddress();
    InitIsInKV(scrollTop);
    InitKvNote();
    InitChangeStyle();
    InitInfiniteScroll();
};
init();

///////////////////////////////////////////////////////
// UPDATE（ページ遷移時のBarbaの挙動）
///////////////////////////////////////////////////////
const update = () => {
    UpdateChangeColor();
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
        });
        ticking = true;
    }
});

///////////////////////////////////////////////////////
// Barba
///////////////////////////////////////////////////////
InitBarba(init, update);
