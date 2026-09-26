import { getPhotos } from './api.js';
import { notifyError } from './notifications.js';
import {
  DEFAULT_PAGE,
  INITIAL_PHOTOS_LIMIT,
  LOAD_MORE_PHOTOS_LIMIT,
} from './constants.js';

const refs = {
  gallery: document.querySelector('.portfolio__list'),
  loadMoreBtn: document.querySelector('.portfolio__button'),
};

let page = DEFAULT_PAGE;
let loadedCount = 0;
let totalPhotos = null;

document.addEventListener('DOMContentLoaded', init);

async function init() {
  if (!refs.gallery || !refs.loadMoreBtn) return;

  refs.gallery.innerHTML = '';
  refs.loadMoreBtn.addEventListener('click', onLoadMoreClick);

  await fetchAndRenderPhotos(INITIAL_PHOTOS_LIMIT);
}

async function onLoadMoreClick() {
  await fetchAndRenderPhotos(LOAD_MORE_PHOTOS_LIMIT);
}

async function fetchAndRenderPhotos(limit) {
  refs.loadMoreBtn.disabled = true;
  refs.loadMoreBtn.setAttribute('aria-busy', 'true');

  try {
    const response = await getPhotos({ page, limit });
    const { photos, total } = normalizeResponse(response);

    if (typeof total === 'number') {
      totalPhotos = total;
    }

    if (photos.length > 0) {
      renderGallery(photos);
      loadedCount += photos.length;
      page += 1;
    }

    const isEnd =
      photos.length < limit ||
      (typeof totalPhotos === 'number' && loadedCount >= totalPhotos);

    refs.loadMoreBtn.disabled = isEnd;
  } catch (error) {
    console.error('Failed to load portfolio photos:', error);
    notifyError(error.message);
    refs.loadMoreBtn.disabled = false;
  } finally {
    refs.loadMoreBtn.removeAttribute('aria-busy');
  }
}

function renderGallery(photos) {
  refs.gallery.insertAdjacentHTML('beforeend', createGalleryMarkup(photos));
}

function createGalleryMarkup(photos) {
  return photos
    .map(
      ({ img, title }) => `
      <li class="portfolio__item">
        <img class="portfolio__image" src="${img}" alt="${title}" loading="lazy" />
      </li>
    `
    )
    .join('');
}

function normalizeResponse(response) {
  const list = response?.weddingPhotos ?? [];
  const total = response?.totalItems ?? null;

  const photos = list.map(item => ({
    id: item._id,
    img: item.img,
    title: item.title,
  }));

  return { photos, total };
}
