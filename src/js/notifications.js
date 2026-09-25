import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const baseOptions = {
  position: 'topRight',
  timeout: 4000,
  close: true,
};

export function notifySuccess(message) {
  iziToast.success({
    ...baseOptions,
    message: message || 'Your message has been sent successfully!',
    title: 'Success',
  });
}

export function notifyWarning(message) {
  iziToast.warning({
    ...baseOptions,
    message: message || 'You forgot important data',
    title: 'Caution',
  });
}

export function notifyError(message) {
  iziToast.error({
    ...baseOptions,
    message: message || 'Something went wrong. Please try again later.',
    title: 'Error',
  });
}
