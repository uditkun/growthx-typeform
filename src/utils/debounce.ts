const debounce = (func: Function, delay: number) => {
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

export default debounce;
