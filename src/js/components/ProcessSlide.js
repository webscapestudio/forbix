// import Swiper JS
import Swiper, { Navigation } from 'swiper';

// import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

export default class ProcessSlide {
  constructor() {
    this.process = select('.process-swiper');
    if (this.process) this.start();
  }

  start = () => {
    new Swiper(this.process, {
      modules: [Navigation],
      slidesPerView: 1,
      touchStartPreventDefault: false,

      breakpoints: {
        768: {
          slidesPerView: 2.31,
        },
      },
    });
  };
}
