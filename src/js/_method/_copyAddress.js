const changeText = (_target, _text) => {
    _target.textContent = 'copied!';
    setTimeout(() => {
        _target.textContent = _text;
    }, 1000);
};

const copyLink = (_target) => {
    const text = _target.textContent;
    navigator.clipboard.writeText(text).then(
        () => {
            changeText(_target, text);
        },
        () => {
            alert('Sorry, failed to copy this link.');
        },
    );
};

const addEvent = (_target) => {
    _target.addEventListener('click', () => {
        copyLink(_target);
    });
};

export const init = () => {
    const target = document.getElementsByClassName('js-copy-address')[0];
    if (target != undefined) addEvent(target);
};
