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
const friends = ['Michael', 'Steven', 'Peter'];
console.log(friends, friends[0]);

const years = new Array(1991, 1999, 2004, 2023);
console.log(years);

console.log(years.length);
console.log(years[years.length - 1]);

friends[2] = 'jay';
console.log(friends);

// can hold different values
const steven = ['Steven', 'Bemmmgr', '26', 'student', friends];
console.log(steven);
console.log(steven.length);

// practice
const calcAge4 = function (nowYear, birthYear) {
    return nowYear - birthYear;
}
const y = new Array(1991, 1999, 2004, 2023);
const ages = [calcAge4(2026, y[0]), calcAge4(2026, y[y.length - 1])];
console.log(ages)

// Array Methods 03011
const newLength = friends.push('Bemmgr')
console.log(friends);           //[ "Michael", "Steven", "jay", "Bemmgr" ]
console.log(newLength);         //4

// add elements in the beginning
const newLength2 = friends.unshift('Tom', 'Jason');
console.log(newLength2, friends);           // 6    [ "Tom", "Jason", "Michael", "Steven", "jay", "Bemmgr" ]

// remove elements
const popout = friends.pop();
console.log(popout);            // Bemmgr
console.log(friends);           //  [ "Tom", "Jason", "Michael", "Steven", "jay"]

// remove elements from beginning
friends.shift();
console.log(friends);

console.log(friends.indexOf('Steven'));     // 2
console.log(friends.includes('Tom'));       // false


// Challenge #2 03013
const calcTip = function (bill) {
    return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
}

const bill = [125, 55, 44];
const tip = [calcTip(bill[0]), calcTip(bill[1]), calcTip(bill[2])];
console.log(bill, tip);


// Objects 03014 key - value pairs
const bemmmgr = {
    firstName: 'Xiangyu',
    lastName: 'Li',
    age: 26,
    job: 'student',
    friends: ['Machael', 'Steven', 'Josh']
};
console.log(bemmmgr);

// 2 ways of expression  : dot notation / brackets notation
console.log(bemmmgr.age);
console.log(bemmmgr['age']);

const nameKey = 'Name';
console.log(bemmmgr['first' + nameKey]);
console.log(bemmmgr['last' + nameKey]);

// example
/*
const interestedIn = prompt('In which aspect u want to know about Bemmmgr? Choose between firstname, lastname, age, job and friends!');
if (bemmmgr[interestedIn]) {
    console.log(bemmmgr[interestedIn]);
} else {
    console.log('wrong request!');
}
*/

bemmmgr.location = 'the Neitherland';
bemmmgr['socialMedia'] = '@bemmmGr_';
console.log(bemmmgr);

// challenge;
console.log(`${bemmmgr.firstName} has ${bemmmgr.friends.length} friends, and his best friends is called ${bemmmgr.friends[0]}`);


// 03016 Object methods
const bemmmgrNew = {
    firstName: 'Xiangyu',
    lastName: 'Li',
    birthYear: 1999,
    job: 'student',
    friends: ['Machael', 'Steven', 'Josh'],
    hasDriversLicense: false,
    // function value
    /*
    calcAgeNew: function (birthYear, nowYear) {
        return nowYear - birthYear;
    }
    */

    /*
    calcAgeNew: function (nowYear) {
        console.log(this);
        return nowYear - this.birthYear;
    }
    */
    calcAgeNew: function (nowYear) {
        this.ageNew = nowYear - this.birthYear;
        return this.ageNew;
    },

    // challenge part
    getSummary: function () {
        return `${this.firstName} is a ${this.calcAgeNew(2028)} year old ${this.job}, who has ${this.hasDriversLicense ? 'a' : 'no'} driver's license.`
    }


};

//console.log(bemmmgrNew['calcAgeNew'](1999, 2030));
//console.log(bemmmgrNew.calcAgeNew(2025));
console.log(bemmmgrNew.calcAgeNew(2027));
// calcAgeNew(2027) calculate once, and outcome can be reused
console.log(bemmmgrNew.ageNew);

// Challenge
console.log(bemmmgrNew.getSummary());






