import gsap from 'gsap';

export default class Header {
  constructor() {
    this.els = document.querySelectorAll('.header-animation');
    this.start();
  }

  start() {
    gsap.to(this.els, {
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.inOut',
      scale: 1,
      opacity: 1,
    });
  }
}
