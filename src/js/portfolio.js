import { getPhotos } from './api.js';
import { notifyError } from './notifications.js';

const refs = {
  gallery: document.querySelector('.portfolio__list'),
  loadMoreBtn: document.querySelector('.portfolio__button'),
};

const INITIAL_LIMIT = 9;
const LOAD_MORE_LIMIT = 3;

let loadedCount = 0;
let totalPhotos = null;

document.addEventListener('DOMContentLoaded', init);

async function init() {
  if (!refs.gallery || !refs.loadMoreBtn) return;

  refs.gallery.innerHTML = '';
  refs.loadMoreBtn.addEventListener('click', onLoadMoreClick);

  await fetchAndRenderPhotos(INITIAL_LIMIT);
}

async function onLoadMoreClick() {
  await fetchAndRenderPhotos(LOAD_MORE_LIMIT);
}

async function fetchAndRenderPhotos(limit) {
  setLoading(true);

  try {
    const page =
      limit === INITIAL_LIMIT ? 1 : Math.floor(loadedCount / limit) + 1;

    const response = await getPhotos({ page, limit });
    const { photos, total } = normalizeResponse(response);

    if (typeof total === 'number') {
      totalPhotos = total;
    }

    if (photos.length > 0) {
      renderGallery(photos);
      loadedCount += photos.length;
    }

    const isEnd =
      photos.length < limit ||
      (typeof totalPhotos === 'number' && loadedCount >= totalPhotos);

    refs.loadMoreBtn.disabled = isEnd;
  } catch (error) {
    console.error('Не вдалося завантажити фотографії портфоліо:', error);
    notifyError(error.message);
    refs.loadMoreBtn.disabled = false;
  } finally {
    setLoading(false);
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

function setLoading(isLoading) {
  refs.gallery.classList.toggle('portfolio__list--loading', isLoading);
  refs.loadMoreBtn.disabled = isLoading;
  refs.loadMoreBtn.setAttribute('aria-busy', String(isLoading));
}
