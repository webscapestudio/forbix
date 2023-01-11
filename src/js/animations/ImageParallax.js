import gsap from "gsap";
import Scrollbar from "smooth-scrollbar";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export const ImageParallax = () => {
  const items = gsap.utils.toArray(".img__wrapper");
  items.forEach((item) => {
    const imgBox = item.querySelector(".--parallaxed-img");
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        scroller: ".scroller",
        scrub: true,
        pin: false,
      },
    });
    tl.from(imgBox, {
      yPercent: -10,
    }).to(imgBox, {
      yPercent: 10,
    });
  });
};
