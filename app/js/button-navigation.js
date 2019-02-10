const btnList = document.querySelector('.button-nav__list').children;


for (item of btnList) {
    item.addEventListener('click', e => {        
        const curItem = e.currentTarget;  
        
        //curItem.querySelector('a').click();

        if (curItem.classList.contains('button-nav__item--active')) {
            curItem.classList.remove('button-nav__item--active');
        } else {
            Array.from(btnList).forEach(elem => {
                elem.classList.remove('button-nav__item--active');
            });
            curItem.classList.add('button-nav__item--active');
        }                
    });
}