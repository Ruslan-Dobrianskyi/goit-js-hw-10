// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
import trueSvg from '../img/true.svg';
import falseSvg from '../img/false.svg';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const delay = +event.currentTarget.elements.delay.value;
  const radioBtn = event.currentTarget.elements.state.value;

  createPromise(radioBtn, delay)
    .then(resolve => {
      iziToast.success({
        message: `OK Fulfilled promise in ${delay}ms`,
        iconUrl: trueSvg,
        messageColor: '#fff',
        backgroundColor: "#59a10d",
        position: "topRight"

      });
    })
    .catch(error => {
      iziToast.error({
        message: `ERROR Rejected promise in ${delay}ms`,
        iconUrl: falseSvg,
        messageColor: '#fff',
        backgroundColor: "#ef4040",
        position: "topRight"
      });
    });

  event.currentTarget.reset();
}

function createPromise(btn, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (btn === 'fulfilled') {
        resolve({ delay });
      } else {
        reject({ delay });
      }
    }, delay);
  });
}
