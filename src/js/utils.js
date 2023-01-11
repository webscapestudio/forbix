const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty('--app-height', `${window.innerHeight}px`);
};

const getChildIndex = (el, src = document) =>
  Array.from(el.parentNode.children).indexOf(el);

export { wait, appHeight, getChildIndex };
