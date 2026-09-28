import { createOrder } from './api.js';
import { notifyWarning } from './notifications.js';
import { openModal } from '../js/modal.js';
import { showLoader, hideLoader } from '../js/loader.js';

const form = document.querySelector('.contacts__form');
form.addEventListener('submit', formHandler);

async function formHandler(event) {
  event.preventDefault();

  const nameInput = form.querySelector('[name="username"]');
  const phoneInput = form.querySelector('[name="telephone"]');

  let isValid = true;
  function showError(input) {
    input.classList.add('contacts__input--invalid');
  }
  function removeError(input) {
    input.classList.remove('contacts__input--invalid');
  }

  if (
    nameInput.value.trim() === '' ||
    nameInput.value.trim().length < 2 ||
    nameInput.value.trim().length > 64
  ) {
    isValid = false;
    showError(nameInput);
    notifyWarning('Your name must be between 2 and 64 characters!');
    return;
  } else {
    removeError(nameInput);
  }

  const phonePattern = /^[0-9]{12}$/;

  if (
    phoneInput.value.trim() === '' ||
    !phonePattern.test(phoneInput.value.trim())
  ) {
    isValid = false;
    showError(phoneInput);
    notifyWarning('Invalid format. Example: 380961234568');
    return;
  } else {
    removeError(phoneInput);
  }

  const messageInput = form.querySelector('[name="message"]');
  const messageValue = messageInput.value.trim();

  if (
    messageValue !== '' &&
    (messageValue.length < 5 || messageValue.length > 256)
  ) {
    isValid = false;
    showError(messageInput);
    notifyWarning('Your message must be between 5 and 256 characters!');
    return;
  } else {
    removeError(messageInput);
  }

  const info = event.target.elements;
  const formData = {
    name: info.username.value.trim(),
    phone: info.telephone.value.trim(),
  };

  if (info.message.value.trim() !== '') {
    formData.message = info.message.value.trim();
  }

  const submitBtn = form.querySelector('.contacts__button');

  try {
    if (submitBtn) {
      submitBtn.disabled = true;
      showLoader(submitBtn);
    }
    await createOrder(formData);
    openModal();
    form.reset();
  } catch (error) {
  } finally {
    submitBtn.disabled = false;
    hideLoader(submitBtn);
  }
}
