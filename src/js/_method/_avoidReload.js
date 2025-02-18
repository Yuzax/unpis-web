const cbk = (_event) => {
    if (_event.currentTarget.href === window.location.href) {
        _event.preventDefault();
        _event.stopPropagation();
    }
};

export const init = () => {
    const target = document.getElementsByClassName('js-avoid-reload');
    for (let i = 0; i < target.length; i++) {
        target[i].addEventListener('click', cbk);
    }
};
