function renderProjects(projects) {
  const container = document.getElementById("projects");
  container.innerHTML = projects
    .map(
      (p) => `
    <article class="project-card">
      <img src="${p.image}" alt="${p.title}" loading="lazy">
      <div class="project-info">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="tags">${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
        <a href="${p.url}" class="project-link" target="_blank" rel="noopener">Open</a>
      </div>
    </article>
  `,
    )
    .join("");
}

function buildFilters(projects) {
  const tags = new Set();
  projects.forEach((p) => p.tags.forEach((t) => tags.add(t)));
  const container = document.querySelector(".filters");
  [...tags].sort().forEach((tag) => {
    const btn = document.createElement("button");
    btn.className = "filter-btn";
    btn.dataset.filter = tag;
    btn.textContent = tag;
    container.appendChild(btn);
  });
  container.addEventListener("click", (e) => {
    if (!e.target.classList.contains("filter-btn")) return;
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    e.target.classList.add("active");
    const filter = e.target.dataset.filter;
    renderProjects(
      filter === "all"
        ? PROJECTS
        : PROJECTS.filter((p) => p.tags.includes(filter)),
    );
  });
}

document.getElementById("year").textContent = new Date().getFullYear();
renderProjects(PROJECTS);
buildFilters(PROJECTS);
