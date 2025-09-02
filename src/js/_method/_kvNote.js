let target = null,
    targetText = null,
    visibleTarget = [];

// Blinkのアニメーション自体はcssで管理してます。

const setEventListener = () => {
    targetText.addEventListener('animationend', () => {
        setTimeout(() => {
            if (targetText == null || target == null) return false;
            targetText.classList.remove('is-animating');
            target.classList.add('is-hide');
            for (let i = 0; i < visibleTarget.length; i++) {
                visibleTarget[i].classList.remove('is-hide');
            }
        }, 800);
    });
};

export const init = () => {
    target = document.getElementsByClassName('js-kv-note')[0];
    visibleTarget = document.getElementsByClassName(
        'js-kv-note__visible-target',
    );
    if (target == null || visibleTarget.length == 0) return false;
    targetText = target.getElementsByClassName('js-kv-note__text')[0];
    targetText.classList.add('is-animating');
    setEventListener();
};
