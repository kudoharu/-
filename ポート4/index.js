document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll(".image");
    let currentIndex = 0;
    
    function fadeInNextImage() {
      images[currentIndex].style.opacity = 1; 
      setTimeout(fadeOutCurrentImage, 4000); 
    }
    
    function fadeOutCurrentImage() {
      images[currentIndex].style.opacity = 0; 
      currentIndex = (currentIndex + 1) % images.length; 
      setTimeout(fadeInNextImage, 2000); 
    }
    
    fadeInNextImage();
  });



// 

const slides = document.querySelector('.event .slides');
    const descriptionSlides = document.querySelector('.event .description-slides');
    const next = document.getElementById('next');
    const prev = document.getElementById('prev');
    const counter = document.getElementById('counter');
    let currentIndex = 1;
    const totalSlides = document.querySelectorAll('.slide:not(.clone)').length;
    let isTransitioning = false;

    function updateCounter() {

        const displayIndex = currentIndex === 0 
            ? totalSlides 
            : (currentIndex - 1) % totalSlides + 1;
        counter.textContent = `${displayIndex} / ${totalSlides}`;
    }

    function moveToNextSlide() {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex++;
        slides.style.transition = 'transform 1s ease-in-out';
        descriptionSlides.style.transition = 'transform 1s ease-in-out';
        slides.style.transform = `translateX(-${currentIndex * 100}%)`;
        descriptionSlides.style.transform = `translateX(-${currentIndex * 100}%)`;
        if (currentIndex === totalSlides + 1) {
            setTimeout(() => {
                slides.style.transition = 'none';
                descriptionSlides.style.transition = 'none';
                currentIndex = 1;
                slides.style.transform = `translateX(-${currentIndex * 100}%)`;
                descriptionSlides.style.transform = `translateX(-${currentIndex * 100}%)`;
                isTransitioning = false;
            }, 1000);
        } else {
            setTimeout(() => {
                isTransitioning = false;
            }, 1000);
        }
        updateCounter();
    }

    function moveToPrevSlide() {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex--;
        slides.style.transition = 'transform 1s ease-in-out';
        descriptionSlides.style.transition = 'transform 1s ease-in-out';
        slides.style.transform = `translateX(-${currentIndex * 100}%)`;
        descriptionSlides.style.transform = `translateX(-${currentIndex * 100}%)`;
        if (currentIndex === 0) {
            setTimeout(() => {
                slides.style.transition = 'none';
                descriptionSlides.style.transition = 'none';
                currentIndex = totalSlides;
                slides.style.transform = `translateX(-${currentIndex * 100}%)`;
                descriptionSlides.style.transform = `translateX(-${currentIndex * 100}%)`;
                isTransitioning = false;
            }, 1000);
        } else {
            setTimeout(() => {
                isTransitioning = false;
            }, 1000);
        }
        updateCounter();
    }

    next.addEventListener('click', moveToNextSlide);
    prev.addEventListener('click', moveToPrevSlide);

    setInterval(moveToNextSlide, 5000); 

    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    descriptionSlides.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateCounter();


// 

document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll('.fade');

    const options = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
});

