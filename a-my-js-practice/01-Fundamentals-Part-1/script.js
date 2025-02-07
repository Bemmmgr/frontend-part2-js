/*
let js = 'amazing';

if (js === 'amazing')
    alert('JS is Fun!');

console.log(257 % 8 - 12);

let firstName = 'Steven';
console.log(firstName)

let jsIsFun = true;
console.log(jsIsFun);

console.log(typeof true);
console.log(typeof jsIsFun);
console.log(typeof 23);
console.log(typeof 'true');

//undeifned
let year
console.log(year)
console.log(typeof year);

year = 1990
console.log(typeof year)

console.log(typeof null);           //object - value & type are null
*/

// let const var
/**     let
 * 1. change value
 * 2.loop
 * 3. temporary variable
 */
let age = 30;
age = 31;

if (true) {
    let temp = ''
}

/**     const- variable cannot be mutated
 * 1. value cannot change
 * 2. Declare reference types (objects, arrays)
 */
const API_URL = "https://api.example.com";
const user = {
    name: "Tom"
};
user.name = "steven"    //Object properties can be modified
// user = {}    error


const now = 2037
const ageSteven = 2025 - 1999;
const ageSarah = now - 2002;
console.log(ageSteven, ageSarah);
console.log(ageSteven * 2, ageSarah / 2, 2 ** 3)

const firstName = 'wuhu';
const lastName = 'Wu';
console.log(firstName + '  ' + lastName);

//assignment operators
let x = 10 + 5;
x += 5;
x++;
x--;
console.log(x);

//comparsion operators
console.log('a' > 'b');
console.log(ageSarah > ageSteven)  // < > = >= <=

const isFullAge = ageSteven >= 18;
console.log('fullage:', isFullAge)

// precedence
console.log(2029 - 2021 < 21312 - 12332);

let m, n;
m = 25, n = 37;
avg = (m + n) / 2;
console.log('avg =', avg)

////////////////////////////////////
// Coding Challenge #1

/*
Mark and John are trying to compare their BMI (Body Mass Index), which is calculated using the formula: BMI = mass / height ** 2 = mass / (height * height). (mass in kg and height in meter).

1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs using the formula (you can even implement both versions)
3. Create a boolean variable 'markHigherBMI' containing information about whether Mark has a higher BMI than John.

TEST DATA 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall.
TEST DATA 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76 m tall.

GOOD LUCK 😀
*/

const massMark = 78;
const heightMark = 1.69;
const massJohn = 92;
const heightJohn = 1.95;

const BMIMark = massMark / heightMark ** 2;
const BMIJohn = massJohn / heightJohn ** 2;
const higherBMI = BMIMark > BMIJohn;
console.log(BMIMark, BMIJohn, higherBMI);


const firstName2 = 'steve';
const lastName2 = 'bemmgr';
const job = 'SDE';
const birthYear = 1999;
const nowYear = 2025;

const me = "I'm " + firstName2 + ", a " + (nowYear - birthYear) + " years old " + job;
console.log(me);

const meNew = `I'm ${firstName2}, a ${nowYear - birthYear} years old ${job}!`;
const string = `just a regular string..`;
console.log(meNew);
console.log(string);

console.log('starting with \n\
    multiple \n\
lines');

console.log(`start 
multiple 
lines`)

// if else Statement 02-014
const age2 = 16;
const oldEnough = age2 >= 18;
if (oldEnough) {
    console.log("Sarah can start driving license..");
} else {
    const yearLeft = 18 - age2;
    console.log(`not yet! wait another ${yearLeft} years! `);
}


const birthYear2 = 1990;
let century;
if (birthYear2 < 2000) {
    century = 20;
} else {
    century = 21;
}
console.log(century)




















