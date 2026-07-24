// Intro sequence: name on screen ~2s, then fades out to reveal the hero video.
// Plays once per visit session; skipped for reduced-motion users (handled in CSS).
(function () {
  var intro = document.getElementById('intro');
  if (!intro) return;

  var seen = sessionStorage.getItem('hoz-intro-seen');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (seen || reducedMotion) {
    intro.classList.add('intro-skip');
    return;
  }

  document.body.style.overflow = 'hidden';
  setTimeout(function () {
    intro.classList.add('intro-out');
    document.body.style.overflow = '';
    sessionStorage.setItem('hoz-intro-seen', '1');
    setTimeout(function () { intro.classList.add('intro-skip'); }, 1000);
  }, 2600);
})();

// Mobile nav toggle
(function () {
  var toggle = document.getElementById('nav-toggle');
  var links = document.getElementById('nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

// TODO: once the Compass newsletter signup link is confirmed, set it here
// document.getElementById('newsletter-link').href = 'https://...';
