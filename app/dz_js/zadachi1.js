// типы данных и переменные
var name = "Igor";
console.log(name);
var name = "Irina";
console.log(name);


// условный оператор if
var b = true;
if (!b) {
    console.log("b - истинно");
} else {
    console.log("b - ложно");
}


// Циклический оператор for
for (var i=0; i<10; i++) {
    console.log("i =", i);
}


//Функции
function sum (p1, p2, p3) {
    var sum = p1+p2+p3;
    return sum;
}
var summ = sum(10,20,30);
console.log("summ = ",summ);
var summ = sum(1,2,3);
console.log("summ = ",summ);
var summ = sum(-5,15,3.5);
console.log("summ = ",summ);


//Массивы и объекты
//Задание 1:
var arr1 = ['привет','loftshool'];
arr1.push(', я изучаю');
arr1.push('javascript');
console.log("arr1.length = ", arr1.length);
for (i=0; i<arr1.length; i++) {
    console.log("arr1[",i,"] = ",arr1[i]);
}


//Задание 2:
var arr2 = [30, 5, 143, 65, 220, 4456, 122, -14, 546, 101];
for (i=0; i<arr2.length; i++) {
    if (arr2[i] > 100) {
        console.log(arr2[i]);
    }
}


//Задание 3:
var obj = {
    name: "Igor",
    lastname: "Bezmestin",
    age: 30
};
console.log(obj.name, obj.lastname, obj.age);
obj.profession = "Ingeneer";
console.log(obj.profession);


//Задание 4:
function hello (human) {
    var text = "Привет, меня зовут "+human.name+" "+human.lastname+" и мне "+human.age+" лет.";
    console.log(text);
}
hello(obj);


//Самостоятельная работа:
//ключевое слово "break"
var arr3 = [15,87,17,977,1,87,18,1,54,13,169,7,1,-50,9,2,0,-4,];
var odd = [];
for (i=0; i<arr3.length; i++) { //выберем все нечетные числа до первого четного из массива arr3 и выйдем из цикла
    if (arr3[i]%2 != 0) { 
        odd.push(arr3[i]);
    } else break;
}
console.log("нечетные числа до первого четного = " + odd);

//switch
i = 0;
while (i < arr3.length) { //выволит отрицательные и положительные числа из массива arr3
    switch (true) {
        case (arr3[i]>0): 
            console.log(arr3[i],"\t- положительное число");
            break;
        case (arr3[i]==0): 
            console.log(arr3[i],"\t- ноль");
            break;
        default: 
            console.log(arr3[i],"\t- отрицательное число");
            break;
    }
    i++;
}