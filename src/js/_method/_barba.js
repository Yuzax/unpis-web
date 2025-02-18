import barba from '@barba/core';

export const init = (_init) => {
    barba.init({
        transitions: [
            {
                leave() {},
                after() {
                    window.scrollTo(0, 0); //- scrollを初期位置に戻す
                    _init();
                },
            },
        ],
    });
};
