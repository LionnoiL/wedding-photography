let activeModal = null;
let previousFocus = null;
let previousBodyOverflow = '';
let previousBodyPaddingRight = '';
let removeModalListeners = null;

function getModal(modal) {
  if (modal instanceof HTMLElement) {
    return modal;
  }

  if (typeof modal === 'string') {
    const selector =
      modal.startsWith('#') || modal.startsWith('[') || modal.startsWith('.')
        ? modal
        : `#${modal}`;

    return document.querySelector(selector);
  }

  return document.querySelector('[data-modal]');
}

export function openModal(modal) {
  const modalElement = getModal(modal);

  if (!modalElement) {
    return;
  }

  if (activeModal) {
    closeModal();
  }

  const closeButtons = modalElement.querySelectorAll('[data-modal-close]');
  const dialog = modalElement.querySelector('[role="dialog"]');

  function handleKeydown(event) {
    if (event.key === 'Escape') {
      closeModal(modalElement);
    }
  }

  function handleModalClick(event) {
    const clickedBackdrop = !dialog || !dialog.contains(event.target);

    if (clickedBackdrop) {
      closeModal(modalElement);
    }
  }

  function handleCloseClick() {
    closeModal(modalElement);
  }

  document.addEventListener('keydown', handleKeydown);
  modalElement.addEventListener('click', handleModalClick);
  closeButtons.forEach(button => {
    button.addEventListener('click', handleCloseClick);
  });

  removeModalListeners = () => {
    document.removeEventListener('keydown', handleKeydown);
    modalElement.removeEventListener('click', handleModalClick);
    closeButtons.forEach(button => {
      button.removeEventListener('click', handleCloseClick);
    });
  };

  activeModal = modalElement;
  previousFocus = document.activeElement;
  previousBodyOverflow = document.body.style.overflow;
  previousBodyPaddingRight = document.body.style.paddingRight;
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;

  if (scrollbarWidth > 0) {
    const currentPaddingRight =
      Number.parseFloat(getComputedStyle(document.body).paddingRight) || 0;
    document.body.style.paddingRight = `${currentPaddingRight + scrollbarWidth}px`;
  }

  modalElement.hidden = false;
  modalElement.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  (closeButtons[0] || dialog)?.focus();
}

export function closeModal(modal = activeModal) {
  const modalElement = getModal(modal);

  if (!modalElement || modalElement !== activeModal) {
    return;
  }

  removeModalListeners?.();
  removeModalListeners = null;
  modalElement.hidden = true;
  modalElement.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = previousBodyOverflow;
  document.body.style.paddingRight = previousBodyPaddingRight;
  activeModal = null;

  if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
    previousFocus.focus();
  }

  previousFocus = null;
}

document.addEventListener('click', event => {
  const trigger = event.target.closest('[data-modal-open]');

  if (!trigger) {
    return;
  }

  event.preventDefault();
  openModal(trigger.dataset.modalOpen || undefined);
});
