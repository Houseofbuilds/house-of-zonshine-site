(function () {
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll("[data-cycle-images]").forEach(function (image) {
    var sources = image.dataset.cycleImages.split("|");
    if (sources.length < 2) return;

    var card = image.closest("[data-obsession-card]");
    var imageLink = image.closest(".obsession-card-image");
    var cycleTimer = null;
    var transitionTimer = null;
    var index = 0;
    var preloaded = false;
    var pointerId = null;
    var startX = 0;
    var startY = 0;
    var startTime = 0;
    var dragX = 0;
    var dragAxis = null;
    var suppressClick = false;

    function preloadAlternates() {
      if (preloaded) return;
      preloaded = true;

      sources.slice(1).forEach(function (source) {
        var preload = new Image();
        preload.decoding = "async";
        preload.src = source;
      });
    }

    function cycle(step) {
      window.clearTimeout(transitionTimer);
      index = (index + step + sources.length) % sources.length;
      image.classList.add("is-changing");

      transitionTimer = window.setTimeout(function () {
        image.src = sources[index];
        image.classList.remove("is-changing");
      }, reducedMotion ? 0 : 120);
    }

    function resetTouchDrag(commitDirection) {
      if (dragAxis === "x" && Math.abs(dragX) >= 10) {
        suppressClick = true;
        window.setTimeout(function () {
          suppressClick = false;
        }, 350);
      }

      image.classList.remove("is-touch-dragging");
      image.style.removeProperty("transform");
      image.style.removeProperty("opacity");

      if (commitDirection) cycle(commitDirection);

      pointerId = null;
      dragX = 0;
      dragAxis = null;
    }

    if (finePointer && !reducedMotion) {
      card.addEventListener("mouseenter", function () {
        preloadAlternates();
        cycleTimer = window.setInterval(function () {
          cycle(1);
        }, 1400);
      });

      card.addEventListener("mouseleave", function () {
        window.clearInterval(cycleTimer);
        window.clearTimeout(transitionTimer);
        index = 0;
        image.src = sources[0];
        image.classList.remove("is-changing");
      });
    }

    if (!imageLink) return;

    imageLink.addEventListener("pointerdown", function (event) {
      if (event.pointerType !== "touch") return;

      pointerId = event.pointerId;
      startX = event.clientX;
      startY = event.clientY;
      startTime = event.timeStamp;
      dragX = 0;
      dragAxis = null;
      imageLink.setPointerCapture(event.pointerId);
    });

    imageLink.addEventListener("pointermove", function (event) {
      if (event.pointerId !== pointerId) return;

      var deltaX = event.clientX - startX;
      var deltaY = event.clientY - startY;

      if (!dragAxis && Math.max(Math.abs(deltaX), Math.abs(deltaY)) >= 10) {
        dragAxis = Math.abs(deltaX) > Math.abs(deltaY) * 1.15 ? "x" : "y";
        if (dragAxis === "x") image.classList.add("is-touch-dragging");
      }

      if (dragAxis !== "x") return;

      event.preventDefault();
      dragX = deltaX;
      var progress = Math.min(Math.abs(deltaX) / imageLink.clientWidth, 1);
      image.style.transform = "translateX(" + deltaX + "px) scale(" + (1 + progress * 0.015) + ")";
      image.style.opacity = String(1 - progress * 0.3);
    });

    imageLink.addEventListener("pointerup", function (event) {
      if (event.pointerId !== pointerId) return;

      var elapsed = Math.max(event.timeStamp - startTime, 1);
      var velocity = dragX / elapsed;
      var crossedDistance = Math.abs(dragX) >= imageLink.clientWidth * 0.18;
      var flicked = Math.abs(velocity) >= 0.45;
      var direction = dragAxis === "x" && (crossedDistance || flicked)
        ? (dragX < 0 ? 1 : -1)
        : 0;

      resetTouchDrag(direction);
    });

    imageLink.addEventListener("pointercancel", function (event) {
      if (event.pointerId === pointerId) resetTouchDrag(0);
    });

    imageLink.addEventListener("click", function (event) {
      if (!suppressClick) return;
      event.preventDefault();
      event.stopPropagation();
      suppressClick = false;
    });
  });
}());
