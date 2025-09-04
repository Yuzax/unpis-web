let modal = null;
let modalContainer = null;
let modalButton = null;
let isModalOpen = false;

const getStyleSheetValue = (element, property) => {
    if (!element || !property) return;
    const style = document.defaultView.getComputedStyle(element, '');
    let value = parseFloat(style.getPropertyValue(property));
    return value;
};

const checkModalHeight = () => {
    if (!modal || !modalContainer || !isModalOpen) return;

    const windowHeight = window.innerHeight;
    const containerHeight = getStyleSheetValue(modalContainer, 'height');
    const padding =
        getStyleSheetValue(modalContainer, 'padding-top') +
        getStyleSheetValue(modalContainer, 'padding-bottom');

    if (containerHeight + padding >= windowHeight) {
        modal.classList.add('is-min-height');
        modalButton.classList.add('is-min-height');
    } else {
        modal.classList.remove('is-min-height');
        modalButton.classList.remove('is-min-height');
    }
};

export const toggleModalState = (_state) => {
    if (!modal) return;
    isModalOpen = _state;
    if (_state) checkModalHeight();
};

export const init = () => {
    modal = document.querySelector('.js-works-information-modal');
    modalContainer = modal
        ? modal.querySelector('.js-works-information-modal__container')
        : null;
    modalButton = modal
        ? modal.querySelector('.js-works-information-modal__button')
        : null;
    if (!modal || !modalContainer) return;
    checkModalHeight();
};

export const resize = () => {
    checkModalHeight();
};
