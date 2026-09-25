import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const baseOptionals = {
  position: 'topRight',
  timeout: 40000,
  close: true,
};

export function notifySuccess(message) {
  iziToast.success({
    ...baseOptionals,
    message: message || 'Successfully inserted record!',
    title: 'Success',
  });
}

export function notifyWarning(message) {
  iziToast.warning({
    ...baseOptionals,
    message: message || 'You forgot important data',
    title: 'Caution',
  });
}

export function notifyError(message) {
  iziToast.error({
    ...baseOptionals,
    message: message || 'Something went wrong. Please try again later.',
    title: 'Error',
  });
}
