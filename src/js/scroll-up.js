const scrollUpBtn = document.querySelector('.scroll__up');

if (scrollUpBtn) {
  const toggleScrollUpBtn = () => {
    const shouldShow = window.scrollY > window.innerHeight;
    scrollUpBtn.classList.toggle('is-visible', shouldShow);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.addEventListener('scroll', toggleScrollUpBtn, { passive: true });
  scrollUpBtn.addEventListener('click', scrollToTop);

  toggleScrollUpBtn();
}