import {
    isLargeIpadWindowSize as IsPhoneWindowSize,
    isLargeDesktopWindowSize as IsLargeDesktopWindowSize,
} from './_class.js';

let targetContainer = null,
    targetItem = [];

const MARGIN = 32;
const SP_MARGIN = 16;

export const setDefaultStyle = () => {
    if (targetContainer == undefined) return false;
    targetContainer.style.height = '';
    targetContainer.classList.remove('is-active-masonry');
    for (let i = 0; i < targetItem.length; i++) {
        if (targetContainer == undefined) break;
        targetItem[i].classList.remove('is-active-masonry');
    }
};

const showItem = () => {
    if (targetContainer == undefined) return false;
    targetContainer.classList.add('is-active');
};

export const setStyle = () => {
    const columnNum = IsLargeDesktopWindowSize()
        ? 4
        : IsPhoneWindowSize()
          ? 2
          : 3;
    const marginSize = IsPhoneWindowSize() ? SP_MARGIN : MARGIN;
    let containerHeight = 0;
    for (let i = 0; i < columnNum; i++) {
        if (targetContainer == undefined) break;
        //- 列ごとに処理する
        let heightReserver = 0;
        for (let k = i; k < targetItem.length; k = k + columnNum) {
            if (targetContainer == undefined) break;
            if (k >= columnNum) targetItem[k].style.top = heightReserver + 'px';
            else targetItem[k].style.top = '0px';
            targetItem[k].classList.add('is-active-masonry');
            heightReserver +=
                parseFloat(targetItem[k].getBoundingClientRect().height) +
                marginSize;
            //- コンテナの高さを維持するための変数を更新する
            const tempContainerHeight = heightReserver - marginSize;
            if (containerHeight < tempContainerHeight) {
                containerHeight = tempContainerHeight;
            }
        }
        if (i == columnNum - 1) {
            if (targetContainer == undefined) return false;
            targetContainer.style.height = containerHeight + 'px';
            showItem();
            targetContainer.classList.add('is-active-masonry');
        }
    }
};

export const resize = () => {
    if (targetContainer == null || targetItem.length == 0) return false;
    if (!targetContainer.classList.contains('is-active-masonry')) return false;
    setStyle();
};

export const init = () => {
    targetContainer = document.getElementsByClassName('js-masonry')[0];
    if (targetContainer == undefined) return false;
    targetItem = targetContainer.getElementsByClassName('js-masonry__item');
    setStyle();
};
