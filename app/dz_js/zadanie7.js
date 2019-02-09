const left = document.querySelector("#left");
const right = document.querySelector("#right");
const items = document.querySelector("#items");

const slidesInView = 3;
const step = parseInt(window.getComputedStyle(items.children[0],null).width, 10);
const maxRight = parseInt(window.getComputedStyle(items,null).width, 10) - step * slidesInView;
const minLeft = 0;

let curpos = 0;

right.addEventListener("click", function() {
  // напишите здесь код, который сдвигает items на 100px вправо
  // если items уже сдвинут на 5 элементов впарво, то больше элементы сдвигать не надо, т.к. вы достигли конца списка  
  if (curpos < maxRight) {
    curpos += step;
    items.style.right = `${curpos}px`;
  } else {
    curpos = 0;
    items.style.right = '0px';
  }
});

left.addEventListener("click", function() {
  // напишите здесь код, который сдвигает items на 100px влево
  // если item находится в самом начале, то больше элементы сдвигать влево не надо, т.к. вы достигли начала списка
  if (curpos > minLeft) {
    curpos -= step;
    items.style.right = `${curpos}px`;    
  } else {
    curpos = maxRight;
    items.style.right = maxRight+'px';
  }
});
