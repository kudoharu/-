const list = document.querySelector('.slide_list');
const items = document.querySelectorAll('.slide_item');
const item = document.querySelector('.slide_item');
const buttons = document.querySelector('.buttons');
const paginations = document.querySelector('.paginations');
const lastIndex = items.length - 1;
let selected = 0;
let interval;

// Util Functions
const setTransition = (value) => {
    list.style.transition = value;
};

const setTranslate = ({ index, reset }) => {
    if (reset) list.style.transform = `translate(-${19.66}%, 0)`;
    else list.style.transform = `translate(-${(index) * 10 + 19.66}%, 0)`;
};

const activePagination = (index) => {
    [...paginations.children].forEach((pagination) => {
    pagination.classList.remove('on');
    });
    paginations.children[index].classList.add('on');
};

const handlePagination = (e) => {
    if (e.target.dataset.num) {
        selected = parseInt(e.target.dataset.num);
        setTransition('all 0.3s linear');
        setTranslate({ index: selected });
        activePagination(selected);
    }
};

const makePagination = () => {
    if (items.length > 1) {
        for (let i = 0; i < items.length; i++) {
        const button = document.createElement('button');
        button.dataset.num = i;
        button.classList.add('pagination');
        if (i === 0) {
            button.classList.add('on');
        }
        paginations.appendChild(button);
        paginations.addEventListener('click', handlePagination);
    }
    }
};
const cloneElement = () => {
    list.prepend(items[lastIndex-1].cloneNode(true),items[lastIndex].cloneNode(true));
    list.append(items[0].cloneNode(true),items[1].cloneNode(true),items[2].cloneNode(true));
    setTranslate({ reset: true });
};

const autoplayIterator = () => {
    selected += 1;
    setTransition('all 0.3s linear');
    setTranslate({ index: selected });
    if (selected > lastIndex) {
    activePagination(0);
    clearInterval(interval);
    setTimeout(() => {
        selected = 0;
        setTransition('');
        setTranslate({ reset: true });
        autoplay({ duration: 2000 });
    }, 300);
    }
    if (selected <= lastIndex) activePagination(selected);
};

const autoplay = ({ duration }) => {
    interval = setInterval(autoplayIterator, duration);
};



const render = () => {
    // makeButton();
    makePagination();
    cloneElement();
    autoplay({ duration: 2000 });
};
render();
