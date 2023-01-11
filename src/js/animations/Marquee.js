import gsap from 'gsap';

export default class Marquee {
  constructor() {
    document.querySelector('.marquee') && this.start();
  }

  start() {
    gsap.to('.marquee__part', { xPercent: -100, repeat: -1, duration: 32, ease: 'linear' }).totalProgress(0.5);

    gsap.set('.marquee__inner', { xPercent: -50 });
  }
}
