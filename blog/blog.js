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

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
