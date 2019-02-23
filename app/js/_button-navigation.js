// Навигация по точкам
/*
const btnList = document.querySelector('.button-nav__list').children;

for (item of btnList) {
    item.addEventListener('click', e => {        
        const curItem = e.currentTarget;  

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

// показывать/скрывать Состав в секции Бургер
let compositionVisible = () => {
    let btnComposition = $('.burgers__composition-btn-block');

    btnComposition.on({
        mouseenter() {
            $(this).addClass("active"); 
        },
        mouseleave() {
            $(this).removeClass("active");
        }
    });

    $(".burgers__charakter-cross").on("click touchstart", e => {
        e.preventDefault();
        btnComposition.removeClass("active");
    });
};
compositionVisible();
*/
// 
