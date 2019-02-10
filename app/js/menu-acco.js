const menuitems = document.querySelectorAll('.menu__item');

for (item of menuitems) {
    item.addEventListener('click', e => {
        const curItem = e.currentTarget;

        if (curItem.classList.contains('menu__item--active')) {
            curItem.classList.remove('menu__item--active');
        } else {
            Array.from(menuitems).forEach(elem => {
                elem.classList.remove('menu__item--active');
            });
            curItem.classList.add('menu__item--active');
        }
    });
}


const menuClose = document.querySelectorAll('.menu__close');
for (itemClose of menuClose) {
    itemClose.addEventListener('click', e => {
        const curr = e.currentTarget;
        curr.classList.remove('menu__item--active');

        e.preventDefault();
    });
}