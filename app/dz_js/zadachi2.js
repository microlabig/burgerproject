// Задание 1:
var div = document.createElement('div');
div.innerText = "Этот элемент создан при помощи DOM API";
document.body.appendChild(div);

// Задание 2:
var divInner = document.createElement('div');
divInner.className = 'inner';
divInner.innerText = "Этот элемент тоже создан при помощи DOM API";
div.appendChild(divInner);

// Задание 3:
divInner.style.color = 'red';

//Задание 4:
div.addEventListener('click',function(){
    console.log("Этот текст говорит о том, что я всё сделал правильно");
});

//Задание 5:
var a = document.createElement('a');
a.setAttribute('href','https://loftschool.com');
a.innerText = "https://loftschool.com";
document.body.appendChild(a);
a.addEventListener('click', function(e){
    console.log('Я кликнул на ссылку',a.getAttribute('href'));
    e.preventDefault();
});

var br = document.createElement('br');
document.body.appendChild(br);

//Задание 6:
var input = document.createElement('input');
document.body.appendChild(input);
var button = document.createElement('button');
button.innerText = "Кнопка";
document.body.appendChild(button);
button.addEventListener('click', e=> {
    console.log(input.value);
})
