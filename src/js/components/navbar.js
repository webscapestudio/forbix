import gsap from "gsap";
import Scrollbar from "smooth-scrollbar";

export default class Navbar {
  constructor() {
    this.navbar = document.querySelector(".navbar");
    this.navbarLogo = document.querySelector(".navbar__logo");
    this.navbarItems = document.querySelectorAll(".navbar__list-item");
    this.navbarSocials = document.querySelectorAll(".navbar__footer a");

    this.navbarBurger = document.querySelector(".navbar-burger");
    if (document.querySelector(".navbar")) {
      this.init();
      this.start();
    }
    this.show = false;

    this.tl = gsap.timeline({
      paused: true,
      ease: "power3.out",
      onReverseComplete() {
        gsap.set(".navbar", { display: "none" });
      },
    });

    this.tl.to(this.navbar, {
      clipPath: "circle(100% at 70% 30%)",
      duration: 0.6,
    });

    const options = {
      opacity: 1,
      x: 0,
    };

    this.tl.to(this.navbarLogo, options, "-=.1");
    this.tl.to(this.navbarItems, { ...options, stagger: 0.15 }, "-=.2");
    this.tl.to(this.navbarSocials, { ...options, stagger: 0.15 }, "-=.2");
  }

  init() {
    const options = {
      opacity: 0,
      x: -60,
    };
    gsap.set(this.navbarLogo, options);
    gsap.set(this.navbarItems, options);
    gsap.set(this.navbarSocials, options);

    // document.querySelectorAll('.navbar__logo').forEach((logo) => {
    //   logo.addEventListener('click', () => {

    //   })
    // })
  }

  start() {
    this.navbarBurger.addEventListener("click", () => {
      this.show = !this.show;
      this.show ? this.open() : this.close();
    });

    this.navbarBurger.addEventListener("mousemove", (e) => {
      if (window.innerWidth >= 1024) {
        const position = this.navbarBurger.getBoundingClientRect();
        const x = e.pageX - position.left - position.width / 2;
        const y = e.pageY - position.top - position.height / 2;

        gsap.to(this.navbarBurger, {
          x: x / 2,
          y: y / 2,
          duration: 0.55,
          ease: "power3.out",
        });
      }
    });

    this.navbarBurger.addEventListener("mouseleave", (e) => {
      gsap.to(this.navbarBurger, {
        x: 0,
        y: 0,
        duration: 0.55,
        ease: "power3.out",
      });
    });
  }

  open() {
    gsap.set(".navbar", { display: "flex" });
    document.documentElement.classList.add("navbar-active");
    this.tl.timeScale(1).play();
    Scrollbar.destroy(document.querySelector(".scroller"));
  }

  close() {
    document.documentElement.classList.remove("navbar-active");
    let bodyScrollBar = Scrollbar.init(document.querySelector(".scroller"), {
      damping: 0.07,
    });
    this.tl.timeScale(2.2).reverse();
  }
}
