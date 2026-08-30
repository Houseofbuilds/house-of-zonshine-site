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
})();
