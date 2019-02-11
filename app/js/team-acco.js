const teamlist = document.querySelector('.team__list');
const teamitems = document.querySelectorAll('.team__item');

teamlist.addEventListener('click', e => {
    let target = e.target;    
    
    // открытие аккордеона
    if (target.classList.contains('team__name-block')) { 
        const curItem = target.parentNode.parentNode; 
        const name = curItem.querySelector('.team__name');     
        
        if (curItem.classList.contains('is-active')) {
            curItem.classList.remove('is-active');
            name.classList.remove('team__name--opened');
        } else {            
            Array.from(teamitems).forEach(elem => {
                elem.classList.remove('is-active');
                name.classList.remove('team__name--opened');
            });            
            curItem.classList.add('is-active');
            name.classList.add('team__name--opened');
        }
        return;
    }    
});
