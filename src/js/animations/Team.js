import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default class Team {
  constructor() {
    if (document.querySelector(".team-wrapper")) this.start();
  }

  start() {
    const teamWrappers = document.querySelectorAll(".team-wrapper");

    teamWrappers.forEach((element) => {
      gsap.to(element.querySelector(".team-img"), {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1,
        ease: "circ.inOut",

        scrollTrigger: {
          scroller: ".scroller",
          // markers: true,
          trigger: element,
          scrub: false,
          pin: false,
          start: "top 80%",
        },
      });
    });
  }
}
