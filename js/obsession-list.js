(function () {
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!finePointer || reducedMotion) return;

  document.querySelectorAll("[data-cycle-images]").forEach(function (image) {
    var sources = image.dataset.cycleImages.split("|");
    if (sources.length < 2) return;
    var timer;
    var index = 0;

    sources.forEach(function (source) {
      var preload = new Image();
      preload.src = source;
    });

    function cycle() {
      index = (index + 1) % sources.length;
      image.classList.add("is-changing");
      window.setTimeout(function () {
        image.src = sources[index];
        image.classList.remove("is-changing");
      }, 120);
    }

    var card = image.closest("[data-obsession-card]");
    card.addEventListener("mouseenter", function () {
      cycle();
      timer = window.setInterval(cycle, 560);
    });
    card.addEventListener("mouseleave", function () {
      window.clearInterval(timer);
      index = 0;
      image.src = sources[0];
      image.classList.remove("is-changing");
    });
  });
}());
