import gsap, { Power4, Power2, Elastic } from 'gsap';

export default class ButtonMagnet {
  constructor() {
    this.els = document.querySelectorAll('.js-magnet-btn');

    if (this.els.length && window.innerWidth >= 1024) {
      this.magnet();
      this.fill();
    }

    window.onresize = () => {
      if (this.els.length && window.innerWidth >= 1024) {
        this.magnet();
        this.fill();
      }
    };
  }

  round = (el) => {
    // console.log(el.getBoundingClientRect());
    const svgTrack = el.querySelector('.svg-indicator-track');
    const svgIndication = el.querySelector('.svg-indicator-indication');

    const size = el.offsetWidth;

    const strokeWidth = 1;
    const center = size / 2;
    const radius = center - strokeWidth;
    let initialProgress = 0;

    let arcLength = 2 * Math.PI * radius;
    let arcOffset = arcLength * ((100 - initialProgress) / 100);

    gsap.set(svgTrack, {
      strokeWidth,
      fill: 'transparent',
      attr: { r: radius >= 0 ? radius : 0, cx: center, cy: center },
    });

    gsap.set(svgIndication, {
      strokeWidth,
      fill: 'transparent',
      strokeDasharray: arcLength,
      strokeDashoffset: arcOffset,
      attr: { r: radius >= 0 ? radius : 0, cx: center, cy: center },
    });

    function drawRound(progress) {
      gsap.to(svgIndication, {
        strokeDashoffset: arcLength * ((100 - progress) / 100),
        duration: 1,
        ease: 'power3.out',
      });
    }

    el.addEventListener('mouseenter', () => drawRound(100));
    el.addEventListener('mouseleave', () => drawRound(0));
  };

  magnet = () => {
    this.els.forEach((button) => {
      if (button.classList.contains('button-round')) {
        setTimeout(() => {
          this.round(button);
        }, 200);
      }
      // Magnet effect start
      button.addEventListener('mousemove', (event) => {
        const rect = button.getBoundingClientRect();

        gsap.to(button, {
          x: ((event.clientX - rect.left) / button.offsetWidth - 0.5) * 30,
          y: ((event.clientY - rect.top) / button.offsetHeight - 0.5) * 30,
          rotate: '0.001deg',
          ease: Power4.easeOut,
          duration: 1.5,
        });

        if (button.querySelector('.js-magnet-btn-text')) {
          gsap.to(button.querySelector('.js-magnet-btn-text'), {
            x: ((event.clientX - rect.left) / button.offsetWidth - 0.5) * 15,
            y: ((event.clientY - rect.top) / button.offsetHeight - 0.5) * 15,
            rotate: '0.001deg',
            ease: Power4.easeOut,
            duration: 1.5,
          });
        }
      });

      // Magnet effect leave
      button.addEventListener('mouseleave', () => {
        gsap.to(button, { x: 0, y: 0, ease: Elastic.easeOut, duration: 1.5 });

        if (button.querySelector('.js-magnet-btn-text'))
          gsap.to(button.querySelector('.js-magnet-btn-text'), {
            x: 0,
            y: 0,
            ease: Elastic.easeOut,
            duration: 1.5,
          });
      });
    });
  };

  fill = () => {
    this.els.forEach((button) => {
      if (button.querySelector('.button__fill')) {
        gsap.set(button.querySelector('.button__fill'), { yPercent: 80 });

        // Fill effect start
        button.addEventListener('mouseenter', () => {
          gsap.fromTo(
            button.querySelector('.button__fill'),
            { yPercent: 80 },
            { yPercent: 0, duration: 0.6, ease: Power2.easeInOut }
          );
        });

        // Fill effect leave
        button.addEventListener('mouseleave', () => {
          gsap.to(button.querySelector('.button__fill'), { yPercent: -80, duration: 0.6, ease: Power2.easeInOut });
        });
      }
    });
  };
}
