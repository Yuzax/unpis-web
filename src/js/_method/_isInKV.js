let target = [];
const SWITCH_POS = 100;

export const toggle = (_scrollTop) => {
    if (target.length == 0) return false;
    for (let i = 0; i < target.length; i++) {
        const isHide = target[i].classList.contains('is-in-kv');
        if (_scrollTop > SWITCH_POS && isHide)
            target[i].classList.remove('is-in-kv');
        else if (_scrollTop <= SWITCH_POS && !isHide)
            target[i].classList.add('is-in-kv');
    }
};

export const init = (_scrollTop) => {
    target = document.getElementsByClassName('js-is-in-kv');
    if (target.length == 0) return false;
    toggle(_scrollTop);
};
