// Слайдер

let Slider = function () {
    const left = document.querySelector('.burgers__auto-scroll');
    const right = document.querySelector('.burgers__auto-scroll--right');
    const list = document.querySelector('.burgers__list');

    //вычисляем стили
    const styles = getComputedStyle(list);
    let currWidth = parseInt(getComputedStyle(list).width);

    const itemCounter = list.children.length;
    //let currItem = 0;

    window.addEventListener('resize', function () {
        let currRight = 0;
        currWidth = parseInt(getComputedStyle(list.children[0]).width);
        list.style.right = currRight;
    }, true);

    left.addEventListener('click', e => {
        e.preventDefault();
        let currRight = parseInt(getComputedStyle(list).right);

        if (currRight > 0) {
            list.style.right = (currRight - currWidth) + "px";
            /*
            if (list.children[currItem].classList.contains('active') && currItem>0) {
                list.children[currItem].classList.remove('active');
                currItem--;
                list.children[currItem].classList.add('active');
            }
            */
        } else {
            currRight = (itemCounter - 1) * currWidth;
            list.style.right = currRight + "px";
        }
    });


    right.addEventListener('click', e => {
        e.preventDefault();
        let currRight = parseInt(getComputedStyle(list).right);

        if (currRight < (itemCounter - 1) * currWidth) {
            list.style.right = currRight + currWidth + "px";
            /*
            if (list.children[currItem].classList.contains('active') && currItem<itemCounter) {
                list.children[currItem].classList.remove('active');            
                currItem++;
                list.children[currItem].classList.add('active');
            }
            */
        } else {
            currRight = 0;
            list.style.right = currRight;
        }
    });

};
Slider();