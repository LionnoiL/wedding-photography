import { getPhotos, getCategories } from './api.js';
import { INITIAL_PHOTOS_LIMIT, LOAD_MORE_PHOTOS_LIMIT } from './constants.js';
import { showLoader, hideLoader } from '../js/loader.js';

const refs = {
  gallery: document.querySelector('.portfolio__list'),
  loadMoreBtn: document.querySelector('.portfolio__button'),
  filtersList: document.querySelector('.portfolio__filters'),
};

let loadedCount = 0;
let totalPhotos = null;
let activeCategory = null;

document.addEventListener('DOMContentLoaded', init);

async function init() {
  if (!refs.gallery || !refs.loadMoreBtn) return;

  refs.gallery.innerHTML = '';
  refs.loadMoreBtn.addEventListener('click', onLoadMoreClick);

  if (refs.filtersList) {
    refs.filtersList.addEventListener('click', onFilterClick);
    await fetchAndRenderCategories();
  }

  await fetchAndRenderPhotos(INITIAL_PHOTOS_LIMIT);
}

async function onLoadMoreClick() {
  await fetchAndRenderPhotos(LOAD_MORE_PHOTOS_LIMIT);
}

async function fetchAndRenderPhotos(limit) {
  refs.loadMoreBtn.disabled = true;
  refs.loadMoreBtn.setAttribute('aria-busy', 'true');

  const page = Math.floor(loadedCount / limit) + 1;

  try {
    showLoader(refs.loadMoreBtn);

    const response = await getPhotos({
      category: activeCategory,
      page,
      limit,
    });
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
    console.error('Failed to load portfolio photos:', error);
    refs.loadMoreBtn.disabled = false;
  } finally {
    refs.loadMoreBtn.removeAttribute('aria-busy');
    hideLoader(refs.loadMoreBtn);
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

// ----- Categories / filters -----

async function fetchAndRenderCategories() {
  try {
    const response = await getCategories();
    const categories = normalizeCategories(response);
    renderFilters(categories);
  } catch (error) {
    console.error('Failed to load categories:', error);
  }
}

function normalizeCategories(response) {
  const list = Array.isArray(response) ? response : [];

  return list.map(item => ({
    id: item._id,
    name: item.category,
  }));
}

function renderFilters(categories) {
  const allButtonMarkup = createFilterButtonMarkup({
    id: null,
    name: 'All Photos',
    isActive: true,
  });

  const categoriesMarkup = categories
    .map(category =>
      createFilterButtonMarkup({ id: category.id, name: category.name })
    )
    .join('');

  refs.filtersList.innerHTML = allButtonMarkup + categoriesMarkup;
}

function createFilterButtonMarkup({ id, name, isActive = false }) {
  const activeClass = isActive ? ' portfolio__filter--active' : '';
  const idAttr = id ? ` data-category-id="${id}"` : '';

  return `
    <li class="portfolio__filters-item">
      <button
        class="portfolio__filter${activeClass}"
        type="button"${idAttr}
      >${name}</button>
    </li>
  `;
}

async function onFilterClick(event) {
  const button = event.target.closest('.portfolio__filter');
  if (!button || button.classList.contains('portfolio__filter--active')) return;

  activeCategory = button.dataset.categoryId ?? null;

  refs.filtersList
    .querySelectorAll('.portfolio__filter')
    .forEach(btn => btn.classList.remove('portfolio__filter--active'));
  button.classList.add('portfolio__filter--active');

  resetGallery();

  refs.loadMoreBtn.hidden = true;
  await fetchAndRenderPhotos(INITIAL_PHOTOS_LIMIT);
  refs.loadMoreBtn.hidden = false;
}

function resetGallery() {
  refs.gallery.innerHTML = '';
  loadedCount = 0;
  totalPhotos = null;
  refs.loadMoreBtn.disabled = false;
}
