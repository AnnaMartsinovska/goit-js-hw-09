import Notiflix from 'notiflix';

const refs = {
  inputDelay: document.querySelector('[name="delay"]'),
  inputStep: document.querySelector('[name="step"]'),
  inputAmount: document.querySelector('[name="amount"]'),
  form: document.querySelector('.form'),
};

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
  const shouldResolve = Math.random() > 0.3;
    const data = {
      position,
      delay,
    };
  
    setTimeout(() => {
      if (shouldResolve) {
        resolve(data);
      } else {
        reject(data);
      };
    }, delay);
  });

  return promise;
};
 
function onSubmit(e) {
  e.preventDefault();

  const delay = Number(refs.inputDelay.value);
  const step = Number(refs.inputStep.value);
  const amount = Number(refs.inputAmount.value);

  for (let i = 0; i < amount; i += 1) {
    createPromise(i + 1, delay + i * step)
    
      .then(({ position, delay }) => { Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`); })

      .catch(({ position, delay }) => { Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`); });
  };
};

refs.form.addEventListener('submit', onSubmit);


