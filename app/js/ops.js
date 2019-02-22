//ONE Page Scroll
$(document).ready(function () { //дождемся загрузки документа

    var md = new MobileDetect(window.navigator.userAgent), //Подключаем модуль определения устройства
        isMobile = md.mobile(); // в переменную isMobile попадет либо true либо false  


    let OnePageScroll = function () {

        let sections = $(".sections"), //найдем все секции
            content = $(".content"), //родителя-обертку
            position = 0, //для смещения            
            IsScroll = false, //для определения статуса прокрутки
            contentHeight = parseInt(content.css("height")), //высота всего контента
            currHeight = parseInt(sections.css("height")), //текущая высота
            currItem = 0; //текущая секция

        const length = sections.length; //количество секций        


        //создадим динамически белые точки-навигации
        let createWhitedot = function (scrollto) {
            let LI = $("<li>");
            A = $("<a>", {
                attr: {
                    "href": "#"
                    //"data-scroll-to": `${scrollto}`                       
                }
            });

            LI.addClass("button-nav__item").attr("data-scroll-to", `${scrollto}`);
            A.addClass("button-nav__dot");
            LI.append(A);
            $(".button-nav__list").append(LI);  
        };
        let createDotnavigation = function(item) {
            let i = 0;
            for (i = 0; i < item; i++) {
                createWhitedot(i);
            }            
        };
        createDotnavigation(length);
        $(".button-nav__item").first().addClass("button-nav__item--active");        

        // при ресайзе переопределяем высоту секции
        window.addEventListener('resize', function () {
            currHeight = parseInt(sections.css("height"));
        }, true);

        //определяем предыдущую и следующую секцию
        let defineSections = function (sections) {
            let section = sections.eq(currItem);
            return {
                next: section.next(),
                prev: section.prev()
            }
        }

        // функция прокрутки в зависомости от значения direction, определяем это значение через событие wheel ниже
        let scrollToSection = function (direction) {
            let section = defineSections(sections);
            //скроллим вниз
            if (direction === "up" && section.next.length) {
                performTransition(section.next.index());
                currItem++;
            }
            //спроллим вверх
            if (direction === "down" && section.prev.length) {
                performTransition(section.prev.index());
                currItem--;
            }
        };

        // функция смещения содержимого content по У
        let performTransition = function (index) {
            if (!IsScroll) {
                IsScroll = true;
                position = index * -(currHeight) + "px";

                if ((parseInt(position) * -1 <= contentHeight) && (parseInt(position) * -1 >= 0)) { //если не зашли за пределы
                    content.css({
                        transform: `translateY(${position})`,
                        "-webkit-transform": `translateY(${position})`
                    });
                }
                setTimeout(function () {
                    //Делаем задержку в 1s, пока функция setTimeout не выполнится inscroll будет равен true
                    IsScroll = false;

                    $(".button-nav__item")
                        .eq(index)
                        .addClass("button-nav__item--active")
                        .siblings()
                        .removeClass("button-nav__item--active");

                }, 1000); // подождать пока завершится инерция на тачпадах                
            }
        };

        // обработчик нажатий клавиш стрелки
        $(document).on("keydown", e => {
            //Обрабатываем нажатие клавиш вниз и вверх при этом проверяем крайние секции
            const section = defineSections(sections);

            switch (e.keyCode) {
                case 35: // клавиша End
                    if (section.next.length) {
                        currItem = length-1;
                        performTransition(currItem);
                    }
                    break;
                case 36: // клавиша Home
                    currItem = 0;
                    performTransition(currItem);                    
                    break;
                case 38, 33: // клавиша вверх или PageUp
                    if (section.prev.length) {
                        performTransition(section.prev.index());
                        currItem--;
                    }
                    break;
                case 40, 34: // клавиша вниз или PageDown
                    if (section.next.length) {
                        performTransition(section.next.index());
                        currItem++;
                    }
                    break;
            }
        });

        //обработчик прокрутки с помощью колеса мыши
        $(".wrapper").on({
            //по событию wheel в зависимости как изменяется deltaY мы понимаем прокрутили вверх колесиком или в низ.
            wheel: function (e) {
                const deltaY = e.originalEvent.deltaY;
                const direction = deltaY > 0 ? "up" : "down";
                //если прокруток было много, то вызовем только один раз функцию scrollToSection
                if (!IsScroll) scrollToSection(direction);
            },
            touchmove: e => e.preventDefault()
        });

        // разрешаем свайп на мобильниках
        if (isMobile) {
            $(window).swipe({
                swipe: (event, direction) => {
                    scrollToSection(direction);
                }
            });
        }

        // клики по кнопкам навигации
        $("[data-scroll-to]").on("click", e => {
            e.preventDefault();
            currItem = $(e.target).data("scroll-to");
            performTransition(parseInt(currItem));            
        });

    };
    OnePageScroll();
});