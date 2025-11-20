import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const myInput = document.querySelector('#datetime-picker');
const timer = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;
let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const pastDate = selectedDates[0];

    if (pastDate <= new Date()) {
      iziToast.error({
        position: 'topRight',
        progressBarColor: 'rgb(0, 255, 184)',
        color: 'red',
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startBtn.disabled = true;
      return;
    }
    userSelectedDate = pastDate;
    startBtn.disabled = false;
  },
};

flatpickr(myInput, options);

let intervalId = null;

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  myInput.disabled = true;
  intervalId = setInterval(() => {
    const diff = userSelectedDate - Date.now();

    if (diff <= 0) {
      clearInterval(intervalId);
      myInput.disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(diff);

    timer.days.textContent = addLeadingZero(days);
    timer.hours.textContent = addLeadingZero(hours);
    timer.minutes.textContent = addLeadingZero(minutes);
    timer.seconds.textContent = addLeadingZero(seconds);
  }, 1000);
});

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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
