import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import warningIcon from '../img/warning.svg';
import closeIcon from '../img/close.svg';
import okIcon from '../img/ok.svg';

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const delay = Number(form.delay.value);
  const state = form.state.value;

  createPromise(delay, state)
    .then(delay => {
      iziToast.success({
        title: 'Success',
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        iconUrl: okIcon,
        progressBarColor: '#ffffff',
        messageColor: '#ffffff',
        titleColor: '#ffffff',
        backgroundColor: '#59a10d',
        timeout: 3000,
        close: true,
        onOpening: (instance, toast) => {
          const closeBtn = toast.querySelector('.iziToast-close');
          if (closeBtn) {
            closeBtn.style.backgroundImage = `url(${closeIcon})`;
            closeBtn.style.backgroundSize = '12px 12px';
            closeBtn.style.backgroundRepeat = 'no-repeat';
            closeBtn.style.backgroundPosition = 'center';
            closeBtn.style.color = '#ffffff';
          }
        },
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `Rejected promise in ${delay}ms`,
        position: 'topRight',
        iconUrl: warningIcon,
        progressBarColor: '#ffffff',
        messageColor: '#ffffff',
        titleColor: '#ffffff',
        backgroundColor: '#ef4040',
        timeout: 3000,
        close: true,
        onOpening: (instance, toast) => {
          const closeBtn = toast.querySelector('.iziToast-close');
          if (closeBtn) {
            closeBtn.style.backgroundImage = `url(${closeIcon})`;
            closeBtn.style.backgroundSize = '12px 12px';
            closeBtn.style.backgroundRepeat = 'no-repeat';
            closeBtn.style.backgroundPosition = 'center';
            closeBtn.style.color = '#ffffff';
          }
        },
      });
    });
}

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
