import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

export default class ProjectSwiper {
  constructor() {
    if (document.querySelector('.project-swiper')) this.start();
  }

  start() {
    const swiper = new Swiper('.project-swiper', {
      // Optional parameters
      loop: true,
      slidesPerView: 2.5,
      centeredSlides: true,
      spaceBetween: 26,
      breakpoints: {
        768: {
          spaceBetween: 180,
        },
      },
    });

    document.querySelectorAll('.project-swiper .swiper-slide').forEach((item) =>
      item.addEventListener('click', () => {
        swiper.slideNext();
      })
    );
  }
}
