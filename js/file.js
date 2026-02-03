// js/file.js

// =========================
// Cookie banner
// =========================
const cookieBanner = document.getElementById("cookieBanner");
const acceptCookiesBtn = document.getElementById("acceptCookies");
const COOKIE_KEY = "chs_cookies_accepted";

function showCookieBannerIfNeeded() {
  try {
    const accepted = localStorage.getItem(COOKIE_KEY);
    if (!accepted && cookieBanner) {
      cookieBanner.style.display = "flex";
    }
  } catch (err) {
    // Якщо localStorage заблокований — просто показати банер
    if (cookieBanner) cookieBanner.style.display = "flex";
  }
}

if (acceptCookiesBtn) {
  acceptCookiesBtn.addEventListener("click", () => {
    try {
      localStorage.setItem(COOKIE_KEY, "1");
    } catch (err) {}
    if (cookieBanner) cookieBanner.style.display = "none";
  });
}

showCookieBannerIfNeeded();


// =========================
// Drawer burger menu
// (overlay + close button + ESC + click outside)
// =========================
const burger = document.querySelector(".burger");
const overlay = document.getElementById("overlay");
const drawer = document.getElementById("drawer");
const drawerClose = document.getElementById("drawerClose");

function lockScroll(lock) {
  document.body.style.overflow = lock ? "hidden" : "";
}

function openDrawer() {
  if (!burger || !overlay || !drawer) return;

  burger.classList.add("active");
  overlay.classList.add("is-open");
  drawer.classList.add("is-open");

  overlay.setAttribute("aria-hidden", "false");
  drawer.setAttribute("aria-hidden", "false");

  lockScroll(true);
}

function closeDrawer() {
  if (!burger || !overlay || !drawer) return;

  burger.classList.remove("active");
  overlay.classList.remove("is-open");
  drawer.classList.remove("is-open");

  overlay.setAttribute("aria-hidden", "true");
  drawer.setAttribute("aria-hidden", "true");

  lockScroll(false);
}

function isDrawerOpen() {
  return !!drawer?.classList.contains("is-open");
}

// Toggle on burger click
if (burger) {
  burger.addEventListener("click", (e) => {
    e.preventDefault();
    isDrawerOpen() ? closeDrawer() : openDrawer();
  });
}

// Close button
if (drawerClose) drawerClose.addEventListener("click", closeDrawer);

// Click on overlay closes
if (overlay) overlay.addEventListener("click", closeDrawer);

// ESC closes
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && isDrawerOpen()) closeDrawer();
});

// Clicking a link inside drawer closes
if (drawer) {
  drawer.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", closeDrawer);
  });
}

// Safety: if window resized to desktop, close drawer
window.addEventListener("resize", () => {
  if (window.innerWidth >= 769 && isDrawerOpen()) closeDrawer();
});
