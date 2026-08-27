(function () {
  var header = document.getElementById("site-header");
  var menuButton = document.getElementById("menu-button");
  var nav = document.getElementById("site-nav");
  var main = document.querySelector("main");
  var footer = document.querySelector("footer");
  var mobileNavigation = window.matchMedia("(max-width: 900px)");
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

  function setPageBehindMenuInert(inert) {
    if (main) main.inert = inert;
    if (footer) footer.inert = inert;
  }

  function syncMenuAvailability() {
    var mobile = mobileNavigation.matches;
    var open = mobile && nav.classList.contains("open");
    nav.inert = mobile && !open;
    if (mobile) {
      nav.setAttribute("aria-hidden", String(!open));
    } else {
      nav.removeAttribute("aria-hidden");
      nav.inert = false;
      setPageBehindMenuInert(false);
    }
  }

  function closeMenu(returnFocus) {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.querySelector(".sr-only").textContent = "Open menu";
    document.body.classList.remove("menu-open");
    setPageBehindMenuInert(false);
    syncMenuAvailability();
    if (returnFocus) menuButton.focus();
  }

  menuButton.addEventListener("click", function () {
    var open = !nav.classList.contains("open");
    nav.classList.toggle("open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.querySelector(".sr-only").textContent = open ? "Close menu" : "Open menu";
    document.body.classList.toggle("menu-open", open);
    setPageBehindMenuInert(open);
    syncMenuAvailability();
    if (open) nav.querySelector("a").focus();
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () { closeMenu(false); });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && nav.classList.contains("open")) {
      closeMenu(true);
    }
  });

  mobileNavigation.addEventListener("change", function () {
    closeMenu(false);
    syncMenuAvailability();
  });
  syncMenuAvailability();

  document.querySelectorAll(".skip-link").forEach(function (link) {
    var target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    target.setAttribute("tabindex", "-1");
    link.addEventListener("click", function () {
      window.setTimeout(function () { target.focus({ preventScroll: true }); }, 0);
    });
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
    var testimonialPause = testimonialCarousel.querySelector(".testimonial-pause");
    var testimonialCurrent = testimonialCarousel.querySelector(".testimonial-current");
    var testimonialTotal = testimonialCarousel.querySelector(".testimonial-total");
    var testimonialIndex = 0;
    var testimonialAutoplayDelay = 3000;
    var testimonialTimer = null;
    var testimonialIsVisible = false;
    var testimonialIsInteracting = false;
    var testimonialIsPaused = !motionAllowed;

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
        testimonialIsPaused ||
        !motionAllowed ||
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

    function updateTestimonialPauseControl() {
      testimonialPause.setAttribute("aria-pressed", String(testimonialIsPaused));
      testimonialPause.textContent = testimonialIsPaused ? "Play reviews" : "Pause reviews";
    }

    testimonialPause.addEventListener("click", function () {
      testimonialIsPaused = !testimonialIsPaused;
      updateTestimonialPauseControl();
      if (testimonialIsPaused) stopTestimonialAutoplay();
      else startTestimonialAutoplay();
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

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        stopTestimonialAutoplay();
      } else {
        startTestimonialAutoplay();
      }
    });

    var testimonialObserver = new IntersectionObserver(function (entries) {
      testimonialIsVisible = entries[0].isIntersecting;
      startTestimonialAutoplay();
    }, { threshold: 0.1 });

    testimonialObserver.observe(testimonialCarousel);

    var testimonialTouchId = null;
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

      testimonialTouchId = null;
      testimonialDragCard = null;
      testimonialDragX = 0;
      testimonialSwipeAxis = null;
      testimonialIsInteracting = false;
      startTestimonialAutoplay();
    }

    function findTestimonialTouch(touchList) {
      for (var touchIndex = 0; touchIndex < touchList.length; touchIndex += 1) {
        if (touchList[touchIndex].identifier === testimonialTouchId) {
          return touchList[touchIndex];
        }
      }
      return null;
    }

    testimonialStage.addEventListener("touchstart", function (event) {
      if (testimonialTouchId !== null || event.touches.length !== 1) return;

      var touch = event.changedTouches[0];
      testimonialTouchId = touch.identifier;
      testimonialDragCard = testimonialCards[testimonialIndex];
      testimonialStartX = touch.clientX;
      testimonialStartY = touch.clientY;
      testimonialStartTime = event.timeStamp;
      testimonialDragX = 0;
      testimonialSwipeAxis = null;
      testimonialIsInteracting = true;
      stopTestimonialAutoplay();
    }, { passive: true });

    testimonialStage.addEventListener("touchmove", function (event) {
      if (testimonialTouchId === null || !testimonialDragCard) return;
      if (event.touches.length !== 1) {
        finishTestimonialSwipe(0);
        return;
      }

      var touch = findTestimonialTouch(event.touches);
      if (!touch) return;

      var deltaX = touch.clientX - testimonialStartX;
      var deltaY = touch.clientY - testimonialStartY;

      if (!testimonialSwipeAxis && Math.max(Math.abs(deltaX), Math.abs(deltaY)) >= 10) {
        testimonialSwipeAxis = Math.abs(deltaX) > Math.abs(deltaY) * 1.15 ? "x" : "y";
        if (testimonialSwipeAxis === "x") testimonialStage.classList.add("is-dragging");
      }

      if (testimonialSwipeAxis !== "x") return;

      if (event.cancelable) event.preventDefault();
      testimonialDragX = deltaX;
      var dragProgress = Math.min(Math.abs(deltaX) / testimonialStage.clientWidth, 1);
      testimonialDragCard.style.transform = "translate(calc(-50% + " + deltaX + "px), -50%) scale(" + (1 - dragProgress * 0.05) + ")";
      testimonialDragCard.style.opacity = String(1 - dragProgress * 0.35);
    }, { passive: false });

    testimonialStage.addEventListener("touchend", function (event) {
      if (testimonialTouchId === null || !testimonialDragCard) return;
      if (!findTestimonialTouch(event.changedTouches)) return;

      var elapsed = Math.max(event.timeStamp - testimonialStartTime, 1);
      var velocity = testimonialDragX / elapsed;
      var crossedDistance = Math.abs(testimonialDragX) >= testimonialStage.clientWidth * 0.18;
      var flicked = Math.abs(velocity) >= 0.45;
      var direction = testimonialSwipeAxis === "x" && (crossedDistance || flicked)
        ? (testimonialDragX < 0 ? 1 : -1)
        : 0;

      finishTestimonialSwipe(direction);
    });

    testimonialStage.addEventListener("touchcancel", function (event) {
      if (testimonialTouchId !== null && findTestimonialTouch(event.changedTouches)) {
        finishTestimonialSwipe(0);
      }
    });

    updateTestimonialPauseControl();
    showTestimonial(0);
  }

  document.querySelectorAll(".story-more-button").forEach(function (button) {
    button.closest(".story-copy").classList.add("is-collapsible");

    button.addEventListener("click", function () {
      var isExpanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!isExpanded));
      button.querySelector(".story-more-label").textContent = isExpanded ? "Read More" : "Show Less";
    });
  });

  document.querySelectorAll("form[data-accessible-form]").forEach(function (form, formIndex) {
    form.noValidate = true;
    var summary = form.querySelector(".form-error-summary");
    var status = form.querySelector(".form-status");
    var submitButton = form.querySelector('[type="submit"]');
    var fields = Array.from(form.querySelectorAll("input:not([type=hidden]), select, textarea"));

    fields.forEach(function (field, fieldIndex) {
      if (!field.id) field.id = "form-" + formIndex + "-field-" + fieldIndex;
      var label = field.labels && field.labels[0];
      field.dataset.accessibleLabel = label
        ? label.textContent.replace(/\s*\*\s*/g, " ").replace(/\s*\(required\)\s*/g, " ").trim()
        : field.name || "This field";
    });

    function removeFieldError(field) {
      var error = document.getElementById(field.id + "-error");
      if (error) error.remove();
      field.removeAttribute("aria-invalid");
      var describedBy = (field.getAttribute("aria-describedby") || "")
        .split(/\s+/)
        .filter(function (id) { return id && id !== field.id + "-error"; });
      if (describedBy.length) field.setAttribute("aria-describedby", describedBy.join(" "));
      else field.removeAttribute("aria-describedby");
    }

    function messageFor(field) {
      var label = field.dataset.accessibleLabel;
      if (field.validity.valueMissing) return label + " is required.";
      if (field.validity.typeMismatch && field.type === "email") return "Enter a valid email address.";
      return "Check " + label + " and try again.";
    }

    function showFieldError(field, message) {
      removeFieldError(field);
      var error = document.createElement("span");
      error.className = "field-error";
      error.id = field.id + "-error";
      error.textContent = message;
      if (field.type === "checkbox" && field.labels && field.labels[0]) {
        field.labels[0].insertAdjacentElement("afterend", error);
      } else {
        field.insertAdjacentElement("afterend", error);
      }
      field.setAttribute("aria-invalid", "true");
      field.setAttribute("aria-describedby", [field.getAttribute("aria-describedby"), error.id].filter(Boolean).join(" "));
    }

    fields.forEach(function (field) {
      ["input", "change"].forEach(function (eventName) {
        field.addEventListener(eventName, function () {
          if (field.validity.valid) removeFieldError(field);
        });
      });
    });

    form.addEventListener("submit", function (event) {
      var invalid = fields.filter(function (field) { return !field.validity.valid; });
      fields.forEach(removeFieldError);

      if (invalid.length) {
        event.preventDefault();
        var list = document.createElement("ul");
        invalid.forEach(function (field) {
          var message = messageFor(field);
          showFieldError(field, message);
          var item = document.createElement("li");
          var link = document.createElement("a");
          link.href = "#" + field.id;
          link.textContent = message;
          link.addEventListener("click", function (clickEvent) {
            clickEvent.preventDefault();
            field.focus();
          });
          item.appendChild(link);
          list.appendChild(item);
        });
        summary.replaceChildren(Object.assign(document.createElement("p"), { textContent: "Please correct the following:" }), list);
        summary.hidden = false;
        summary.focus();
        if (status) status.textContent = "";
        return;
      }

      summary.hidden = true;
      if (submitButton) {
        submitButton.setAttribute("aria-disabled", "true");
        submitButton.dataset.originalText = submitButton.textContent;
        submitButton.textContent = "Sending…";
      }
      if (status) status.textContent = "Your information is being submitted.";
    });
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
