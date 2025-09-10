import { easingEaseOutExpo } from './_easing.js';
import { browser, isSmartphone } from './_class.js';

let isEnableScrolling, scrollThreshold, scrollTimeout;

export const scrollTo = (to, start, duration, resolve) => {
    let change = to - start,
        currentTime = 0,
        increment = 20;
    if (Math.abs(change) > 20) {
        isEnableScrolling = true;
        let animateScroll = () => {
            currentTime += increment;
            let val = easingEaseOutExpo(currentTime, start, change, duration);
            document.documentElement.scrollTop = val;
            document.body.scrollTop = val;
            if (currentTime < duration && isEnableScrolling)
                scrollTimeout = setTimeout(animateScroll, increment);
            else {
                if (resolve != null) resolve();
            }
        };
        animateScroll();
    } else {
        if (resolve != null) resolve();
    }
};

export const cancelScroll = () => {
    isEnableScrolling = false;
    window.clearTimeout(scrollTimeout);
};

const addCheckUserActionPC = () => {
    window.addEventListener('wheel', (event) => {
        if (isEnableScrolling) {
            if (
                event.deltaY >= scrollThreshold ||
                event.deltaY <= -1 * scrollThreshold
            )
                cancelScroll();
        }
    });
};

const addCheckUserActionSP = () => {
    let touchStartY;
    let touchMoveY;
    window.addEventListener('touchstart', (event) => {
        if (isEnableScrolling) touchStartY = event.touches[0].pageY;
    });
    window.addEventListener('touchmove', (event) => {
        if (isEnableScrolling) {
            touchMoveY = event.changedTouches[0].pageY - touchStartY;
            if (
                touchMoveY >= scrollThreshold ||
                touchMoveY < -1 * scrollThreshold
            )
                cancelScroll();
        }
    });
};

const initVariable = () => {
    ((isEnableScrolling = false),
        (scrollThreshold = browser() == 'safari' ? 1 : 20),
        (scrollTimeout = null));
};

export const init = () => {
    initVariable();
    if (isSmartphone()) addCheckUserActionSP();
    else {
        addCheckUserActionPC();
    }
};
