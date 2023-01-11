import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

export default class NewsSlider {
  constructor() {
    if (document.querySelector('.news-slider')) this.start();
  }

  start() {
    const swiper = new Swiper('.news-slider', {
      // Optional parameters
      //   loop: true,
      slidesPerView: 1.5,
      touchStartPreventDefault: false,

      spaceBetween: 18,
    });
  }
}
