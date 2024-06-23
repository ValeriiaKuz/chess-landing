const auto = true;
const intervalTime = 5000;

let sliderIndex = 0;
let offset = 0;
let percentTime = 0;

let slideInterval;
let slideIntervalOnStop = 5000;

let widthOfSlide = parseInt(window.getComputedStyle(document.querySelector('.members__slider')).maxWidth);

window.addEventListener('resize', getWidthOfSlideAfterResize);
function getWidthOfSlideAfterResize() {
  widthOfSlide = parseInt(window.getComputedStyle(document.querySelector('.members__slider')).maxWidth);
}

// Slider
const sliderLine = document.querySelector('.members__list');
const nextSlide = () => {
  offset = (sliderIndex + 1) * widthOfSlide;
  sliderIndex += 1;
  if (offset >= widthOfSlide * 2) {
    sliderIndex = 0;
    offset = 0;
  }
  sliderLine.style.left = -offset + 'px';
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, intervalTime);
};
const prevSlide = () => {
  offset = sliderIndex * widthOfSlide - widthOfSlide;
  sliderIndex -= 1;
  if (offset < 0) {
    offset = widthOfSlide * 2;
    sliderIndex = 2;
  }
  sliderLine.style.left = -offset + 'px';
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, intervalTime);
};
document.querySelector('.slider-next').addEventListener('click', function () {
  nextSlide();
});
document.querySelector('.slider-prev').addEventListener('click', function () {
  prevSlide();
});

// Hover slider
function startSlider(slideIntervalOnStop) {
  slideInterval = setInterval(nextSlide, slideIntervalOnStop);
}
function stopSlider() {
  clearInterval(slideInterval);
}
document.querySelector('.members__slider').addEventListener('mouseover', () => {
  slideIntervalOnStop = intervalTime * (1 - percentTime / 100);
  stopSlider();
});
document.querySelector('.members__slider').addEventListener('mouseout', () => {
  startSlider(slideIntervalOnStop);
});

// Swipe slider
document.querySelector('.members__slider').addEventListener('touchstart', handleTouchStart, false);
document.querySelector('.members__slider').addEventListener('touchend', handleTouchEnd, false);

let x1 = null;
function handleTouchStart(event) {
  x1 = event.touches[0].clientX;
  event.preventDefault();
  slideIntervalOnStop = intervalTime * (1 - percentTime / 100);
  stopSlider();
}
function handleTouchEnd(event) {
  if (!x1) {
    return false;
  }
  let x2 = event.changedTouches[0].clientX;
  let xDif = x2 - x1;
  if (xDif !== 0) {
    if (xDif > 0) {
      prevSlide();
    } else {
      nextSlide();
    }
  } else {
    event.preventDefault();
    startSlider(slideIntervalOnStop);
  }
  x1 = null;
  x2 = null;
}

if (auto) {
  slideInterval = setInterval(nextSlide, intervalTime);
}
