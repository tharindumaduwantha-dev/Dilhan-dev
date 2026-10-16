const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

document.documentElement.classList.add("js");
requestAnimationFrame(() => document.body.classList.add("page-loaded"));

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

// Subtle reveal animation for sections, with a safe fallback for older browsers.
if ("IntersectionObserver" in window) {
  const revealItems = document.querySelectorAll(
    ".section-heading, .about-content, .skill-card, .project-card, .more-projects, .timeline-item"
  );
  revealItems.forEach((item, index) => {
    item.classList.add("reveal");
    item.style.setProperty("--reveal-delay", `${(index % 4) * 80}ms`);
  });
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
}
