// import css
import 'AppSass/_style.sass';

// import methods
import { init as InitHover } from 'AppJs/_method/_hover';
import { init as InitLazyLoad } from 'AppJs/_method/_activateLazyload';
import { init as InitTargetScroll } from 'AppJs/_method/_targetScroll';
import { init as InitBarba } from 'AppJs/_method/_barba';
import { init as InitAvoidReload } from 'AppJs/_method/_avoidReload';
import {
    init as InitAdminContentsHeight,
    resize as ResizeAdminContentsHeight,
} from 'AppJs/_method/_adminContentsHeight';
import { init as InitLogoAnimation } from 'AppJs/_method/_animLogo';

// // variable
let ticking = false;
// let scrollTop = 0;

// 下記で環境変数を取得可能
// process.env.NODE_ENV

///////////////////////////////////////////////////////
// ONCLICK
///////////////////////////////////////////////////////

///////////////////////////////////////////////////////
// DOM LOADED
///////////////////////////////////////////////////////
const init = async () => {
    // const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    InitAdminContentsHeight();
    InitHover();
    InitLazyLoad();
    InitTargetScroll();
    InitAvoidReload();
    InitLogoAnimation();
};
init();

///////////////////////////////////////////////////////
// RESIZE
///////////////////////////////////////////////////////
const resize = () => {
    window.addEventListener('resize', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                ticking = false;
                ResizeAdminContentsHeight();
                //   const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            });
            ticking = true;
        }
    });
};
resize();

///////////////////////////////////////////////////////
// SCROLL
///////////////////////////////////////////////////////
// window.addEventListener( 'scroll', () => {
//   if( !ticking ) {
//   window.requestAnimationFrame( () => {
//     ticking = false;
//     scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//   });
//   ticking = true;
//   }
// })

///////////////////////////////////////////////////////
// Barba
///////////////////////////////////////////////////////
InitBarba(init);
