import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default class Footer {
  constructor() {
    if (document.querySelector('.footer')) this.start();
  }

  start() {
    // let footer = document.querySelector('.footer');
    // let lastKnownScrollPosition = 0;
    // window.addEventListener('scroll', (e) => {
    //   lastKnownScrollPosition = window.scrollY;
    //   console.log(lastKnownScrollPosition);
    // });
  }
}
