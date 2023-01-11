import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default class Parallax {
  constructor() {
    if (document.querySelector(".parallax-block")) this.start();
  }

  start() {
    const blocks = document.querySelectorAll(".parallax-block");

    blocks.forEach((block) => {
      const img = block.querySelector(".parallax-block__item");
      let animation;
      if (img.classList.contains("parallax-block__item--text")) {
        animation = gsap.fromTo(
          img,
          { y: () => block.offsetHeight - img.offsetHeight },
          {
            y: 0,
            ease: "none",
          }
        );
      } else {
        animation = gsap.fromTo(
          img,
          { y: 0 },
          {
            y: () => block.offsetHeight - img.offsetHeight,
            ease: "none",
          }
        );
      }

      ScrollTrigger.create({
        trigger: block,
        animation,
        scrub: 0.5,
        invalidateOnRefresh: true,
        end: "bottom 10%",
      });
    });
  }
}
