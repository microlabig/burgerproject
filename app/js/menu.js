const body = document.querySelector('body');

const overlay = document.querySelector('.overlay');
const btnmenu = document.querySelector('.button-nav__mobile');

const nav = document.querySelector('.navigation').cloneNode(true);
const logo = document.querySelector('.logo').cloneNode(true);
const items = nav.querySelector('.navigation__list').children;

//помещаем клоны в overlay
overlay.children[0].appendChild(logo);
overlay.children[0].appendChild(nav);

// реккурсивная функция (для анимации)
let counter = 0;
function startMenuAnimation() {
    let elem = items[counter];
    elem.classList.toggle('slideInUpRight');
    counter++;
    if (counter < items.length) {
        setTimeout(startMenuAnimation, 100);
    }
    if (counter === items.length) {
        counter = 0;
    }
}

//клик по кнопке меню
let isOpen = false;

var btnmenu_click = btnmenu.addEventListener('click', e=> {
    // устанавливаем положение меню в центре экрана
    const docHeight = document.documentElement.clientHeight;
    const listHeight = nav.querySelector('.navigation__wrapper').clientHeight;
    nav.style.height = `${docHeight}px`;

    if (isOpen) {
        isOpen = false;
        body.style.overflow = 'initial';
    } else {
        isOpen = true;
        body.style.overflow = 'hidden';
    }    
        
    overlay.classList.toggle('active');
    overlay.children[0].style.top = `${window.pageYOffset}px`;    
    btnmenu.classList.toggle('open');
    startMenuAnimation();
});

// клик по ссылке
nav.addEventListener('click', e=> {
    if (e.target.classList.contains('navigation__text')) {
        isOpen = false;
        overlay.classList.toggle('active');
        btnmenu.classList.toggle('open');
        body.style.overflow = 'initial';
    }    
});

 