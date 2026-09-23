// Shared behavior for the Blog index and individual articles.
(function () {
  var button = document.getElementById("menu-button");
  var nav = document.getElementById("site-nav");

  if (button && nav) {
    button.addEventListener("click", function () {
      var open = !nav.classList.contains("open");
      nav.classList.toggle("open", open);
      button.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("menu-open", open);
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        button.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      });
    });
  }

  var footer = document.querySelector("footer");
  var footerMeta = footer && footer.querySelector(".footer-meta");
  var licensing = footerMeta && footerMeta.querySelector("p");

  if (licensing && !licensing.querySelector(".footer-compliance-marks")) {
    var marks = document.createElement("span");
    marks.className = "footer-compliance-marks";
    marks.setAttribute("aria-label", "Professional membership and equal housing commitment");

    [
      {
        alt: "REALTOR®, member of the National Association of REALTORS®",
        className: "footer-realtor-mark"
      },
      {
        alt: "Equal Housing Opportunity",
        className: "footer-equal-housing-mark"
      }
    ].forEach(function (mark) {
      var element = document.createElement("span");
      element.className = mark.className;
      element.setAttribute("role", "img");
      element.setAttribute("aria-label", mark.alt);
      marks.appendChild(element);
    });

    licensing.appendChild(marks);
  }

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var preferredSourceTarget = document.querySelector(".blog-index-description");
  var preferredSourceIsBlogIndex = Boolean(preferredSourceTarget);

  if (!preferredSourceTarget) {
    var articleCopies = document.querySelectorAll(".article-copy");
    preferredSourceTarget = articleCopies[articleCopies.length - 1];
  }

  if (preferredSourceTarget) {
    var preferredSourcePrompt = document.createElement("aside");
    preferredSourcePrompt.className = "preferred-source-prompt";
    preferredSourcePrompt.setAttribute("aria-label", "Google Preferred Sources");

    var preferredSourceTitle = document.createElement("p");
    preferredSourceTitle.className = "preferred-source-title";
    preferredSourceTitle.textContent = "Keep House of Zonshine in your Google results.";

    var preferredSourceCopy = document.createElement("p");
    preferredSourceCopy.className = "preferred-source-copy";
    preferredSourceCopy.textContent = "Choose this site as a preferred source so Google can highlight more of my writing for you.";

    var preferredSourceAction = document.createElement("div");
    preferredSourceAction.className = "preferred-source-action";

    var preferredSourceButton = document.createElement("div");
    preferredSourceButton.setAttribute("google-add-preferred-source-btn", "");
    preferredSourceButton.setAttribute("data-theme", "dark");

    var preferredSourceFallback = document.createElement("a");
    preferredSourceFallback.className = "preferred-source-fallback";
    preferredSourceFallback.href = "https://www.google.com/preferences/source?q=juliazonshine.com";
    preferredSourceFallback.textContent = "Add as a preferred source";

    preferredSourceAction.appendChild(preferredSourceButton);
    preferredSourceAction.appendChild(preferredSourceFallback);
    preferredSourcePrompt.appendChild(preferredSourceTitle);
    preferredSourcePrompt.appendChild(preferredSourceCopy);
    preferredSourcePrompt.appendChild(preferredSourceAction);
    if (preferredSourceIsBlogIndex) {
      preferredSourceTarget.insertAdjacentElement("afterend", preferredSourcePrompt);
    } else {
      preferredSourceTarget.appendChild(preferredSourcePrompt);
    }

    var showPreferredSourceFallback = function () {
      if (preferredSourceButton.hasAttribute("data-initialized")) {
        preferredSourceFallback.hidden = true;
      }
    };

    var preferredSourceScript = document.querySelector('script[src="https://news.google.com/swg/js/v1/publisher.js"]');

    if (!preferredSourceScript) {
      preferredSourceScript = document.createElement("script");
      preferredSourceScript.async = true;
      preferredSourceScript.src = "https://news.google.com/swg/js/v1/publisher.js";
      document.head.appendChild(preferredSourceScript);
    }

    preferredSourceScript.addEventListener("load", function () {
      window.setTimeout(showPreferredSourceFallback, 500);
    });

    window.setTimeout(showPreferredSourceFallback, 2500);
  }
})();
