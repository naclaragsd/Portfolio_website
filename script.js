const elements = document.querySelectorAll('.hidden');

function revealOnScroll() {

    const triggerBottom = window.innerHeight * 0.8;

    elements.forEach(element => {

        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < triggerBottom) {
            element.classList.add('show');
        }

    });

}

window.addEventListener('scroll', revealOnScroll);

revealOnScroll();


// HORIZONTAL SCROLL

const container = document.querySelector('.container');

let isScrolling = false;

window.addEventListener('wheel', (e) => {

    e.preventDefault();

    if (isScrolling) return;

    isScrolling = true;

    container.scrollBy({
        left: e.deltaY * 2,
        behavior: 'smooth'
    });

    setTimeout(() => {
        isScrolling = false;
    }, 400);

}, { passive: false });
