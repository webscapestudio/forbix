// import Swiper JS
import Swiper, { FreeMode, Mousewheel } from "swiper";
import gsap from "gsap";

// import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";

export default class History {
  constructor() {
    this.historySwiper = select(".history-swiper");
    this.historySlides = selectAll(".history-swiper .swiper-slide");
    if (this.historySwiper) this.start();
  }

  start = () => {
    const swiperSlides = selectAll(".history-swiper .swiper-slide");

    const swiper = new Swiper(this.historySwiper, {
      modules: [FreeMode, Mousewheel],
      slidesPerView: 1,
      initialSlide: 2,
      centeredSlides: "auto",
      spaceBetween: 60,
      touchStartPreventDefault: false,

      breakpoints: {
        768: {
          spaceBetween: 200,
          slidesPerView: "auto",

          freeMode: {
            enabled: true,
            momentumRatio: 0.4,
          },
        },
      },
    });

    gsap.set(
      select(".history-swiper__heading", swiperSlides[swiper.realIndex]),
      {
        scale: 1,
        color: "#24138b",
      }
    );

    gsap.set(select(".history-swiper__text", swiperSlides[swiper.realIndex]), {
      opacity: 1,
    });
    gsap.set(select(".history-swiper__img", swiperSlides[swiper.realIndex]), {
      opacity: 1,
      y: window.innerWidth >= 768 ? 74 : 60,
    });

    swiper.on("slideChange", ({ previousIndex, realIndex }) => {
      gsap.to(select(".history-swiper__heading", swiperSlides[previousIndex]), {
        scale: 0.4,
        duration: 0.4,
        color: "#A1A1AA",
        ease: "power3.out",
      });
      gsap.to(select(".history-swiper__text", swiperSlides[previousIndex]), {
        opacity: 0,
        duration: 0.4,
        ease: "power3.out",
      });
      gsap.to(select(".history-swiper__img", swiperSlides[previousIndex]), {
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        y: 0,
      });

      gsap.to(select(".history-swiper__heading", swiperSlides[realIndex]), {
        scale: 1,
        duration: 0.4,
        ease: "power3.out",
        color: "#24138b",
      });
      gsap.to(select(".history-swiper__text", swiperSlides[realIndex]), {
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
      });
      gsap.to(select(".history-swiper__img", swiperSlides[realIndex]), {
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        y: 72,
      });
    });
  };
}
