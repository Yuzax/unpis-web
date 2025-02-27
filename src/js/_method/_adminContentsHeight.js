import { isPhoneWindowSize, isDesktop } from 'AppJs/_method/_class';

let target = null;
let windowWidth;

const getPadding = (_elem) => {
    const style = window.getComputedStyle(_elem);
    const padding =
        parseFloat(style.getPropertyValue('padding-top')) +
        parseFloat(style.getPropertyValue('padding-bottom'));
    return padding;
};

const calcTargetHeight = (_target) => {
    const windowHeight = window.innerHeight;
    for (let i = 0; i < _target.length; i++) {
        _target[i].style.height = '';
        if (
            isPhoneWindowSize() &&
            _target[i].classList.contains('js-fit-content--only-pc')
        ) {
            continue;
        }
        let height = 0;
        const container = _target[i].getElementsByClassName(
            'js-fit-content__container',
        );
        const img = _target[i].getElementsByClassName('js-fit-content__img')[0];
        if (img != undefined) img.style.height = '';
        for (let k = 0; k < container.length; k++) {
            let containerHeight = 0;
            containerHeight += getPadding(container[k]);
            const item = container[k].getElementsByClassName(
                'js-fit-content__item',
            );
            for (let m = 0; m < item.length; m++) {
                containerHeight += item[m].getBoundingClientRect().height;
                if (m == item.length - 1 && k == container.length - 1) {
                    let imgIdealHeight = null;
                    if (img != undefined && isPhoneWindowSize()) {
                        imgIdealHeight = img.classList.contains(
                            'js-fit-content__img--logo',
                        )
                            ? windowWidth / 2
                            : windowWidth;
                        containerHeight += imgIdealHeight;
                        img.style.height = imgIdealHeight + 'px';
                    }
                    //- コンテナが複数ある場合は、コンテナ分掛け合わせておく。
                    height = containerHeight * container.length;
                    if (windowHeight > height) {
                        if (img != undefined && isPhoneWindowSize()) {
                            const imgTargetHeight =
                                windowHeight - (height - imgIdealHeight);
                            if (imgTargetHeight > imgIdealHeight)
                                img.style.height = imgTargetHeight + 'px';
                        }
                        height = windowHeight;
                    }
                    _target[i].style.height = height + 'px';
                }
            }
        }
    }
};

// const resetHeight = () => {
//     for (let i = 0; i < target.length; i++) {
//         target[i].style.height = '';
//     }
//     target = null;
// };

export const init = () => {
    windowWidth = window.innerWidth;
    target = document.getElementsByClassName('js-fit-content');
    calcTargetHeight(target);
};

export const resize = () => {
    if (target == null || target == undefined) return false;
    if (!isDesktop() && windowWidth == window.innerWidth) return false;
    windowWidth = window.innerWidth;
    calcTargetHeight(target);
};
