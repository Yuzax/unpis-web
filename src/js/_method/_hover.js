import { isDesktop } from 'AppJs/_method/_class';

const addHover = (_target) => {
    _target.classList.add('is-hover');
};

const removeHover = (_target) => {
    _target.classList.remove('is-hover');
};

const addMouseEvents = (_target) => {
    if (isDesktop()) {
        _target.addEventListener('mouseenter', () => {
            addHover(_target);
        });
        _target.addEventListener('mouseleave', () => {
            removeHover(_target);
        });
    } else {
        _target.classList.add('is-sp');
        _target.addEventListener('touchstart', () => {
            addHover(_target);
        });
        _target.addEventListener('touchend', () => {
            removeHover(_target);
        });
        _target.addEventListener('touchcancel', () => {
            removeHover(_target);
        });
    }
};

const addEvent = (_target) => {
    for (let i = 0; i < _target.length; i++) addMouseEvents(_target[i]);
};

export const init = () => {
    const target = document.getElementsByClassName('js-hover');
    addEvent(target);
};
