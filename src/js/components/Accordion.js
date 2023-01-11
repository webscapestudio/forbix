import gsap from 'gsap';

export default class Accordion {
  constructor() {
    this.accordions = selectAll('.accordion');
    this.accordionsPrimary = selectAll('.accordion-primary');

    this.active = 0;
    this.activePrimary = 0;

    if (this.accordions.length) this.init();
    if (this.accordionsPrimary.length) this.accordionsPrimaryInit();
  }

  init = () => {
    // let activeAccordion = this.accordions[this.active];
    // let activeContent = select('.accordion__content', activeAccordion);

    // activeAccordion.classList.add('active');

    // gsap.set(activeContent, {
    //   height: activeContent.scrollHeight,
    //   paddingTop: 28,
    // });

    this.start();
  };

  start = () => {
    this.accordions.forEach((acc) => {
      const header = select('.accordion__header', acc);
      header.addEventListener('click', (e) => {
        e.target.closest('.accordion').classList.add('opened');
        if (e.currentTarget.nextElementSibling.offsetHeight) {
          gsap.to(selectAll('.accordion__content'), {
            height: 0,
            paddingTop: 0,
          });
          e.target.closest('.accordion').classList.remove('active');
        } else {
          this.accordions.forEach((item) => {
            item.classList.remove('active');

            gsap.to(select('.accordion__content', item), {
              height: 0,
              paddingTop: 0,
              duration: 0.6,
              ease: 'power3.out',
            });
          });

          e.currentTarget.parentNode.classList.add('active');
          gsap.to(e.currentTarget.nextElementSibling, {
            height: e.currentTarget.nextElementSibling.scrollHeight + 28,
            paddingTop: 28,
            duration: 0.6,
            ease: 'power3.out',
          });
        }
      });
    });
  };

  accordionsPrimaryInit = () => {
    this.accordionPrimaryStart();
  };

  // TODO: accordion animation
  accordionPrimaryStart = () => {
    this.accordionsPrimary.forEach((acc) => {
      acc.addEventListener('click', (e) => {
        if (select('.accordion-primary__content', e.currentTarget).offsetHeight) {
          gsap.to(selectAll('.accordion-primary__content'), {
            height: 0,
          });
          gsap.to(selectAll('.accordion-primary__icon'), {
            rotate: 0,
          });
          e.target.closest('.accordion-primary').classList.remove('active');
        } else {
          this.accordionsPrimary.forEach((item) => {
            item.classList.remove('active');

            gsap.to(select('.accordion-primary__content', item), {
              height: 0,
              duration: 0.6,
              ease: 'power3.out',
            });

            gsap.to(select('.accordion-primary__icon', item), {
              rotate: 0,
              duration: 0.4,
              ease: 'power3.out',
            });
          });

          e.currentTarget.classList.add('active');
          gsap.to(select('.accordion-primary__content', e.currentTarget), {
            height: select('.accordion-primary__content', e.currentTarget).scrollHeight,
            duration: 0.6,
            ease: 'power3.out',
          });

          gsap.to(select('.accordion-primary__icon', e.currentTarget), {
            rotate: 135,
            duration: 0.4,
            ease: 'power3.out',
          });
        }
      });
    });
  };
}
