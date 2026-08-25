const workTimeline =
  document.querySelector("#work-timeline");

const experienceCount =
  document.querySelector("#experience-count");

function createWorkEntry(job) {
  const highlights = job.highlights
    .map((highlight) => `<li>${highlight}</li>`)
    .join("");

  const tags = job.tags
    .map((tag) => `<li>#${tag}</li>`)
    .join("");

  return `
    <article class="work-entry" id="${job.id}">
      <div class="work-entry__rail">
        <span
          class="work-entry__marker ${job.accent}"
          aria-hidden="true"
        ></span>
      </div>

      <div class="work-entry__card">
        <div class="work-entry__meta">
          <span>${job.employmentType}</span>
          <time>${job.dates}</time>
        </div>

        <div class="work-entry__heading">
          <div>
            <h3>${job.title}</h3>

            <p class="work-entry__organization">
              ${job.organization}
            </p>
          </div>

          <span class="work-entry__location">
            ${job.location}
          </span>
        </div>

        <p class="work-entry__summary">
          ${job.summary}
        </p>

        ${
          job.highlights.length > 0
            ? `
              <div class="work-entry__highlights">
                <span>selected contributions</span>
                <ul>${highlights}</ul>
              </div>
            `
            : ""
        }

        <ul
          class="tag-list"
          aria-label="${job.title} skills"
        >
          ${tags}
        </ul>
      </div>
    </article>
  `;
}

function renderWorkExperience() {
  const jobs = window.WORK_EXPERIENCE || [];

  if (jobs.length === 0) {
    workTimeline.innerHTML = `
      <article class="work-entry work-entry--empty">
        <div class="work-entry__rail">
          <span
            class="work-entry__marker lime"
            aria-hidden="true"
          ></span>
        </div>

        <div class="work-entry__card">
          <p class="section-index">
            EXPERIENCE ARCHIVE
          </p>

          <h3>Work history is being added.</h3>

          <p class="work-entry__summary">
            Previous positions and selected contributions
            will appear here soon.
          </p>
        </div>
      </article>
    `;
  } else {
    workTimeline.innerHTML = jobs
      .map(createWorkEntry)
      .join("");
  }

  if (experienceCount) {
    const label = jobs.length === 1 ? "role" : "roles";

    experienceCount.textContent =
      `${String(jobs.length).padStart(2, "0")} ${label}`;
  }
}

renderWorkExperience();