// currentTime は変化が開始してからの経過時間。
// startValue は初期値。
// changeValue は初期値から変化させたい分の値。完了時の値ではない。
// duration は変化が完了するまでに要する時間。
// http://gizma.com/easing/

export const easingLinear = (currentTime, startValue, changeValue, duration) => {
    return changeValue * currentTime / duration + startValue;
  };
  
  export const easingEaseInCubic = (currentTime, startValue, changeValue, duration) => {
    currentTime /= duration;
    return changeValue * currentTime * currentTime * currentTime + startValue;
  };
  
  export const easingEaseOutCubic = (currentTime, startValue, changeValue, duration) => {
    currentTime /= duration;
    currentTime--;
    return changeValue * (currentTime * currentTime * currentTime + 1) + startValue;
  };
  
  export const easingEaseInExpo = (currentTime, startValue, changeValue, duration) => {
    return changeValue * Math.pow(2, 10 * (currentTime / duration - 1)) + startValue;
  };
  
  export const easingEaseOutExpo = (currentTime, startValue, changeValue, duration) => {
    return changeValue * (-1 * Math.pow(2, -10 * currentTime / duration) + 1) + startValue;
  };
  
  export const easingEaseOutQuart = (currentTime, startValue, changeValue, duration) => {
    currentTime /= duration;
      currentTime--;
      return -changeValue * (currentTime*currentTime*currentTime*currentTime - 1) + startValue;
  };
  