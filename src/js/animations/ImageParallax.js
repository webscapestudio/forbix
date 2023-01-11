import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export const ImageParallax = () => {
  const items = gsap.utils.toArray(".img__wrapper");
  items.forEach((item) => {
    const imgBox = item.querySelector(".--parallaxed-img");
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        scroller: document.querySelector("[data-scroll-container]"),
        start: "top 80%",
        scrub: 1,
        markers: true,
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
