//slider

document.addEventListener('DOMContentLoaded', function () {
  const slider = document.querySelector('.members__list');
  const slides = document.querySelectorAll('.member');
  const prevButton = document.querySelector('.slider-prev');
  const nextButton = document.querySelector('.slider-next');
  let currentIndex = 0;
  const sliderCounter = document.querySelector('.slider__counter');

  function updateSliderCounter() {
    const visibleSlidesCount = getVisibleSlidesCount();
    const lastVisibleIndex = Math.min(currentIndex + visibleSlidesCount, slides.length);
    sliderCounter.textContent = `${lastVisibleIndex}`;
  }

  function updateSliderPosition() {
    const slideWidth = slides[0].offsetWidth;
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    updateSliderCounter();
  }

  function getVisibleSlidesCount() {
    if (window.innerWidth <= 788) {
      return 1;
    } else if (window.innerWidth <= 1182) {
      return 2;
    } else {
      return 3;
    }
  }

  function slideNext() {
    const visibleSlidesCount = getVisibleSlidesCount();
    currentIndex += visibleSlidesCount;
    if (currentIndex >= slides.length) {
      currentIndex = 0;
    }
    updateSliderPosition();
  }

  function slidePrev() {
    const visibleSlidesCount = getVisibleSlidesCount();
    currentIndex -= visibleSlidesCount;
    if (currentIndex < 0) {
      currentIndex = slides.length - visibleSlidesCount;
    }
    updateSliderPosition();
  }

  let slideInterval = setInterval(slideNext, 4000);

  prevButton.addEventListener('click', () => {
    slidePrev();
    clearInterval(slideInterval);
    slideInterval = setInterval(slideNext, 4000);
  });

  nextButton.addEventListener('click', () => {
    slideNext();
    clearInterval(slideInterval);
    slideInterval = setInterval(slideNext, 4000);
  });

  updateSliderCounter();

  // Swipe slider
  document.querySelector('.members__slider').addEventListener('touchstart', handleTouchStart, false);
  document.querySelector('.members__slider').addEventListener('touchend', handleTouchEnd, false);

  let x1 = null;
  function handleTouchStart(event) {
    x1 = event.touches[0].clientX;
    event.preventDefault();
  }
  function handleTouchEnd(event) {
    if (!x1) {
      return false;
    }
    let x2 = event.changedTouches[0].clientX;
    let xDif = x2 - x1;
    if (xDif !== 0) {
      if (xDif > 0) {
        clearInterval(slideInterval);
        slideInterval = setInterval(slideNext, 4000);
        slidePrev();
      } else {
        clearInterval(slideInterval);
        slideInterval = setInterval(slideNext, 4000);
        slideNext();
      }
    } else {
      event.preventDefault();
    }
    x1 = null;
    x2 = null;
  }

  window.addEventListener('resize', updateSliderPosition);
});

document.addEventListener('DOMContentLoaded', function () {
  const stagesList = document.querySelector('.stages__list');
  const stagesItems = document.querySelectorAll('.stages__list__item');
  const prevButton = document.querySelector('.stage-prev');
  const nextButton = document.querySelector('.stage-next');
  const dots = document.querySelectorAll('.slider__dot');

  const slidesConfig = [[0, 1], [2], [3, 4], [5], [6]];
  let currentIndex = 0;

  function updateButtons() {
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === slidesConfig.length - 1;
  }

  function updateDots() {
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function updateSlider() {
    const slideItems = slidesConfig[currentIndex];
    const firstItem = stagesItems[slideItems[0]];
    stagesList.scrollTo({
      left: firstItem.offsetLeft - 20,
      behavior: 'smooth'
    });
    updateButtons();
    updateDots();
  }

  function slideNext() {
    if (currentIndex < slidesConfig.length - 1) {
      currentIndex++;
      updateSlider();
    }
  }

  function slidePrev() {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  }

  prevButton.addEventListener('click', slidePrev);
  nextButton.addEventListener('click', slideNext);

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateSlider();
    });
  });

  updateButtons();
  updateDots();
});

document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.header');
  const support = document.getElementById('support');
  const logo = document.getElementById('logo');
  let isCrossed = false;
  logo.addEventListener('click', () => {
    isCrossed = false;
    header.classList.toggle('colored', isCrossed);
  });
  const callback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        isCrossed = !isCrossed;
        header.classList.toggle('colored', isCrossed);
      }
    });
  };

  const options = {
    rootMargin: '0px 0px -100%',
    threshold: 0
  };

  const observer = new IntersectionObserver(callback, options);
  observer.observe(support);
});
