'use strict';

//start section 3
// strict mode
/*
let hasDriversLicense = false;
const passTest = true;
if (passTest) {
    hasDriverLicense = true;
}
if (hasDriversLicense) console.log('I can drive now :D')    //Uncaught ReferenceError: assignment to undeclared variable hasDriverLicense
*/


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

// example 2 - function declarations
function calcAge1(now, birthYear) {
    const age = now - birthYear;
    return age;
}

const age1 = calcAge1(2025, 1999);
console.log('Person1 is ' + age1 + ' years old');

// function - expressions
const calcAge2 = function (nowYear, birthYear) {
    return nowYear - birthYear;
}
console.log(`when it comes to 2027, age is ${calcAge2(2027, 1999)}.`);

// third way - arrow functions 03004
const calcAge3 = (birthYear, nowYear) => nowYear - birthYear;
const nowYear = 2030;
console.log(`when it comes to ${nowYear}, age is ${calcAge3(1999, nowYear)}`);

// practice arrow func
const yearsUntilRetire = (birthYear, yearofStart, yearofRetirement) => {
    const ageofRetire = yearofRetirement - birthYear;
    const workingYear = yearofRetirement - yearofStart;
    return { ageofRetire, workingYear };
}
const { ageofRetire, workingYear } = yearsUntilRetire(1999, 2022, 2061)
console.log(`I have worked for ${workingYear} years, and Ive lived for ${ageofRetire} years`);


// calling another functions 03006
function cutPieces(fruit) {
    return fruit * 4;
}
function newFruitProcessor(apples, oranges) {
    const applePieces = cutPieces(apples);
    const orangePieces = cutPieces(oranges);

    const juice = `Juice with ${applePieces} pieces of apple, and ${orangePieces} pieces of orange.`
    return juice
}
console.log(newFruitProcessor(1, 2));


//      Code Challenge 1
const calcAverage = (a, b, c) => (a + b + c) / 3;
console.log(calcAverage(7, 8, 9))

// Test data 1
let scoreDolphins = calcAverage(44, 23, 71);
let scoreKoalas = calcAverage(65, 54, 49);
console.log(scoreDolphins, scoreKoalas);

const checkWinner = function (avgDolphins, avgKoaloas) {
    if (avgDolphins >= avgKoaloas * 2) {
        console.log(`Dolphins win! (${avgDolphins} vs ${avgKoaloas})`);
    } else if (avgKoaloas >= 2 * avgDolphins) {
        console.log(`DKoalas win! (${avgKoaloas} vs ${avgDolphins})`);
    } else {
        console.log('No winners!');
    }
}

checkWinner(scoreDolphins, scoreKoalas);


// Arrays 03010


