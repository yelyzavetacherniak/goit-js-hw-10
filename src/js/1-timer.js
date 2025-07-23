import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import warningIcon from '../img/warning.svg';
import closeIcon from '../img/close.svg';

const datetimePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;

let userSelectedDate = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate <= new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        iconUrl: warningIcon,
        backgroundColor: '#ef4040',
        messageColor: '#ffffff',
        titleColor: '#ffffff',
        position: 'topRight',
        progressBarColor: '#ffffff',
        close: true,
        onOpening: (instance, toast) => {
          const closeBtn = toast.querySelector('.iziToast-close');
          if (closeBtn) {
            closeBtn.style.backgroundImage = `url(${closeIcon})`;
            closeBtn.style.backgroundSize = '16px 16px';
            closeBtn.style.backgroundRepeat = 'no-repeat';
            closeBtn.style.backgroundPosition = 'center';
            closeBtn.style.color = 'transparent';
          }
        },
      });
      startBtn.disabled = true;
      userSelectedDate = null;
      return;
    }

    userSelectedDate = selectedDate;
    startBtn.disabled = false;
  },
};

flatpickr(datetimePicker, options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimer({ days, hours, minutes, seconds }) {
  document.querySelector('[data-days]').textContent = days;
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent =
    addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent =
    addLeadingZero(seconds);
}

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  datetimePicker.disabled = true;

  timerId = setInterval(() => {
    const now = new Date();
    const delta = userSelectedDate - now;

    if (delta <= 0) {
      clearInterval(timerId);
      updateTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });

      datetimePicker.disabled = false;
      startBtn.disabled = true;
      return;
    }

    const timeLeft = convertMs(delta);
    updateTimer(timeLeft);
  }, 1000);
});
