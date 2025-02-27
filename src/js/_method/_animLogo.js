let pathGroup = null;
let paths = null;
let target = null;
let colorClassList = [
    'js-anim-logo__rect--1',
    'js-anim-logo__rect--2',
    'js-anim-logo__rect--3',
    'js-anim-logo__rect--4',
];
let colorList = ['#e8374a', '#00a180', '#ed6c00', '#0075c2'];
let saturateArea = [50, 150];
let brightnessArea = [50, 100];

const shuffleInt = (_min, _max) => {
    return Math.floor(Math.random() * (_max + 1 - _min)) + _min;
};

const shuffleArray = (_array) => {
    for (let i = _array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [_array[i], _array[j]] = [_array[j], _array[i]];
    }
};

// const shuffleFilters = () => {
//     const saturate = shuffleInt(saturateArea[0], saturateArea[1]),
//         brightness = shuffleInt(brightnessArea[0], brightnessArea[1]);
//     target.setAttribute(
//         'style',
//         `filter: saturate(${saturate}%) brightness(${brightness}%)`,
//     );
// };

const shuffleColors = () => {
    shuffleArray(colorList);
    for (let i = 0; i < colorClassList.length; i++) {
        let elems = Array.from(
            pathGroup.getElementsByClassName(colorClassList[i]),
        );
        elems.forEach((_child) =>
            _child.setAttribute('style', `fill: ${colorList[i]}`),
        );
    }
};

const shuffleElements = () => {
    shuffleArray(paths);
    paths.forEach((_child) => pathGroup.appendChild(_child));
};

const shuffle = () => {
    shuffleElements();
    shuffleColors();
    // shuffleFilters();
};

export const init = () => {
    target = document.getElementsByClassName('js-anim-logo')[0];
    pathGroup = target.getElementsByTagName('g')[0];
    paths = Array.from(pathGroup.children);
    setInterval(shuffle, 3000);
};
