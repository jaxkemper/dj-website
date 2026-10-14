// Opening signature: writes for 1.73s, holds, then the portrait flies into the hero frame
const root = document.documentElement;
const intro = document.getElementById("intro");

if (root.classList.contains("intro-on")) {
  const photo = document.getElementById("introPhoto");
  let leaving = false;

  const finish = () => {
    if (leaving) return;
    leaving = true;
    const from = photo.getBoundingClientRect();
    const to = document.querySelector(".portrait-frame").getBoundingClientRect();
    photo.style.transform = `translate(${to.left - from.left}px, ${to.top - from.top}px) scale(${to.width / from.width})`;
    intro.classList.add("leaving");
    setTimeout(() => {
      root.classList.remove("intro-on");
      intro.remove();
    }, 650);
  };

  window.scrollTo(0, 0);
  setTimeout(finish, 1930);
  document.getElementById("introSkip").addEventListener("click", finish);
  window.addEventListener("keydown", (event) => { if (event.key === "Escape") finish(); });
  window.addEventListener("wheel", finish, { passive: true });
  window.addEventListener("touchmove", finish, { passive: true });
} else {
  intro.remove();
}

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

  const cc = form.dataset.cc ? `cc=${encodeURIComponent(form.dataset.cc)}&` : "";
  window.location.href = `mailto:${form.dataset.email}?${cc}subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
