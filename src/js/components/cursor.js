import MouseFollower from "mouse-follower";
import gsap from "gsap";

MouseFollower.registerGSAP(gsap);

const arrowItemsUp = document.querySelectorAll("[data-cursor-arrow]");
const arrowItems = document.querySelectorAll("[data-cursor-arrow-right]");

window.cursor = new MouseFollower({
  iconSvgSrc: "../../images/content/sprite.svg",
  stateDetection: {
    "-pointer": "a,button, [data-cursor-dark], .accordion-primary",
    "-hidden": ".footer",
    "-dark":
      ".button-round, [data-cursor-dark], .accordion-primary, .navbar-burger, .top-logo",
    "-dark -pointer": ".map-list-item, .portfolio-tabs__btn",
  },
});

arrowItemsUp.forEach((item) => {
  item.addEventListener("mouseenter", () => cursor.setIcon("icon-arrow-up"));
  item.addEventListener("mouseleave", () => cursor.removeIcon());
});

arrowItems.forEach((item) => {
  item.addEventListener("mouseenter", () => cursor.setIcon("icon-arrow-right"));
  item.addEventListener("mouseleave", () => cursor.removeIcon());
});

export default cursor;
