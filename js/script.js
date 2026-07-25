(function () {
  var header = document.getElementById("site-header");
  var menuButton = document.getElementById("menu-button");
  var nav = document.getElementById("site-nav");

  function updateHeader() {
    header.classList.toggle("scrolled", window.scrollY > 32);
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

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

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
  var newsletter = document.getElementById("newsletter");
  var depthPanels = document.querySelectorAll(".depth-panel");
  var motionAllowed = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var ticking = false;

  function updateDepth() {
    if (!motionAllowed) {
      ticking = false;
      return;
    }

    var viewportCenter = window.innerHeight / 2;

    if (about) {
      var aboutRect = about.getBoundingClientRect();
      var aboutDistance = aboutRect.top + aboutRect.height / 2 - viewportCenter;
      var aboutProgress = Math.max(-1, Math.min(1, aboutDistance / window.innerHeight));
      about.style.setProperty("--portrait-shift", (aboutProgress * 18).toFixed(1) + "px");
      about.style.setProperty("--about-shift", (aboutProgress * -32).toFixed(1) + "px");
    }

    if (newsletter) {
      var newsletterRect = newsletter.getBoundingClientRect();
      var newsletterDistance = newsletterRect.top + newsletterRect.height / 2 - viewportCenter;
      var newsletterProgress = Math.max(-1, Math.min(1, newsletterDistance / window.innerHeight));
      newsletter.style.setProperty("--newsletter-shift", (newsletterProgress * 22).toFixed(1) + "px");
    }

    depthPanels.forEach(function (panel) {
      var panelRect = panel.getBoundingClientRect();
      var panelDistance = panelRect.top + panelRect.height / 2 - viewportCenter;
      var panelProgress = Math.max(-1, Math.min(1, panelDistance / window.innerHeight));
      panel.style.setProperty("--panel-shift", (panelProgress * -20).toFixed(1) + "px");
    });

    ticking = false;
  }

  function requestDepthUpdate() {
    if (!ticking) {
      window.requestAnimationFrame(updateDepth);
      ticking = true;
    }
  }

  if ((about || newsletter || depthPanels.length) && motionAllowed) {
    window.addEventListener("scroll", requestDepthUpdate, { passive: true });
    window.addEventListener("resize", requestDepthUpdate);
    requestDepthUpdate();
  }

  document.getElementById("year").textContent = new Date().getFullYear();
})();
