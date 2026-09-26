import axios from 'axios';
import {
  API_BASE_URL,
  ENDPOINTS,
  DEFAULT_PAGE,
  DEFAULT_PHOTOS_LIMIT,
  DEFAULT_FEEDBACKS_LIMIT,
} from './constants.js';

const httpClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.response.use(
  response => response.data,
  error => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong. Please try again later.';

    console.error(`[API] ${message}`, error);

    return Promise.reject(new Error(message));
  }
);

export function getFeedbacks(
  { page = DEFAULT_PAGE, limit = DEFAULT_FEEDBACKS_LIMIT } = {},
  config = {}
) {
  return httpClient.get(ENDPOINTS.feedbacks, {
    params: { page, limit },
    ...config,
  });
}

export function getCategories(config = {}) {
  return httpClient.get(ENDPOINTS.categories, config);
}

export function getPhotos(
  { category, page = DEFAULT_PAGE, limit = DEFAULT_PHOTOS_LIMIT } = {},
  config = {}
) {
  const params = { page, limit };

  if (category) {
    params.categoryId = category;
  }

  return httpClient.get(ENDPOINTS.photos, { params, ...config });
}

export function createOrder(data, config = {}) {
  return httpClient.post(ENDPOINTS.orders, data, config);
}

export default httpClient;
