
"use strict";

// Change this to your own email address before publishing.
const portfolioEmail = "alex@example.com";

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

// Copy email button
const copyEmailButton = document.getElementById("copyEmail");
const copyFeedback = document.getElementById("copyFeedback");

copyEmailButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(portfolioEmail);
    copyFeedback.textContent = "Email copied: " + portfolioEmail;
  } catch {
    copyFeedback.textContent =
      "Copy unavailable. Email me at " + portfolioEmail;
  }
});

// Filter portfolio projects
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });

    projectCards.forEach((card) => {
      const matches =
        filter === "all" || card.dataset.category === filter;

      card.classList.toggle("hidden", !matches);
    });
  });
});

// Contact form: prepare an email in the visitor's email application
const contactForm = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.reportValidity()) return;

  const formData = new FormData(contactForm);
  const name = formData.get("name").trim();
  const email = formData.get("email").trim();
  const subject = formData.get("subject");
  const message = formData.get("message").trim();

  const emailSubject = `Portfolio enquiry: ${subject}`;

  const emailBody = [
    `Name: ${name}`,
    `Reply email: ${email}`,
    `Project type: ${subject}`,
    "",
    "Message:",
    message
  ].join("\n");

  const mailto =
    `mailto:${portfolioEmail}` +
    `?subject=${encodeURIComponent(emailSubject)}` +
    `&body=${encodeURIComponent(emailBody)}`;

  formFeedback.textContent =
    "Opening your email application. Review and send the prepared message.";

  window.location.href = mailto;
});

// Automatically update the footer year
document.getElementById("year").textContent =
  new Date().getFullYear();

// Back-to-top button
const backToTop = document.getElementById("backToTop");

function updateBackToTop() {
  backToTop.classList.toggle("visible", window.scrollY > 400);
}

window.addEventListener("scroll", updateBackToTop, { passive: true });
updateBackToTop();

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth"
  });
});
