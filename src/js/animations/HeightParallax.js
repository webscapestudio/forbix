import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default class HeightParallax {
  constructor() {
    // if (document.querySelector('.h-parallax')) this.start();
  }

  start() {
    scroll.on('scroll', () => ScrollTrigger.update());

    ScrollTrigger.scrollerProxy('[data-scroll-container]', {
      scrollTop(value) {
        return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },

      pinType: document.querySelector('[data-scroll-container]').style.transform ? 'transform' : 'fixed',
    });

    ScrollTrigger.defaults({
      scroller: document.querySelector('[data-scroll-container]'),
    });

    gsap.to('.h-parallax', {
      height: 800,
      onComplete() {
        scroll.update();
      },
      scrollTrigger: {
        trigger: '.h-parallax',
        // markers: true,
        start: 'bottom 90%',
        end: 'bottom -50%',
        scrub: true,
      },
    });
  }
}
