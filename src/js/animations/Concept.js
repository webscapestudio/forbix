import gsap from 'gsap';
import { getChildIndex } from '../utils';

export default class Concept {
  constructor() {
    this.conceptLinks = document.querySelectorAll('.concept__text a');
    this.conceptImgs = document.querySelectorAll('.concept__img');

    if (this.conceptLinks.length) this.start();
  }

  start = () => {
    gsap.set(this.conceptImgs, { opacity: 0, y: -40 });

    this.conceptLinks.forEach((link) => {
      link.addEventListener('mouseenter', ({ currentTarget }) => {
        gsap.to(currentTarget, { duration: 0.4, color: '#24138B' });

        const linkIndex = getChildIndex(currentTarget);

        gsap.to(this.conceptImgs[linkIndex], {
          opacity: 1,
          ease: 'power3.out',
          duration: 0.4,
        });
        gsap.to(this.conceptImgs[linkIndex], {
          y: 0,
          ease: 'elastic.out',
          duration: 2,
        });
      });
    });
  };
}
