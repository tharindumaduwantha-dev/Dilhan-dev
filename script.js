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

const copyEmailButton = document.getElementById("copyEmail");
const copyStatus = document.getElementById("copyStatus");

if (copyEmailButton && copyStatus) {
  copyEmailButton.addEventListener("click", async () => {
    const email = copyEmailButton.dataset.email;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        const input = document.createElement("textarea");
        input.value = email;
        input.setAttribute("readonly", "");
        input.style.position = "fixed";
        input.style.opacity = "0";
        document.body.appendChild(input);
        input.select();
        const copied = document.execCommand("copy");
        input.remove();
        if (!copied) {
          throw new Error("Copy command was not successful.");
        }
      }

      copyStatus.textContent = "Copied!";
      copyEmailButton.textContent = "Copied";
      window.setTimeout(() => {
        copyStatus.textContent = "";
        copyEmailButton.textContent = "Copy email";
      }, 2000);
    } catch (error) {
      copyStatus.textContent = "Copy failed. Please select the email.";
      console.error("Unable to copy email address.", error);
    }
  });
}

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
