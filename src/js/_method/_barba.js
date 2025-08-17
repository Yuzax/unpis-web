import barba from '@barba/core';

export const init = (_init, _update) => {
    barba.init({
        transitions: [
            {
                // 現在のページを離れる時のフック
                leave() {},
                // 現在のページを離れたあとのフック
                after() {
                    window.scrollTo(0, 0); //- scrollを初期位置に戻す
                    _init();
                },
                enter() {
                    _update();
                },
            },
        ],
    });
};
