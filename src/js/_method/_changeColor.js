let btn = null,
    target = null;

const updateColor = (_change = true) => {
    const isRev = document
        .getElementsByTagName('html')[0]
        .classList.contains('is-rev');
    for (let i = 0; i < target.length; i++) {
        if (_change) {
            if (isRev) target[i].classList.remove('is-rev');
            else target[i].classList.add('is-rev');
        } else {
            if (isRev) target[i].classList.add('is-rev');
            else target[i].classList.remove('is-rev');
        }
    }
};

const addMouseEvents = async (_target) => {
    _target.addEventListener('click', () => {
        updateColor();
    });
};

//- 別ページに遷移した時
export const update = () => {
    updateColor(false);
};

export const init = () => {
    ((btn = document.getElementsByClassName('js-change-color-btn')[0]),
        (target = document.getElementsByClassName('js-change-color-target')));
    if (target.length == 0) return false;
    addMouseEvents(btn);
};
