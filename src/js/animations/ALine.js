import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default class ALine {
  constructor() {
    if (document.querySelector(".a-line")) this.start();
  }

  start() {
    const lines = document.querySelectorAll(".a-line-a");

    lines.forEach((line) => {
      gsap.to(line, {
        width: "100%",
        // duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          markers: true,
          scrub: true,
          trigger: line,
        },
      });
    });
  }
}
