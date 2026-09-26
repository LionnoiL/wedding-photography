const burgerBtn = document.querySelector('.header__burger-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const closeBtn = document.querySelector('.mobile-menu__close-btn');
const menuLinks = document.querySelectorAll('.mobile-menu__link, .mobile-menu__button');

function openMenu() {
  mobileMenu.classList.add('is-open');
  document.body.classList.add('no-scroll');
}

function closeMenu() {
  mobileMenu.classList.remove('is-open');
  document.body.classList.remove('no-scroll');
}

burgerBtn.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);

menuLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});
