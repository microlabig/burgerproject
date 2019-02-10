const items = document.querySelectorAll('.team__item');

for (item of items) {    
    item.addEventListener('click', e=> {
        const curItem = e.currentTarget;  
        const name = curItem.querySelector('.team__name'); 

        Array.from(items).forEach(elem => {
            elem.classList.remove('is-active');
            if (elem.querySelector('.team__name').classList.contains('team__name--opened')) {
                elem.querySelector('.team__name').classList.remove('team__name--opened');
            } 
        })
                
        curItem.classList.toggle('is-active');        
        name.classList.toggle('team__name--opened');        
    });
}
