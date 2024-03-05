// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const display = document.querySelector('.timer');
const startBtn = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');

startBtn.addEventListener('click', onStartBtnClick);

let userSelectedDate;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate < Date.now()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
        timeout: 3000,
      });

      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
      userSelectedDate = selectedDate;
    }
  },
};

flatpickr(input, options);

function onStartBtnClick() {
  startBtn.disabled = true;

  timerId = setInterval(() => {
    const diff = userSelectedDate - Date.now();

    if (diff <= 0) {
      clearInterval(timerId);
      startBtn.disabled = false;

      return;
    }

    const { days, hours, minutes, seconds } = convertMs(diff);
    addLeadingZero(days, hours, minutes, seconds);
  }, 1000);
}

function addLeadingZero(days, hours, minutes, seconds) {
  display.querySelector('[data-days]').textContent = String(days).padStart(
    2,
    '0'
  );
  display.querySelector('[data-hours]').textContent = String(hours).padStart(
    2,
    '0'
  );
  display.querySelector('[data-minutes]').textContent = String(
    minutes
  ).padStart(2, '0');
  display.querySelector('[data-seconds]').textContent = String(
    seconds
  ).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
