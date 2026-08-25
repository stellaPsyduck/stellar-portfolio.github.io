const projectList = document.querySelector("#project-list");
const archiveCount = document.querySelector("#archive-count");
const filterButtons = document.querySelectorAll("[data-filter]");

function projectCard(project) {
  const tags = project.tags
    .map((tag) => `<li>#${tag}</li>`)
    .join("");

  return `
    <article
      class="post project-post"
      data-category="${project.category}"
    >
      <div class="post-rail">
        <span class="number-stamp ${project.accent}">
          ${project.number}
        </span>

        <span class="rail-line"></span>
      </div>

      <div class="post-body">
        <div class="post-meta">
          <span>${project.type}</span>
          <span>${project.year}</span>
        </div>

        <span class="project-label ${project.accent}">
          ${project.category}
        </span>

        <h3>
          <a href="${project.page}">
            ${project.title}
          </a>
        </h3>

        <p class="project-summary">
          ${project.summary}
        </p>

        <div class="outcome-block">
          <span>what I did</span>
          <p>${project.outcome}</p>
        </div>

        <ul
          class="tag-list"
          aria-label="${project.title} skills"
        >
          ${tags}
        </ul>

        <div class="post-actions">
          <span>${project.footer}</span>

          <span class="action-symbols" aria-hidden="true">
            ↻ ♡
          </span>
        </div>
      </div>
    </article>
  `;
}

function renderProjects(filter = "All") {
  const visibleProjects =
    filter === "All"
      ? window.PROJECTS
      : window.PROJECTS.filter(
          (project) => project.category === filter
        );

  if (visibleProjects.length === 0) {
    projectList.innerHTML = `
      <article class="post empty-project-post">
        <div class="post-rail">
          <span class="number-stamp lime">?</span>
          <span class="rail-line"></span>
        </div>

        <div class="post-body">
          <span class="project-label lime">
            ${filter === "All" ? "Projects" : filter}
          </span>

          <h3>In the works.</h3>

          <p class="project-summary">
            New ${filter === "All" ? "projects are" : `${filter.toLowerCase()} projects are`}
            currently being documented. Check back soon.
          </p>

          <div class="post-actions">
            <span>draft saved</span>
            <span class="action-symbols" aria-hidden="true">
              ↻ ♡
            </span>
          </div>
        </div>
      </article>
    `;
  } else {
    projectList.innerHTML = visibleProjects
      .map(projectCard)
      .join("");
  }

  archiveCount.textContent =
    `${String(visibleProjects.length).padStart(2, "0")} posts`;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((candidate) => {
      const active = candidate === button;

      candidate.classList.toggle("active", active);
      candidate.setAttribute("aria-pressed", String(active));
    });

    renderProjects(selectedFilter);
  });
});

renderProjects();