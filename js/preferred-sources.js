(function () {
  var sourceUrl = "https://www.google.com/preferences/source?q=juliazonshine.com";
  var preferredSourceClient = null;
  var triggers = [];

  function createTrigger(className) {
    var link = document.createElement("a");
    link.className = className;
    link.href = sourceUrl;
    link.textContent = "Prefer on Google";

    var arrow = document.createElement("span");
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "↗";
    link.appendChild(arrow);

    link.addEventListener("click", function (event) {
      if (!preferredSourceClient) return;
      event.preventDefault();
      preferredSourceClient.addPreferredSource();
    });

    triggers.push(link);
    return link;
  }

  function createPrompt(modifier) {
    var prompt = document.createElement("aside");
    prompt.className = "preferred-source-card " + modifier;
    prompt.setAttribute("aria-label", "Google Preferred Sources");

    var copy = document.createElement("div");
    copy.className = "preferred-source-card-copy";

    var title = document.createElement("p");
    title.className = "preferred-source-title";
    title.textContent = "Keep House of Zonshine in your Google results.";

    var description = document.createElement("p");
    description.className = "preferred-source-description";
    description.textContent = "Choose this site as a preferred source so Google can highlight more of my writing for you.";

    copy.appendChild(title);
    copy.appendChild(description);
    prompt.appendChild(copy);
    prompt.appendChild(createTrigger("preferred-source-button"));
    return prompt;
  }

  var footerLinks = document.querySelector("footer .footer-links");
  if (footerLinks && !footerLinks.querySelector(".footer-preferred-source")) {
    footerLinks.appendChild(createTrigger("footer-preferred-source"));
  }

  if (document.body.classList.contains("home-page")) {
    var stories = document.getElementById("stories");
    if (stories) stories.appendChild(createPrompt("preferred-source-card--homepage"));
  }

  if (document.body.classList.contains("newsletter-index-page")) {
    var newsletterIntroduction = document.querySelector(".newsletter-archive-introduction");
    if (newsletterIntroduction) {
      newsletterIntroduction.appendChild(createPrompt("preferred-source-card--newsletter"));
    }
  }

  var blogDescription = document.querySelector(".blog-index-description");
  if (blogDescription) {
    blogDescription.insertAdjacentElement("afterend", createPrompt("preferred-source-card--blog-index"));
  } else if (document.body.classList.contains("article-page")) {
    var articleCopies = document.querySelectorAll(".article-copy");
    var articleCopy = articleCopies[articleCopies.length - 1];
    if (articleCopy) articleCopy.appendChild(createPrompt("preferred-source-card--article"));
  }

  if (!triggers.length) return;

  (self.PREFERRED_SOURCE = self.PREFERRED_SOURCE || []).push(function (preferredSource) {
    preferredSource.init({ theme: "light", lang: "en" });
    preferredSourceClient = preferredSource;
  });

  if (!document.querySelector('script[src="https://news.google.com/swg/js/v1/publisher.js"]')) {
    var publisherScript = document.createElement("script");
    publisherScript.async = true;
    publisherScript.setAttribute("preferred-sources-control", "manual");
    publisherScript.src = "https://news.google.com/swg/js/v1/publisher.js";
    document.head.appendChild(publisherScript);
  }
})();
