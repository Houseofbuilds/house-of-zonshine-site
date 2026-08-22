(function () {
  var header = document.getElementById("site-header");
  var menuButton = document.getElementById("menu-button");
  var nav = document.getElementById("site-nav");
  var headerTicking = false;
  var headerScrolled = null;

  function updateHeader() {
    var nextHeaderScrolled = window.scrollY > 32;
    if (nextHeaderScrolled !== headerScrolled) {
      header.classList.toggle("scrolled", nextHeaderScrolled);
      headerScrolled = nextHeaderScrolled;
    }
    headerTicking = false;
  }

  function requestHeaderUpdate() {
    if (!headerTicking) {
      window.requestAnimationFrame(updateHeader);
      headerTicking = true;
    }
  }

  function closeMenu() {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }

  menuButton.addEventListener("click", function () {
    var open = !nav.classList.contains("open");
    nav.classList.toggle("open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("scroll", requestHeaderUpdate, { passive: true });
  updateHeader();

  window.addEventListener("load", function () {
    if (!window.location.hash) return;
    var hashTarget = document.getElementById(window.location.hash.slice(1));
    if (hashTarget) {
      window.requestAnimationFrame(function () {
        hashTarget.scrollIntoView({ block: "start" });
      });
    }
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll(".reveal").forEach(function (section) {
    observer.observe(section);
  });

  var about = document.getElementById("about");
  var depthPanels = document.querySelectorAll(".depth-panel");
  var motionAllowed = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var desktopDepth = window.matchMedia("(min-width: 901px)");
  var depthActive = motionAllowed && desktopDepth.matches;
  var ticking = false;
  var heroVideo = document.querySelector(".hero video");
  var heroIsVisible = true;

  function syncHeroPlayback() {
    if (!heroVideo) return;

    if (!heroIsVisible || document.hidden || !motionAllowed) {
      heroVideo.pause();
      return;
    }

    var playPromise = heroVideo.play();
    if (playPromise) playPromise.catch(function () {});
  }

  if (heroVideo) {
    var heroObserver = new IntersectionObserver(function (entries) {
      heroIsVisible = entries[0].isIntersecting && entries[0].intersectionRatio >= 0.12;
      syncHeroPlayback();
    }, { threshold: [0, 0.12] });

    heroObserver.observe(heroVideo.closest(".hero"));
    document.addEventListener("visibilitychange", syncHeroPlayback);
    syncHeroPlayback();
  }

  function isNearViewport(rect) {
    return rect.bottom > -window.innerHeight && rect.top < window.innerHeight * 2;
  }

  function resetDepth() {
    if (about) {
      about.style.removeProperty("--about-shift");
    }

    depthPanels.forEach(function (panel) {
      panel.style.removeProperty("--panel-shift");
    });
  }

  function updateDepth() {
    if (!depthActive) {
      ticking = false;
      return;
    }

    var viewportCenter = window.innerHeight / 2;

    if (about) {
      var aboutRect = about.getBoundingClientRect();
      if (isNearViewport(aboutRect)) {
        var aboutDistance = aboutRect.top + aboutRect.height / 2 - viewportCenter;
        var aboutProgress = Math.max(-1, Math.min(1, aboutDistance / window.innerHeight));
        about.style.setProperty("--about-shift", Math.round(aboutProgress * -32) + "px");
      }
    }

    depthPanels.forEach(function (panel) {
      var panelRect = panel.getBoundingClientRect();
      if (isNearViewport(panelRect)) {
        var panelDistance = panelRect.top + panelRect.height / 2 - viewportCenter;
        var panelProgress = Math.max(-1, Math.min(1, panelDistance / window.innerHeight));
        panel.style.setProperty("--panel-shift", Math.round(panelProgress * -20) + "px");
      }
    });

    ticking = false;
  }

  function requestDepthUpdate() {
    if (depthActive && !ticking) {
      window.requestAnimationFrame(updateDepth);
      ticking = true;
    }
  }

  if ((about || depthPanels.length) && motionAllowed) {
    window.addEventListener("scroll", requestDepthUpdate, { passive: true });
    window.addEventListener("resize", requestDepthUpdate);

    desktopDepth.addEventListener("change", function (event) {
      depthActive = event.matches;
      if (depthActive) {
        requestDepthUpdate();
      } else {
        resetDepth();
      }
    });

    requestDepthUpdate();
  }

  var testimonialCarousel = document.querySelector(".testimonials-carousel");

  if (testimonialCarousel) {
    var testimonialCards = Array.from(testimonialCarousel.querySelectorAll(".testimonial-card"));
    var testimonialStage = testimonialCarousel.querySelector(".testimonial-stage");
    var testimonialPrevious = testimonialCarousel.querySelector(".testimonial-previous");
    var testimonialNext = testimonialCarousel.querySelector(".testimonial-next");
    var testimonialCurrent = testimonialCarousel.querySelector(".testimonial-current");
    var testimonialTotal = testimonialCarousel.querySelector(".testimonial-total");
    var testimonialIndex = 0;
    var testimonialAutoplayDelay = 4000;
    var testimonialTimer = null;
    var testimonialIsVisible = false;
    var testimonialIsInteracting = false;
    var testimonialReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    testimonialTotal.textContent = String(testimonialCards.length).padStart(2, "0");

    function stopTestimonialAutoplay() {
      window.clearTimeout(testimonialTimer);
      testimonialTimer = null;
    }

    function startTestimonialAutoplay() {
      stopTestimonialAutoplay();

      if (
        !testimonialIsVisible ||
        testimonialIsInteracting ||
        testimonialReducedMotion.matches ||
        document.hidden
      ) return;

      testimonialTimer = window.setTimeout(function () {
        showTestimonial(testimonialIndex + 1);
        startTestimonialAutoplay();
      }, testimonialAutoplayDelay);
    }

    function showTestimonial(nextIndex) {
      testimonialIndex = (nextIndex + testimonialCards.length) % testimonialCards.length;

      testimonialCards.forEach(function (card, index) {
        var offset = (index - testimonialIndex + testimonialCards.length) % testimonialCards.length;
        card.classList.toggle("is-active", offset === 0);
        card.classList.toggle("is-next", offset === 1);
        card.classList.toggle("is-prev", offset === testimonialCards.length - 1);
        card.setAttribute("aria-hidden", String(offset !== 0));
      });

      testimonialCurrent.textContent = String(testimonialIndex + 1).padStart(2, "0");
    }

    testimonialPrevious.addEventListener("click", function () {
      showTestimonial(testimonialIndex - 1);
      startTestimonialAutoplay();
    });

    testimonialNext.addEventListener("click", function () {
      showTestimonial(testimonialIndex + 1);
      startTestimonialAutoplay();
    });

    testimonialCarousel.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") {
        showTestimonial(testimonialIndex - 1);
        startTestimonialAutoplay();
      } else if (event.key === "ArrowRight") {
        showTestimonial(testimonialIndex + 1);
        startTestimonialAutoplay();
      }
    });

    testimonialCarousel.addEventListener("mouseenter", function () {
      testimonialIsInteracting = true;
      stopTestimonialAutoplay();
    });

    testimonialCarousel.addEventListener("mouseleave", function () {
      testimonialIsInteracting = false;
      startTestimonialAutoplay();
    });

    testimonialCarousel.addEventListener("focusin", function () {
      testimonialIsInteracting = true;
      stopTestimonialAutoplay();
    });

    testimonialCarousel.addEventListener("focusout", function (event) {
      if (!testimonialCarousel.contains(event.relatedTarget)) {
        testimonialIsInteracting = false;
        startTestimonialAutoplay();
      }
    });

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        stopTestimonialAutoplay();
      } else {
        startTestimonialAutoplay();
      }
    });

    testimonialReducedMotion.addEventListener("change", startTestimonialAutoplay);

    var testimonialObserver = new IntersectionObserver(function (entries) {
      testimonialIsVisible = entries[0].isIntersecting && entries[0].intersectionRatio >= 0.35;
      startTestimonialAutoplay();
    }, { threshold: 0.35 });

    testimonialObserver.observe(testimonialCarousel);

    var testimonialPointerId = null;
    var testimonialDragCard = null;
    var testimonialStartX = 0;
    var testimonialStartY = 0;
    var testimonialStartTime = 0;
    var testimonialDragX = 0;
    var testimonialSwipeAxis = null;

    function finishTestimonialSwipe(commitDirection) {
      if (!testimonialDragCard) return;

      var draggedCard = testimonialDragCard;
      testimonialStage.classList.remove("is-dragging");

      if (commitDirection) {
        showTestimonial(testimonialIndex + commitDirection);
      }

      window.requestAnimationFrame(function () {
        draggedCard.style.removeProperty("transform");
        draggedCard.style.removeProperty("opacity");
      });

      testimonialPointerId = null;
      testimonialDragCard = null;
      testimonialDragX = 0;
      testimonialSwipeAxis = null;
      testimonialIsInteracting = false;
      startTestimonialAutoplay();
    }

    testimonialStage.addEventListener("pointerdown", function (event) {
      if (event.pointerType !== "touch") return;

      testimonialPointerId = event.pointerId;
      testimonialDragCard = testimonialCards[testimonialIndex];
      testimonialStartX = event.clientX;
      testimonialStartY = event.clientY;
      testimonialStartTime = event.timeStamp;
      testimonialDragX = 0;
      testimonialSwipeAxis = null;
      testimonialIsInteracting = true;
      stopTestimonialAutoplay();
      testimonialStage.setPointerCapture(event.pointerId);
    });

    testimonialStage.addEventListener("pointermove", function (event) {
      if (event.pointerId !== testimonialPointerId || !testimonialDragCard) return;

      var deltaX = event.clientX - testimonialStartX;
      var deltaY = event.clientY - testimonialStartY;

      if (!testimonialSwipeAxis && Math.max(Math.abs(deltaX), Math.abs(deltaY)) >= 10) {
        testimonialSwipeAxis = Math.abs(deltaX) > Math.abs(deltaY) * 1.15 ? "x" : "y";
        if (testimonialSwipeAxis === "x") testimonialStage.classList.add("is-dragging");
      }

      if (testimonialSwipeAxis !== "x") return;

      event.preventDefault();
      testimonialDragX = deltaX;
      var dragProgress = Math.min(Math.abs(deltaX) / testimonialStage.clientWidth, 1);
      testimonialDragCard.style.transform = "translate(calc(-50% + " + deltaX + "px), -50%) scale(" + (1 - dragProgress * 0.05) + ")";
      testimonialDragCard.style.opacity = String(1 - dragProgress * 0.35);
    });

    testimonialStage.addEventListener("pointerup", function (event) {
      if (event.pointerId !== testimonialPointerId || !testimonialDragCard) return;

      var elapsed = Math.max(event.timeStamp - testimonialStartTime, 1);
      var velocity = testimonialDragX / elapsed;
      var crossedDistance = Math.abs(testimonialDragX) >= testimonialStage.clientWidth * 0.18;
      var flicked = Math.abs(velocity) >= 0.45;
      var direction = testimonialSwipeAxis === "x" && (crossedDistance || flicked)
        ? (testimonialDragX < 0 ? 1 : -1)
        : 0;

      finishTestimonialSwipe(direction);
    });

    testimonialStage.addEventListener("pointercancel", function (event) {
      if (event.pointerId === testimonialPointerId) finishTestimonialSwipe(0);
    });

    showTestimonial(0);
  }

  document.querySelectorAll(".story-more-button").forEach(function (button) {
    button.closest(".story-copy").classList.add("is-collapsible");

    button.addEventListener("click", function () {
      var isExpanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!isExpanded));
      button.querySelector(".story-more-label").textContent = isExpanded ? "Read the full story" : "Show less";
    });
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
