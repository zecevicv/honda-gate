/* #Header Menu
  ======================================================= */
const body = document.querySelector('body');
const header = document.querySelector('.header');
const headerHamburger = document.querySelector('.header-hamburger');

if (headerHamburger) {
  headerHamburger.addEventListener('click', (e) => {
    header.classList.toggle('show');
    body.classList.toggle('no-scroll');
  })
}

/* #Video playing on hover
  ======================================================= */
const gates = document.querySelectorAll('.honda-gate-main .gate');

if (gates && window.innerWidth >= 1024) {
  gates.forEach((gate) => {
    const gateVideo = gate.querySelector('video');
    const gateVideoProgress = gate.querySelector('.progress-line');

    const gateVideoProgressTl = gsap.timeline({paused: true});
    gateVideoProgressTl.to(gateVideoProgress, {
      width: '100%',
      duration: 10,
      ease: 'none'
    });
    
    gate.addEventListener('mouseenter', (e) => {
      gateVideo.currentTime = 0;
      gateVideo.play();

      gateVideoProgressTl.play();
    });

    gate.addEventListener('mouseleave', (e) => {
      gateVideo.pause();

      gateVideoProgressTl.restart();
      gateVideoProgressTl.pause();
    });
  });
}
