// js/file.js

document.addEventListener("DOMContentLoaded", () => {

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
        cookieBanner.classList.add("visible");
      }
    } catch (err) {
      if (cookieBanner) cookieBanner.classList.add("visible");
    }
  }

  if (acceptCookiesBtn) {
    acceptCookiesBtn.addEventListener("click", () => {
      try {
        localStorage.setItem(COOKIE_KEY, "1");
      } catch (err) {}
      if (cookieBanner) cookieBanner.classList.remove("visible");
    });
  }

  showCookieBannerIfNeeded();


  // =========================
  // Drawer burger menu
  // =========================
  const burger = document.querySelector(".burger");
  const overlay = document.getElementById("overlay");
  const drawer = document.getElementById("drawer");
  const drawerClose = document.getElementById("drawerClose");

  function lockScroll(lock) {
    document.body.classList.toggle("no-scroll", lock);
  }

  function isDrawerOpen() {
    return drawer && drawer.classList.contains("is-open");
  }

  function openDrawer() {
    if (!burger || !overlay || !drawer) return;

    burger.classList.add("active");
    burger.setAttribute("aria-expanded", "true");

    overlay.classList.add("is-open");
    drawer.classList.add("is-open");

    overlay.setAttribute("aria-hidden", "false");
    drawer.setAttribute("aria-hidden", "false");

    lockScroll(true);

    // focus for accessibility
    drawer.focus();
  }

  function closeDrawer() {
    if (!burger || !overlay || !drawer) return;

    burger.classList.remove("active");
    burger.setAttribute("aria-expanded", "false");

    overlay.classList.remove("is-open");
    drawer.classList.remove("is-open");

    overlay.setAttribute("aria-hidden", "true");
    drawer.setAttribute("aria-hidden", "true");

    lockScroll(false);
  }

  // Toggle
  if (burger) {
    burger.addEventListener("click", (e) => {
      e.preventDefault();
      isDrawerOpen() ? closeDrawer() : openDrawer();
    });
  }

  // Close button
  if (drawerClose) {
    drawerClose.addEventListener("click", closeDrawer);
  }

  // Overlay click
  if (overlay) {
    overlay.addEventListener("click", closeDrawer);
  }

  // Click outside (extra safety)
  document.addEventListener("click", (e) => {
    if (
      isDrawerOpen() &&
      drawer &&
      !drawer.contains(e.target) &&
      burger &&
      !burger.contains(e.target)
    ) {
      closeDrawer();
    }
  });

  // ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isDrawerOpen()) {
      closeDrawer();
    }
  });

  // Close on link click
  if (drawer) {
    drawer.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeDrawer);
    });
  }

  // Resize debounce
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (window.innerWidth >= 769 && isDrawerOpen()) {
        closeDrawer();
      }
    }, 150);
  });

});
