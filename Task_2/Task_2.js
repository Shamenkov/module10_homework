const btn = document.querySelector('.j-btn');

const clientInnerWidth = window.innerWidth;
const clientInnerHeight = window.innerHeight;

const clientScreenWidth = window.screen.width;
const clientScreenHeight = window.screen.height;

const clientElementWidth= document.documentElement.clientWidth;
const clientElemntHeight = document.documentElement.clientHeight;

btn.addEventListener('click', () => {
btn.classList.toggle('btn--change');
alert(`Размер экрана ${clientScreenWidth}px x ${clientScreenHeight}px
  Размер экрана с учётом полосы прокрутки ${clientInnerWidth} x ${clientInnerHeight}
  Размер экрана без учёта полосы прокрутки${clientElementWidth} x ${clientElemntHeight}`);
  
});