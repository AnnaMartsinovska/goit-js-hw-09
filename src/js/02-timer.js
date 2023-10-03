import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";



const refs = {
    input: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('[data-start]'),
    timerEl: document.querySelector('.timer')
};


refs.startBtn.disabled = true;
let intervalId = null;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0].getTime() < Date.now()) {
            Notiflix.Notify.failure('Please choose a date in the future'); } else {
            refs.startBtn.disabled = false;
        };
       
        
  },
};

flatpickr(refs.input, options);

function activeTimer(rootSelector) {
    intervalId = setInterval(() => {
    const selectedDate = new Date(refs.input.value);
    selectedDate.getTime();
    const currentDate = Date.now();
    const diff = selectedDate - currentDate;
        
        if (diff <= 0) { 
            stop();
            Notiflix.Notify.success('Timer stoped',   {
    timeout: 5000,
  });
            return;
        };

    const { days, hours, minutes, seconds } = convertMs(diff);

    const daysEl = rootSelector.querySelector('[data-days]');
     const hoursEl = rootSelector.querySelector('[data-hours]');
     const minutesEl = rootSelector.querySelector('[data-minutes]');
    const secondsEl = rootSelector.querySelector('[data-seconds]');
    
    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
    }, 1000);
};
 


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
};

function start() {
    activeTimer(refs.timerEl);
    refs.startBtn.disabled = true;
 };

function stop() { 
    clearInterval(intervalId);
    refs.startBtn.disabled = true;   
};

refs.startBtn.addEventListener('click', start);

function addLeadingZero(value) {
    return String(value).padStart(2, 0);
 };

