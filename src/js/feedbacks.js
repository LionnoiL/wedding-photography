import Swiper from 'swiper';
import { Navigation, Pagination, Keyboard, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const FEEDBACKS_API_URL =
  'https://wedding-photographer.b.goit.study/api/feedbacks';

const listEl = document.querySelector('.feedbacks__list');
const prevButton = document.querySelector('.feedbacks__button--prev');
const nextButton = document.querySelector('.feedbacks__button--next');

function createFeedbackMarkup({ name, descr }) {
  return `
    <li class="feedbacks__item swiper-slide">
      <blockquote class="feedbacks__quote">
        <p class="feedbacks__text">${descr}</p>
        <footer class="feedbacks__footer">
          <cite class="feedbacks__author">${name}</cite>
        </footer>
      </blockquote>
    </li>
  `;
}

function updateNavigationState(swiper) {
  prevButton.disabled = swiper.isBeginning;
  nextButton.disabled = swiper.isEnd;
}

function initSwiper() {
  return new Swiper('.feedbacks__slider', {
    modules: [Navigation, Pagination, Keyboard, A11y],
    slidesPerView: 1,
    spaceBetween: 24,
    navigation: {
      prevEl: prevButton,
      nextEl: nextButton,
    },
    pagination: {
      el: '.feedbacks__pagination',
      clickable: true,
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    a11y: {
      prevSlideMessage: 'Previous feedback',
      nextSlideMessage: 'Next feedback',
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1440: {
        slidesPerView: 3,
      },
    },
    on: {
      init: updateNavigationState,
      slideChange: updateNavigationState,
    },
  });
}

async function initFeedbacks() {
  if (!listEl) return;

  try {
    const response = await fetch(FEEDBACKS_API_URL);

    if (!response.ok) {
      throw new Error(`Failed to load feedbacks: ${response.status}`);
    }

    const { feedbacks } = await response.json();

    listEl.innerHTML = feedbacks.map(createFeedbackMarkup).join('');

    initSwiper();
  } catch (error) {
    listEl.innerHTML =
      '<li class="feedbacks__item feedbacks__item--error">Unable to load feedbacks right now. Please try again later.</li>';
    console.error(error);
  }
}

initFeedbacks();
