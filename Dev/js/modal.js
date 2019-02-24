//------------------------------
//--------- Модалка ------------
//------------------------------
let ModalWindowAJAXRequest = function () {
    const modal = (function () {
        const m = document.querySelector('.modal');
        let typemodal = 'm'; //по-умолчанию - тип модалки message 
        const p = m.querySelector('.modal__message-text');
        const a = m.querySelector('.button--modal');
        const reviewsName = m.querySelector('.reviews__name');
        const reviewsText = m.querySelector('.reviews__text');
        const btnCross = m.querySelector('.modal__message-btn-cross');

        // показываем в зависимости от типа модального окна
        let settype = function (type) {
            switch (type) {
                case 'm': //message
                    if (m.classList.contains('reviews')) m.classList.remove('reviews');
                    break;
                case 'r': //reviews
                    if (!m.classList.contains('reviews')) m.classList.add('reviews');
                    break;
                default: //по-умолчанию - тип message   
                    if (m.classList.contains('reviews')) m.classList.remove('reviews');
                    break;
            }
            typemodal = type;
        }

        // изменяем содержимое сообщения
        let setmessage = function (name = "", message) {
            if (typemodal !== 'r') {
                if (message) {
                    p.innerText = message;
                } else {
                    p.innerText = 'Неизвестная ошибка';
                }
            } else {
                if (name && message) {
                    reviewsName.innerHTML = name;
                    reviewsText.innerHTML = message;
                }
            }
        }

        // показываем модалку
        let showmodal = function () {
            m.style.display = 'block';
        };

        // закрытие окна по крестику
        btnCross.addEventListener('click', e => {
            e.preventDefault();
            m.style.display = 'none';
        });
        // закрытие окна по кнопке "Закрыть"
        a.addEventListener('click', e => {
            e.preventDefault();
            m.style.display = 'none';
        });
        // закрытие окна по щелчку вне окна
        m.addEventListener('click', e => {
            e.preventDefault();
            let curclass = e.target.className;
            if (curclass === "modal__container") {
                m.style.display = 'none';
            }
        });
        // закрытие окна по <ESC>
        document.addEventListener('keydown', e => {
            if (e.keyCode == 27) {
                m.style.display = 'none';
            }
        })

        return { set: settype, text: setmessage, show: showmodal };
    })();

    //-----------------------------
    //---------- Reviews ----------
    //-----------------------------

    const reviewsButtons = document.querySelectorAll('.reviews__button');
    
    for (button of reviewsButtons) {
        button.addEventListener('click', e => {
            e.preventDefault();
            const target = e.target;

            modal.set('r');
            modal.text(target.parentNode.parentNode.querySelector('.reviews__name').innerText, target.parentNode.parentNode.querySelector('.reviews__text').innerText);
            modal.show();
        });
    }


    //---------------------------
    //--------- AJAX ------------
    //---------------------------

    var form = document.querySelector('.form__wrapper');
    const buttonForm = form.querySelector('.button--form');

    buttonForm.addEventListener('click', e => {
        e.preventDefault();

        let email = "igor-rock@list.ru";
        let name = form.elements.name.value;
        let phone = form.elements.phone.value;
        let comment = form.elements.comment.value;

        let obj = new FormData(document.forms.formrequest);
        obj.append("name", name);
        obj.append("phone", phone);
        obj.append("comment", comment);
        obj.append("to", email);

        //валидация данных
        function validate() {
            let IsValidate = true;
            if (!validateField(form.elements.name)) IsValidate = false;
            if (!validateField(form.elements.phone)) IsValidate = false;
            if (!validateField(form.elements.comment)) IsValidate = false;
            if (validateEmail(email)) IsValidate = false;
            return IsValidate;
        }
        function validateEmail(email) {
            let i, errormessage;
            errormessage = '';
            checkA = false;
            for (i = 0; i < email.length; i++) {
                if (i == 0 && email[i] == '@') errormessage = 'Нет имени';
                if (i == email.length - 1 && email[i] == '@') errormessage = 'Нет доменного имени';
                if (email[i] == '@') checkA = true;
            }
            if (!checkA) errormessage = 'Заполните email в формате MYEMAIL@DOMEN.RU';
            return errormessage;
        }
        function validateField(field) {
            field.nextElementSibling.innerText = field.validationMessage;
            return field.checkValidity();
        }

        if (validate()) {
            // отправляем запрос на сервер
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "https://webdev-api.loftschool.com/sendmail/");
            xhr.responseType = "json";
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest"); //добавлям заголовок, чтобы не было ошибки 302       
            //xhr.send(JSON.stringify(obj));
            xhr.send(obj);
            modal.set('m');
            modal.text('', "Идет отправка данных. Подождите");
            modal.show();
            setTimeout(
                () => {
                    // запрос ответа от сервера
                    xhr.addEventListener('load', e => {
                        let message = xhr.response.message;
                        if (xhr.response.status >= 400) {
                            message += "\nОшибка:" + xhr.response.status;
                        } else {
                            message += "\nОтправка на сервер удалась!";
                        }
                        modal.set('m');
                        modal.text('', message);
                        modal.show();
                    });
                }, 2000
            );

        }
    });
};
ModalWindowAJAXRequest();