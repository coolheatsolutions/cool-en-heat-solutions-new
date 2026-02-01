// Burger menu
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  nav.classList.toggle('active');
});

// Year auto update
document.getElementById('year').textContent = new Date().getFullYear();

// Cookie banner
const banner = document.getElementById('cookieBanner');
const acceptCookies = document.getElementById('acceptCookies');

if (!localStorage.getItem('cookiesAccepted')) {
  banner.style.display = 'flex';
}

acceptCookies.addEventListener('click', () => {
  localStorage.setItem('cookiesAccepted', 'true');
  banner.style.display = 'none';
});