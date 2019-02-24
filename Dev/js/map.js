//Яндекс-карты
(function() {

$(document).ready(function () {

    let YandexMaps = function () {
        ymaps.ready(init); //ждем загрузки api и DOM после чего запускаем функцию init

        var placemarks = []; // Массив объектов который мы перебираем методом forEach
        
        let obj = {
            latitude: .0, //широта
            longitude: .0, //долгота
            hintContent: '', //текст подсказки
            balloonContent: [ //текст балуна
                '<div class="map__balloon">',
                '<img class="map__burger-img" src="./img/hero/burger.png" alt="Бургер"/>',
                '',
                '</div>'
            ]
        };

        //запрос json-данных у сервера, методом GET, без перезагрузки страницы
        let getMarks = function () {
            let jqxhr = $.getJSON("../Prod/JSON/placemarks.JSON", function (data) {

                 $.each(data, function (key, value) { 
                    obj = {
                        latitude: value[0], //широта
                        longitude: value[1], //долгота
                        hintContent: value[2], //текст подсказки
                        balloonContent: [ //текст балуна
                            '<div class="map__balloon">',
                            '<img class="map__burger-img" src="./img/hero/burger.png" alt="Бургер"/>',
                            value[3],
                            '</div>'
                        ]
                    };
                    placemarks.push(obj);
                });                 
            });
        };
        getMarks();        
                
        /*Инициализация функции создания карты и добавление на карту placemark*/
        function init() {
            var map = new ymaps.Map("map", {
                center: [55.39337183, 43.81580401],
                zoom: 17,
                controls: ["zoomControl"], // Выводим только кнопки зума
                behaviors: ["drag"]
            });
            placemarks.forEach(function (item) {
                
                var placemark = new ymaps.Placemark(
                    [item.latitude, item.longitude],
                    {
                        hintContent: item.hintContent,
                        balloonContent: item.balloonContent.join("")
                    },
                    {
                        iconLayout: "default#image",
                        iconImageHref: "./img/contacts/map-marker.svg",
                        iconImageSize: [46, 58],
                        iconImageOffset: [-23, -58]
                        // iconImageHref: "img/sprite.png",
                        // iconImageSize: [46, 57],
                        // iconImageOffset: [-23, -57],
                        // iconImageClipRect: [[415, 0], [461, 57]]
                    });
                map.geoObjects.add(placemark);
            })
        }
    };
    YandexMaps();
});
})();