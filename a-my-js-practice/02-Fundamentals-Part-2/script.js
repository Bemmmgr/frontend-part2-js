'use strict';

//start section 3
// strict mode
// let hasDriversLicense = false;
// const passTest = true;
// if (passTest) {
//     hasDriverLicense = true;
// }
// if (hasDriversLicense) console.log('I can drive now :D')    //Uncaught ReferenceError: assignment to undeclared variable hasDriverLicense

// 03003 function
function logger() {
    console.log('This block is saved, and canbe reused');
}
// calliing / running / invoking function
logger();

function fruitProcessor(class1, class2) {
    console.log(class1, class2);
    const juice = `Juice made with ${class1} and ${class2}.`;
    return juice;
}

const juice = fruitProcessor(1, 2);
console.log(juice);
// or
console.log(fruitProcessor(1, 2));

const newJuice = fruitProcessor(2, 2);
console.log(newJuice);

const num = Number('23');
console.log(num);

// example 2
function calcAge1(now, birthYear) {
    const age = now - birthYear;
    return age;
}

const age1 = calcAge1(2025, 1999);
console.log('Person1 is ' + age1 + ' years old');


const calcAge2 = function (nowYear, birthYear) {
    return nowYear - birthYear;
}
console.log(`when it comes to 2027, age is ${calcAge2(2027, 1999)}.`);

// third way
const calcAge3 = (birthYear, nowYear) => nowYear - birthYear;
const nowYear = 2030;
console.log(`when it comes to ${nowYear}, age is ${calcAge3(1999, nowYear)}`);


// Arrow Functions 03004


