/* Optional shared behaviour for every project post. The page remains readable without JavaScript. */
(() => {
  "use strict";

  const body = document.body;
  const themeToggle = document.querySelector("#theme-toggle");
  const themeIcon = document.querySelector("#theme-icon");
  const themeLabel = document.querySelector("#theme-label");
  const progressBar = document.querySelector("#reading-progress-bar");
  const copyButtons = document.querySelectorAll(".copy-link");

  function applyTheme(theme) {
    const paper = theme === "paper";
    body.dataset.theme = paper ? "paper" : "ink";

    if (themeIcon) themeIcon.textContent = paper ? "◒" : "◐";
    if (themeLabel) themeLabel.textContent = paper ? "ink" : "paper";
    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-label",
        `Switch to ${paper ? "dark" : "light"} theme`,
      );
    }

    try {
      localStorage.setItem("project-post-theme", paper ? "paper" : "ink");
    } catch {
      // The theme still works if local storage is unavailable.
    }
  }

  try {
    const savedTheme = localStorage.getItem("project-post-theme");
    if (savedTheme === "paper") applyTheme("paper");
  } catch {
    // Opening directly from a local file can restrict storage in some browsers.
  }

  themeToggle?.addEventListener("click", () => {
    applyTheme(body.dataset.theme === "paper" ? "ink" : "paper");
  });

  function updateReadingProgress() {
    if (!progressBar) return;

    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
    progressBar.style.width = `${Math.min(Math.max(progress, 0), 1) * 100}%`;
  }

  window.addEventListener("scroll", updateReadingProgress, { passive: true });
  window.addEventListener("resize", updateReadingProgress);
  updateReadingProgress();

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const helper = document.createElement("textarea");
    helper.value = text;
    helper.setAttribute("readonly", "");
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    document.body.appendChild(helper);
    helper.select();
    const copied = document.execCommand("copy");
    helper.remove();

    if (!copied) throw new Error("Clipboard access unavailable");
  }

  copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const label = button.querySelector("span:last-child");
      const originalLabel = label?.textContent || "copy link";

      try {
        await copyText(window.location.href);
        if (label) label.textContent = "link copied";
      } catch {
        if (label) label.textContent = "copy unavailable";
      }

      window.setTimeout(() => {
        if (label) label.textContent = originalLabel;
      }, 1800);
    });
  });
})();
