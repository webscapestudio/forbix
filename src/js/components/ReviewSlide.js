// import Swiper JS
import Swiper, { Navigation, EffectFade } from 'swiper';

// import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

export default class ReviewSlide {
  constructor() {
    if (select('.review-swiper')) this.start();
  }

  start = () => {
    let swiper = new Swiper('.review-swiper', {
      modules: [Navigation, EffectFade],
      spaceBetween: 30,
      slidesPerView: 'auto',
      effect: 'fade',
      loop: true,
      fadeEffect: {
        crossFade: true,
      },

      // Navigation arrows
      navigation: {
        nextEl: '.review-swiper-next',
        prevEl: '.review-swiper-prev',
      },
    });

    swiper.on('slideChange', (s) => {
      select('.review-swiper-current').innerHTML = ('0' + (swiper.activeIndex + 1)).slice(-2);
    });

    select('.review-swiper-current').innerHTML = ('0' + (swiper.activeIndex + 1)).slice(-2);
    select('.review-swiper-total').innerHTML = ('0' + swiper.slides.length).slice(-2);

    document.querySelectorAll('.review-slide-content').forEach((item) =>
      item.addEventListener('click', () => {
        swiper.slideNext();
      })
    );
  };
}
