const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.body;
let interval = null;

startBtn.disabled = false;
stopBtn.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};

function backgroundColor() { 
    body.style.backgroundColor = getRandomHexColor();
    startBtn.disabled = true;
    stopBtn.disabled = false;
};

function startColor() { 
    interval = setInterval(backgroundColor, 1000);
    
};

function stopColor() {
    clearInterval(interval);
    startBtn.disabled = false;
    stopBtn.disabled = true;
    
};

startBtn.addEventListener('click', startColor);
stopBtn.addEventListener('click', stopColor);


