const WA = "994555824241";
const header = document.getElementById("header");
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

window.addEventListener(
  "scroll",
  () => {
    header.classList.toggle("is-on", window.scrollY > 20);
  },
  { passive: true }
);

const closeMenu = () => {
  document.body.classList.remove("menu-open");
  menuBtn.setAttribute("aria-expanded", "false");
  menuBtn.setAttribute("aria-label", "Menyunu aç");
};
menuBtn.addEventListener("click", () => {
  const open = document.body.classList.toggle("menu-open");
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Menyunu bağla" : "Menyunu aç");
});
nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

document.querySelectorAll(".faq__item button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    const open = item.classList.contains("is-open");
    document.querySelectorAll(".faq__item").forEach((el) => {
      el.classList.remove("is-open");
      el.querySelector("button").setAttribute("aria-expanded", "false");
    });
    if (!open) {
      item.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
    }
  });
});

const els = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08 }
  );
  els.forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top < innerHeight * 0.9) el.classList.add("is-in");
    else io.observe(el);
  });
} else {
  els.forEach((el) => el.classList.add("is-in"));
}

const form = document.getElementById("form");
const err = document.getElementById("formError");
const ok = document.getElementById("formOk");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  err.hidden = true;
  ok.hidden = true;
  const d = new FormData(form);
  const name = String(d.get("name") || "").trim();
  const phone = String(d.get("phone") || "").trim();
  const course = String(d.get("course") || "").trim();
  const note = String(d.get("note") || "").trim();
  if (name.length < 2) {
    err.hidden = false;
    err.textContent = "Adınızı yazın.";
    return;
  }
  if (phone.replace(/\D/g, "").length < 9) {
    err.hidden = false;
    err.textContent = "Düzgün telefon yazın.";
    return;
  }
  if (!course) {
    err.hidden = false;
    err.textContent = "Kurs seçin.";
    return;
  }
  const lines = [
    "Salam, Azera Hazırlıq Mərkəzinə yazılmaq istəyirəm.",
    `Ad: ${name}`,
    `Telefon: ${phone}`,
    `Kurs: ${course}`,
  ];
  if (note) lines.push(`Qeyd: ${note}`);
  ok.hidden = false;
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
});
