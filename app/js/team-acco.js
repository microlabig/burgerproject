const teamItems = document.querySelectorAll('.team__item');

for (item of teamItems) {
    item.addEventListener('click', e => {
        const curItem = e.currentTarget;
        const name = curItem.querySelector('.team__name');

        if (curItem.classList.contains('is-active')) {
            curItem.classList.remove('is-active');
            name.classList.remove('team__name--opened');
        } else {
            Array.from(teamItems).forEach(elem => {
                elem.classList.remove('is-active');
                name.classList.remove('team__name--opened');
            });
            curItem.classList.add('is-active');
            name.classList.add('team__name--opened');
        }
    });
}