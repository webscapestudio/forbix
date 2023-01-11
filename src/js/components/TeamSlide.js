// import Swiper JS
import Swiper, { Navigation } from 'swiper';

// import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

export default class TeamSlide {
  constructor() {
    if (document.querySelector('.team-swiper')) this.start();
  }

  start = () => {
    new Swiper('.team-swiper', {
      modules: [Navigation],
      spaceBetween: 30,
      slidesPerView: 'auto',
      touchStartPreventDefault: false,

      // Navigation arrows
      navigation: {
        nextEl: '.team-swiper-next',
        prevEl: '.team-swiper-prev',
      },
    });
  };
}
