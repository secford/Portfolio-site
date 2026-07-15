const glow = document.createElement("div");
glow.className = "mouse-glow";
document.body.appendChild(glow);

let glowTimeout;

document.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
  glow.classList.add("active");
  clearTimeout(glowTimeout);
  glowTimeout = setTimeout(() => glow.classList.remove("active"), 2000);
});

document.addEventListener("mouseleave", () => glow.classList.remove("active"));

function renderProjects(projects) {
  const container = document.getElementById("projects");

  container.innerHTML = projects
    .map(
      (p) => `
    <article class="project-card">
      <a href="${p.url}" class="card-image-link" target="_blank" rel="noopener">
        <div class="card-image">
          <img src="${p.image}" alt="${p.title}" loading="lazy">
          <div class="card-image-overlay">
            <span class="card-image-icon">→</span>
          </div>
        </div>
      </a>
      <div class="project-info">
        <h3>${p.title}</h3>
        <p class="description">${p.description}</p>
        <div class="tags">${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
        <a href="${p.url}" class="project-link" target="_blank" rel="noopener">
          View project
          <span class="link-line"></span>
        </a>
      </div>
    </article>
  `,
    )
    .join("");

  requestAnimationFrame(() => {
    container.querySelectorAll(".project-card").forEach((card, i) => {
      setTimeout(() => card.classList.add("visible"), i * 60);
    });
  });
}

function moveSlider(btn) {
  const slider = document.querySelector(".filter-slider");
  const bar = document.querySelector(".filter-bar");
  const barRect = bar.getBoundingClientRect();
  const btnRect = btn.getBoundingClientRect();
  slider.style.left = btnRect.left - barRect.left + "px";
  slider.style.width = btnRect.width + "px";
}

function buildFilters(projects) {
  const tags = new Set();
  projects.forEach((p) => p.tags.forEach((t) => tags.add(t)));
  const container = document.querySelector(".filter-bar");

  const slider = document.createElement("div");
  slider.className = "filter-slider";
  container.appendChild(slider);

  [...tags].sort().forEach((tag) => {
    const btn = document.createElement("button");
    btn.className = "filter-btn";
    btn.dataset.filter = tag;
    btn.textContent = tag;
    container.appendChild(btn);
  });

  const allBtn = container.querySelector('[data-filter="all"]');
  allBtn.classList.add("active");
  moveSlider(allBtn);

  container.addEventListener("click", (e) => {
    if (!e.target.classList.contains("filter-btn")) return;
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    e.target.classList.add("active");
    moveSlider(e.target);
    const filter = e.target.dataset.filter;
    const filtered =
      filter === "all"
        ? PROJECTS
        : PROJECTS.filter((p) => p.tags.includes(filter));
    renderProjects(filtered);
  });

  window.addEventListener("resize", () => {
    const active = container.querySelector(".filter-btn.active");
    if (active) moveSlider(active);
  });
}

document.getElementById("year").textContent = new Date().getFullYear();
renderProjects(PROJECTS);
buildFilters(PROJECTS);
