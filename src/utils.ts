export const debounce = (func: Function, delay: number) => {
  //This function needs more improvement as it gives unpleasant user experience in case of using touchpad
  let timeOut: any;

  return (...args: any) => {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      timeOut = null;
      func(...args);
    }, delay);
  };
};

export const getTranslateValue = (pos: number, slide: number) => {
  //Returns classnames for respective elements in order to facilitate scroll like experience
  let translateValue = slide * 100 - pos * 100;
  return translateValue > 0
    ? `-translate-y-${Math.abs(translateValue)} opacity-0`
    : `translate-y-${Math.abs(translateValue)} opacity-0`;
};
