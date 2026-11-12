const hrsEl = document.getElementById('hrs');
const minsEl = document.getElementById('mins');
const secsEl = document.getElementById('secs');
const msEl = document.getElementById('ms');
const ampmEl = document.getElementById('ampm');
const dateEl = document.getElementById('date-display');
const secBar = document.getElementById('sec-bar');

const formatBtn = document.getElementById('format-btn');
const themeBtn = document.getElementById('theme-btn');
const crtBtn = document.getElementById('crt-btn');
const scanlines = document.getElementById('scanlines');


let is24Hour = false;
let crtOn = true;
const themes = ['theme-cyber', 'theme-matrix', 'theme-sunset'];
const themeNames = ['CYBER', 'MATRIX', 'SUNSET'];
let currentThemeIndex = 0;


function padZero(num) {
  return num < 10 ? '0' + num : num;
}

function updateClock() {
  const now = new Date();

  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const millis = Math.floor(now.getMilliseconds() / 10);

 
  if (!is24Hour) {
    const period = hours >= 12 ? 'PM' : 'AM';
    ampmEl.textContent = period;
    ampmEl.style.display = 'inline';
    hours = hours % 12 || 12;
  } else {
    ampmEl.style.display = 'none';
  }


  hrsEl.textContent = padZero(hours);
  minsEl.textContent = padZero(minutes);
  secsEl.textContent = padZero(seconds);
  msEl.textContent = '.' + padZero(millis);


  const progressPercent = ((seconds + millis / 100) / 60) * 100;
  secBar.style.width = progressPercent + '%';

 
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  
  const dayName = days[now.getDay()];
  const dayNum = padZero(now.getDate());
  const monthName = months[now.getMonth()];
  const year = now.getFullYear();

  dateEl.textContent = `${dayName} // ${dayNum} ${monthName} ${year}`;
}


formatBtn.addEventListener('click', () => {
  is24Hour = !is24Hour;
  updateClock();
});


themeBtn.addEventListener('click', () => {
  document.body.classList.remove(themes[currentThemeIndex]);
  currentThemeIndex = (currentThemeIndex + 1) % themes.length;
  document.body.classList.add(themes[currentThemeIndex]);
  themeBtn.textContent = `THEME: ${themeNames[currentThemeIndex]}`;
});


crtBtn.addEventListener('click', () => {
  crtOn = !crtOn;
  scanlines.classList.toggle('hidden', !crtOn);
  crtBtn.textContent = crtOn ? 'CRT: ON' : 'CRT: OFF';
});


setInterval(updateClock, 50);
updateClock();