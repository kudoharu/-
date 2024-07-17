document.getElementById('scrollToTop').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });
});

let currentIndex = 0;
const slides = document.querySelector('.picture_list');
const totalSlides = document.querySelectorAll('.picture_list img').length;

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);
document.addEventListener('mousedown', handleMouseStart, false);
document.addEventListener('mousemove', handleMouseMove, false);
document.addEventListener('mouseup', handleMouseEnd, false);
document.addEventListener('mouseleave', handleMouseEnd, false);

let xStart = null;
let isDragging = false;

function handleTouchStart(event) {
    const firstTouch = event.touches[0];
    xStart = firstTouch.clientX;
}

function handleTouchMove(event) {
    if (!xStart) {
        return;
    }

    let xEnd = event.touches[0].clientX;
    let xDiff = xStart - xEnd;

    if (xDiff > 0) {
        // swipe left
        showNextSlide();
    } else {
        // swipe right
        showPreviousSlide();
    }

    xStart = null;
}

function handleMouseStart(event) {
    xStart = event.clientX;
    isDragging = true;
}

function handleMouseMove(event) {
    if (!isDragging) {
        return;
    }

    let xEnd = event.clientX;
    let xDiff = xStart - xEnd;

    if (xDiff > 0) {
        // swipe left
        showNextSlide();
    } else {
        // swipe right
        showPreviousSlide();
    }

    xStart = null;
    isDragging = false;
}

function handleMouseEnd() {
    isDragging = false;
}

function showNextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlidePosition();
}

function showPreviousSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlidePosition();
}

function updateSlidePosition() {
    const slideWidth = document.querySelector('.pictures').clientWidth;
    slides.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}
