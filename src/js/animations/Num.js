import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default class Num {
  constructor() {
    this.start();
  }

  start() {
    const nums = document.querySelectorAll("[data-num]");

    nums.forEach((num) => {
      function getDirection() {
        if (num.getAttribute("data-num") === "left") {
          if (window.innerWidth < 768) return "-50vw";
          return "-32vw";
        }
        if (window.innerWidth < 768) return "30vw";
        return "30vw";
      }
      gsap.to(num, {
        duration: 2,
        x: getDirection(),
        force3D: true,
        ease: "none",
        scrollTrigger: {
          // markers: true,
          invalidateOnRefresh: true,
          scrub: 0.5,
          scroller: ".scroller",
          scrub: true,
          trigger: num,
          start: "top bottom",
          end: "bottom top",
        },
      });
    });
  }
}
