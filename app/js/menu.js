const body = document.querySelector('body');

const overlay = document.querySelector('.overlay');
const btnmenu = document.querySelector('.button-nav__mobile');

const nav = document.querySelector('.navigation__wrapper').cloneNode(true);
const logo = document.querySelector('.logo').cloneNode(true);
overlay.children[0].appendChild(logo);
overlay.children[0].appendChild(nav);

let isOpen = false;

var btnmenu_click = btnmenu.addEventListener('click', e=> {
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

 