import gsap from 'gsap';

// TODO: Improve video work logic
export default class Video {
  constructor() {
    this.video = select('#video');
    this.videoOverlay = select('#video-overlay');
    this.videoControls = select('#video-controls');
    this.videoPoster = select('#video-poster');

    this.timeElapsed = select('#time-elapsed');
    this.duration = select('#duration');
    this.progressBar = select('#progress-bar');

    this.seek = select('#seek');
    this.seekTooltip = select('#seek-tooltip');
    if (this.video && this.video.readyState > 2) {
      this.start();
    }
    if (this.video)
      this.video.addEventListener('loadedmetadata', () => {
        this.start();
      });
  }

  start = () => {
    if (this.videoPoster) {
    } else {
      this.video.play();
    }

    const videoDuration = Math.round(this.video.duration);
    const time = this.formatTime(videoDuration);

    duration.innerText = `${time.minutes}:${time.seconds}`;
    duration.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`);

    this.seek.setAttribute('max', videoDuration);
    this.progressBar.setAttribute('max', videoDuration);

    this.video.addEventListener('timeupdate', () => {
      this.updateProgress();
      this.updateTimeElapsed();
    });

    this.seek.addEventListener('mousemove', this.updateSeekTooltip);

    this.seek.addEventListener('input', this.skipAhead);

    gsap.set(this.videoControls, { yPercent: 100 });

    let active = false;

    this.videoOverlay.addEventListener('click', () => {
      active = !active;
      if (active) {
        this.video.muted = false;
        cursor.setText('Pause');
        this.video.play();
        gsap.to(this.videoControls, { yPercent: 0, duration: 0.6, ease: 'power3.out' });
        gsap.to(this.videoOverlay, { opacity: 0, duration: 0.6, ease: 'power3.out' });
        gsap.to(this.videoPoster, { opacity: 0, duration: 0.6, ease: 'power3.out' });
      } else {
        cursor.setText('Play');
        this.video.pause();
        gsap.to(this.videoControls, { yPercent: 100, duration: 0.6, ease: 'power3.out' });
        gsap.to(this.videoOverlay, { opacity: 0.3, duration: 0.6, ease: 'power3.out' });
        gsap.to(this.videoPoster, { opacity: 1, duration: 0.6, ease: 'power3.out' });
      }
    });

    this.videoOverlay.addEventListener('mouseenter', () => {
      cursor.setText(active ? 'Pause' : 'Play');
    });

    this.videoOverlay.addEventListener('mouseleave', () => {
      cursor.removeText();
    });
  };

  updateProgress = () => {
    this.seek.value = Math.floor(this.video.currentTime);
    this.progressBar.value = Math.floor(this.video.currentTime);
  };

  updateTimeElapsed = () => {
    const time = this.formatTime(Math.round(this.video.currentTime));
    this.timeElapsed.innerText = `${time.minutes}:${time.seconds}`;
    this.timeElapsed.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`);
  };

  updateSeekTooltip = (event) => {
    const skipTo = Math.round(
      (event.offsetX / event.target.clientWidth) * parseInt(event.target.getAttribute('max'), 10)
    );
    this.seek.setAttribute('data-seek', skipTo);
    const t = this.formatTime(skipTo);
    this.seekTooltip.textContent = `${t.minutes}:${t.seconds}`;
    const rect = this.video.getBoundingClientRect();
    this.seekTooltip.style.left = `${event.pageX - rect.left}px`;
  };
  skipAhead = (event) => {
    const skipTo = event.target.dataset.seek ? event.target.dataset.seek : event.target.value;
    this.video.currentTime = skipTo;
    this.progressBar.value = skipTo;
    this.seek.value = skipTo;
  };

  formatTime = (timeInSeconds) => {
    const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);

    return {
      minutes: result.substr(3, 2),
      seconds: result.substr(6, 2),
    };
  };
}
