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
const gatesEl = document.querySelector('.honda-gate-main .gates');
const gatesArray = [];
gates.forEach((gate) => {
  gatesArray.push(gate);
})
const gatesProgresses = document.querySelectorAll('.honda-gate-main .progress-line');

if (gates && window.innerWidth >= 1024) {

  // Adding to Arrays
  const gatesVideos = [];
  gates.forEach((gate) => {
    const gateVideo = gate.querySelector('video');
    gatesVideos.push(gateVideo);
  });

  // Play video and progress bar function
  const playGate = (index) => {
    gates.forEach((gate, ind) => {
      const gateProgress = gate.querySelector('.progress-line');

      // Reset everything to default
      gate.classList.remove('active');
      gatesVideos[ind].currentTime = 0;
      gatesVideos[ind].pause();

      gsap.set(gateProgress, {
        width: '0',
      });

      // Play video
      if (ind == index) {
        gate.classList.add('active');
        gatesVideos[index].currentTime = 0;
        gatesVideos[index].play();
        const videoDuration = gatesVideos[ind].duration;

        gsap.set(gateProgress, {
          width: '0',
        });
        gsap.to(gateProgress, {
          width: '100%',
          duration: 10,
          ease: 'none'
        });
      }
    });
  };

  // Playing 2 different cases
  // One when mouse is over elements (playing video that's hovered)
  // Second autoplay of videos
  let gateIndex = 0;
  let gatesHovered = false;

  // Initial call
  playGate(0);

  document.addEventListener('mousemove', (e) => {
    // Mouse over gates elements
    if (e.target.closest('.honda-gate-main')) {
      const hoveredGate = e.target.closest('.gate');
      gatesHovered = true;

      if (gateIndex != gatesArray.indexOf(hoveredGate)) {
        gateIndex = gatesArray.indexOf(hoveredGate);
        playGate(gatesArray.indexOf(hoveredGate));
      }

    } else {
      gatesHovered = false;
    }
  });

  // Video status event listeners
  gatesVideos.forEach((video) => {
    video.addEventListener('ended', (e) => {
      if (!gatesHovered) {
        if (gateIndex == gates.length - 1) {
          gateIndex = 0;
        } else {
          gateIndex++;
        }
        playGate(gateIndex);
      }
    })
  });

}