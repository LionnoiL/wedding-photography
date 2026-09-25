import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

export const success = message => {
  iziToast.success({
    message,
    timeout: 2000,
  });
};

export const warning = message => {
  iziToast.warning({
    title: 'Caution',
    message,
    timeout: 2000,
  });
};

export const error = message => {
  iziToast.error({
    title: 'Error',
    message,
    timeout: 2000,
  });
};
