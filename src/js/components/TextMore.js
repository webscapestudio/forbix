export default class TextMore {
  constructor() {
    if (document.querySelector('.text-more')) this.start();
  }

  start() {
    let computeHeight = () => {
      if (window.innerWidth < 768) return 308;
      return 235;
    };
    document.querySelectorAll('.text-more').forEach((text) => {
      let open = false;
      text.addEventListener('click', (e) => {
        open = !open;
        if (open) {
          e.target.style.height = e.target.scrollHeight + 'px';
          e.target.classList.add('active');
        } else {
          e.target.style.height = computeHeight() + 'px';

          e.target.classList.remove('active');
        }
      });
    });
  }
}
