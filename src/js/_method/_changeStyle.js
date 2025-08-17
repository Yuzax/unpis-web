import {
    setStyle as SetMasonry,
    setDefaultStyle as DeleteMasonry,
} from 'AppJs/_method/_masonry';

let arrow = null,
    worksWrap = null,
    worksItem = [];

const changeImageSize = (_target, _isList = false) => {
    const img = _target.getElementsByClassName('js-change-style__image')[0];
    if (_isList) {
        img.dataset.sizesTile = img.sizes;
        img.sizes = img.dataset.sizesList;
    } else {
        img.dataset.sizesList = img.sizes;
        img.sizes = img.dataset.sizesTile;
    }
};

const changeArrowState = (_isList = false) => {
    if (_isList) arrow.classList.add('is-list');
    else arrow.classList.remove('is-list');
};

const changeToTile = (_targetButton) => {
    _targetButton.classList.add('is-active');
    changeArrowState();
    worksWrap.classList.remove('is-active-list');
    for (let i = 0; i < worksItem.length; i++) {
        changeImageSize(worksItem[i]);
        worksItem[i].classList.remove('is-active-list');
        if (i == worksItem.length - 1) {
            SetMasonry();
        }
    }
};

const changeToList = (_targetButton) => {
    _targetButton.classList.add('is-active');
    changeArrowState(true);
    DeleteMasonry();
    worksWrap.classList.add('is-active-list');
    for (let i = 0; i < worksItem.length; i++) {
        changeImageSize(worksItem[i], true);
        worksItem[i].classList.add('is-active-list');
    }
};

const setEventListener = (_targetButtons) => {
    for (let i = 0; i < _targetButtons.length; i++) {
        _targetButtons[i].addEventListener('click', (_e) => {
            if (_e.target.classList.contains('is-active')) return false;
            _targetButtons[i == 0 ? 1 : 0].classList.remove('is-active');
            if (_e.target.classList.contains('js-change-style__button--tile'))
                changeToTile(_e.target);
            else changeToList(_e.target);
        });
    }
};

export const init = () => {
    const buttons = document.getElementsByClassName('js-change-style__button');
    ((arrow = document.getElementsByClassName('js-change-style__arrow')[0]),
        (worksWrap = document.getElementsByClassName('js-change-style')[0]),
        (worksItem = document.getElementsByClassName('js-change-style__item')));
    if (worksItem.length == 0) return false;
    setEventListener(buttons);
};
