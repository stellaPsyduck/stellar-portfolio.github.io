(() => {
  "use strict";

  const shell = document.querySelector(".site-shell");
  const themeButton = document.querySelector("#theme-switch");
  const themeIcon = document.querySelector("#theme-icon");
  const themeLabel = document.querySelector("#theme-label");
  const filterButtons = [...document.querySelectorAll("[data-filter]")];
  const projectCards = [...document.querySelectorAll(".project-post")];
  const archiveCount = document.querySelector("#archive-count");
  const copyButton = document.querySelector("#copy-intro");
  const copyLabel = document.querySelector("#copy-label");

  const intro =
    "Stella Rovazzi — Physical Sciences student focused on Computer Science and Statistics, with hands-on robotics, embedded systems, and explainable AI experience.";

  function setTheme(theme) {
    const paper = theme === "paper";
    shell.dataset.theme = paper ? "paper" : "ink";
    themeIcon.textContent = paper ? "◒" : "◐";
    themeLabel.textContent = paper ? "ink" : "paper";
    themeButton.setAttribute(
      "aria-label",
      `Switch to ${paper ? "dark" : "light"} theme`,
    );

    try {
      localStorage.setItem("portfolio-theme", paper ? "paper" : "ink");
    } catch {
      // The theme still works when local storage is unavailable.
    }
  }

  try {
    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme === "paper") {
      setTheme("paper");
    }
  } catch {
    // Opening a local HTML file may restrict storage in some browsers.
  }

  themeButton.addEventListener("click", () => {
    setTheme(shell.dataset.theme === "paper" ? "ink" : "paper");
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      let visibleCount = 0;

      filterButtons.forEach((candidate) => {
        const active = candidate === button;
        candidate.classList.toggle("active", active);
        candidate.setAttribute("aria-pressed", String(active));
      });

      projectCards.forEach((card) => {
        const visible = filter === "All" || card.dataset.category === filter;
        card.hidden = !visible;
        if (visible) visibleCount += 1;
      });

      archiveCount.textContent = `${String(visibleCount).padStart(2, "0")} posts`;
    });
  });

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

    if (!copied) {
      throw new Error("Clipboard access unavailable");
    }
  }

  copyButton.addEventListener("click", async () => {
    try {
      await copyText(intro);
      copyLabel.textContent = "Intro copied";
      window.setTimeout(() => {
        copyLabel.textContent = "Copy short intro";
      }, 1800);
    } catch {
      copyLabel.textContent = "Copy unavailable";
      window.setTimeout(() => {
        copyLabel.textContent = "Copy short intro";
      }, 1800);
    }
  });
})();
