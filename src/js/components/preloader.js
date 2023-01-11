import gsap from "gsap";
import imagesLoaded from "imagesloaded";
import { wait } from "../utils";

export default class Preloader {
  constructor(fn) {
    this.fn = fn;
    this.dev = false;
    // this.dev = false;

    // this.wrapper = document.querySelector('[data-barba="wrapper"]');
    this.wrapper = document.querySelector('[data-barba="wrapper"]');
    this.logo = document.querySelector(".logo");
    this.logoSVG = document.querySelector(".logo svg");
    this.logoPaths = document.querySelectorAll(".logo .logo-path");

    this.preloader = document.querySelector(".preloader");
    this.preloaderPercent = document.querySelector("#preloader-percent");

    this.pageReady = false;

    this.init();
    this.dev ? this.devStart() : this.start();

    this.loadingStatus();

    this.computedTopPosition = null;
    this.computedLeftPosition = null;

    window.addEventListener("resize", () => {
      this.computeLogoPosition();

      gsap.set(".logo", {
        top: this.computedTopPosition,
        left: this.computedLeftPosition,
      });
    });
  }

  init() {
    gsap.set(this.wrapper, {
      yPercent: 50,
      height: "100vh",
      scale: 0.8,
      borderRadius: 50,
      overflow: "hidden",
    });

    gsap.set(this.logoSVG, { width: "60%" });

    gsap.set(this.logo, {
      left: 0,
      top: 0,
      width: "100%",
      height: "100vh",
      zIndex: 110,
    });

    gsap.set(this.logoPaths, {
      opacity: 0,
      xPercent: -30,
    });
  }

  loadingStatus = () => {
    imagesLoaded(document.querySelectorAll("img, video"), () => {
      setTimeout(() => {
        this.pageReady = true;
        this.preloaderPercent.innerHTML = 100;
        this.dev === false && this.hide();
      }, 1000);
    });

    let i = 0;
    let progress = [];

    const mediaFiles = document.querySelectorAll("img, video");
    Array.from(mediaFiles).forEach(() => {
      i++;
      progress.push(((i * 100) / mediaFiles.length).toFixed());
    });
    progress.pop();

    const loop = async () => {
      for (const a of progress) {
        if (!this.pageReady) {
          this.preloaderPercent.innerHTML = a;
          a > 70 ? await wait(a * 4) : await wait(a * 2);
        }
      }
    };

    loop();
  };

  start() {
    const tl = gsap.timeline();

    tl.to(this.wrapper, {
      yPercent: 0,
      opacity: 1,
      duration: 1.4,
      ease: "power3.out",
    });

    tl.to(
      this.logoPaths,
      {
        xPercent: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
      },
      "<0.2"
    );

    tl.to(
      this.preloader,
      {
        opacity: 1,
        duration: 1,
      },
      "<0.2"
    );

    tl.to(
      ".preloader__content",
      {
        opacity: 1,
        duration: 1,
      },
      "<"
    );
  }

  devStart() {
    gsap.set(this.wrapper, {
      yPercent: 0,
      opacity: 1,
    });

    gsap.set(this.logoPaths, {
      xPercent: 0,
      opacity: 1,
    });

    gsap.set(this.preloader, {
      opacity: 1,
    });

    gsap.set(".preloader__content", {
      opacity: 1,
    });

    this.computeLogoPosition();

    gsap.set(this.preloader, {
      opacity: 0,
    });

    gsap.set(this.logo, {
      width: window.innerWidth > 768 ? "98" : "58",
      height: window.innerWidth > 768 ? "24" : "14",
      top: this.computedTopPosition,
      left: this.computedLeftPosition,
    });

    gsap.set(this.logoSVG, {
      width: window.innerWidth > 768 ? "98" : "58",
    });

    gsap.set(this.wrapper, {
      scale: 1,
      borderRadius: 0,
      onComplete: () => {
        this.fn();

        gsap.set(this.wrapper, {
          height: "initial",
        });
        gsap.set("body", {
          overflow: "hidden",
        });
        gsap.set(this.preloader, {
          display: "none",
        });
      },
    });
  }

  hide() {
    const tl = gsap.timeline();
    this.computeLogoPosition();
    tl.to(this.preloader, {
      opacity: 0,
      duration: 1,
    });

    tl.to(
      this.logo,
      {
        width: window.innerWidth > 768 ? "98" : "58",
        height: window.innerWidth > 768 ? "24" : "14",
        duration: 1,
        top: this.computedTopPosition,
        left: this.computedLeftPosition,
        ease: "power3.inOut",
      },
      "<"
    );

    tl.to(
      this.logoSVG,
      {
        width: 98,
        duration: 1,
        ease: "power3.inOut",
        onComplete: () => {
          this.fn();
        },
      },
      "<"
    );

    tl.to(this.wrapper, {
      scale: 1,
      borderRadius: 0,
      duration: 1,
      ease: "power2.inOut",
      clearProps: "transform",
      onComplete: () => {
        gsap.set(this.wrapper, {
          height: "initial",
        });
        gsap.set("body", {
          overflow: "initial",
        });
        gsap.set(this.preloader, {
          display: "none",
        });
      },
    });
  }

  computeLogoPosition = () => {
    let container = document.querySelector("#relative-container");
    const paddingLeft = parseInt(getComputedStyle(container).paddingLeft);

    let topPositions = [24, 44];

    let left = paddingLeft;
    let top = window.innerWidth <= 1024 ? topPositions[0] : topPositions[1];

    this.computedLeftPosition = left;
    this.computedTopPosition = top;
  };
}
