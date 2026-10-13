// Mobile menu
const nav = document.getElementById("nav");
const menuToggle = document.getElementById("menuToggle");

menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
  menuToggle.textContent = open ? "Close" : "Menu";
});

document.querySelectorAll(".mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "Menu";
  });
});

// Booking inquiry: opens the visitor's email app with the details filled in
const form = document.getElementById("inquiryForm");
const formError = document.getElementById("formError");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form));

  if (!data.name.trim() || !/^\S+@\S+\.\S+$/.test(data.email) || !data.type) {
    formError.textContent = "Add your name, a valid email, and the event type.";
    return;
  }
  formError.textContent = "";

  const subject = `Booking inquiry: ${data.type}${data.date ? ` on ${data.date}` : ""}`;
  const body = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Event type: ${data.type}`,
    `Event date: ${data.date || "Not set"}`,
    `City and venue: ${data.venue || "Not provided"}`,
    "",
    data.details || "",
  ].join("\n");

  window.location.href = `mailto:${form.dataset.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
