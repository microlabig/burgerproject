// Навигация по точкам
(function () {   
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
})();
