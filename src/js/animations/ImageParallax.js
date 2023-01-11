import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export const ImageParallax = () => {
  const items = gsap.utils.toArray(".img__wrapper");

  items.forEach((item, idx) => {
    const img = item.querySelector(".--parallaxed-img");

    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        scrub: 1,
      },
    });
    tl.from(img, {
      yPercent: -7,
    }).to(img, {
      yPercent: 7,
    });
  });
};
