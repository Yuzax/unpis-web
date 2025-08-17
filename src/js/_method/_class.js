export const isSmartphone = () => {
    return (
        navigator.userAgent.indexOf('Android') > 0 ||
        navigator.userAgent.indexOf('iPhone') > 0 ||
        navigator.userAgent.indexOf('iPod') > 0 ||
        (navigator.userAgent.indexOf('Android') > 0 &&
            navigator.userAgent.indexOf('Mobile') > 0)
    );
};

export const isIpad = () => {
    return navigator.userAgent.indexOf('iPad') > 0;
};

export const isDesktop = () => {
    return (
        navigator.userAgent.indexOf('iPad') <= 0 &&
        navigator.userAgent.indexOf('Android') <= 0 &&
        navigator.userAgent.indexOf('iPhone') <= 0 &&
        navigator.userAgent.indexOf('iPod') <= 0 &&
        (navigator.userAgent.indexOf('Android') <= 0 ||
            navigator.userAgent.indexOf('Mobile') <= 0)
    );
};

export const isAndroid = () => {
    return (
        navigator.userAgent.indexOf('Android') > 0 ||
        (navigator.userAgent.indexOf('Android') > 0 &&
            navigator.userAgent.indexOf('Mobile') > 0)
    );
};

export const isPhoneWindowSize = () => {
    return window.matchMedia('(max-width:768px)').matches;
};

export const isDesktopWindowSize = () => {
    return window.matchMedia('(min-width:769px)').matches;
};

export const isLargeDesktopWindowSize = () => {
    return window.matchMedia('(min-width:2001px)').matches;
};

export const getWindowSize = () => {
    return isDesktopWindowSize()
        ? 'pc'
        : window.matchMedia('(min-width:415px)').matches
          ? 'tb'
          : 'sp';
};

//- https://qiita.com/nightyknite/items/b2590a69f2e0135756dc
//- https://www.denisbouquet.com/javascript-targeting-safari-only/
export const browser = () => {
    const userAgent = window.navigator.userAgent;

    if (userAgent.indexOf('msie') != -1 || userAgent.indexOf('trident') != -1) {
        return 'ie';
    } else if (userAgent.indexOf('edge') != -1) {
        return 'edge';
    } else if (
        userAgent.indexOf('Safari') != -1 &&
        userAgent.indexOf('CriOS') != -1
    ) {
        //-iOSのみ有効
        return 'chrome';
    } else if (userAgent.indexOf('Safari') != -1) {
        return 'safari';
    } else if (userAgent.indexOf('firefox') != -1) {
        return 'firefox';
    } else if (userAgent.indexOf('opera') != -1) {
        return 'opera';
    } else {
        return 'other';
    }
};

export const isIE = () => {
    return !!document.documentMode;
};
