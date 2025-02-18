import {
    init as InitScrollTo,
    cancelScroll,
    scrollTo as ScrollScrollTo,
} from './_scrollTo.js';

let btn = null,
    speed = 600,
    scrolling = false;

const scrlToParam = (_targetId, _direct = false) => {
    const targetElem = document.querySelectorAll(
        '[data-section="' + _targetId + '"]',
    )[0];
    if (targetElem == undefined) return;
    const targetPos =
        _targetId != 0
            ? window.pageYOffset + targetElem.getBoundingClientRect().top + 5
            : -5;
    const start = document.documentElement.scrollTop || document.body.scrollTop;
    const promise = new Promise((resolve) => {
        ScrollScrollTo(targetPos, start, _direct ? 0 : speed, resolve);
    });
    promise.then(() => {
        scrolling = false;
    });
};

const initBtnEvent = () => {
    for (var i = 0; i < btn.length; i++) {
        btn[i].addEventListener(
            'click',
            (event) => {
                if (scrolling) cancelScroll();
                scrolling = true;
                const target = event.target;
                const targetId = target.getAttribute('data-target');
                scrlToParam(targetId);
            },
            false,
        );
    }
};

const initVariable = () => {
    btn = document.getElementsByClassName('js-scroll-to-btn');
};

export const init = () => {
    initVariable();
    InitScrollTo();
    initBtnEvent();
};
