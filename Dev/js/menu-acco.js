//вертикальный аккордеон
let VerticalAccordeon = function () {
    const menulist = document.querySelector('.menu__list');
    const menuitems = document.querySelectorAll('.menu__item');

    menulist.addEventListener('click', e => {
        let target = e.target;

        // открытие аккордеона
        if (target.classList.contains('menu__item-title-block')) {
            const curItem = target.parentNode;

            if (curItem.classList.contains('menu__item--active')) {
                curItem.classList.remove('menu__item--active');
            } else {
                Array.from(menuitems).forEach(elem => {
                    elem.classList.remove('menu__item--active');
                });
                curItem.classList.add('menu__item--active');
            }
            return;
        }
        // закрытие аккордеона
        if (target.classList.contains('menu__close')) {
            let curItem = target.parentNode;

            while (curItem.tagName != 'LI') {
                curItem = curItem.parentNode;
            }

            curItem.classList.remove('menu__item--active');
            e.preventDefault();
        }
    });
};
VerticalAccordeon();
