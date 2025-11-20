const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: '#4CAF50',
        timeout: 3000,
        transitionIn: 'bounceInLeft',
        transitionOut: 'fadeOut',
        closeOnClick: true,
      });
    })
    .catch(delay => {
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: '#F44336',
        timeout: 4000,
        transitionIn: 'bounceInRight',
        transitionOut: 'fadeOut',
        closeOnClick: true,
      });
    });
});
