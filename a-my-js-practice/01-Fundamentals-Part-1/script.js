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

// type conversion 02-018
const inputYear = '1999';
console.log(Number(inputYear) + 18, inputYear);

console.log(Number('Bemmmgr'));     //NaN -- type: invaild number
console.log(typeof (NaN));

console.log(String(23), 23);

//type coercion(类型强制)
console.log("I'm " + 25 + " years old..");      //numbers converted to string
console.log('26' + '26' + 8);           //26268
console.log('98' - '18' + 5);           //85
console.log('25' / '2');                //12.5
console.log(2 + 3 + 4 + '5')            //95


/*
    truthy & falsy values 02019
    5 falsy values: 0, '', undefined, null, NaN;
*/
console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean(null));
console.log(Boolean('anc'));
console.log(Boolean({}));
console.log(Boolean(''));

const money = 0;
if (money) {
    console.log("Don't spend it at all!")
} else {
    console.log("You should get a job!")
}

let height;
if (height) {
    console.log("yay!! Height is defined!")
} else {
    console.log("No, Its not..")
}

// equality operators
// const age3 = '20';
// if (age3 === 20) console.log('u r qualified! This is strict');
// if (age3 == 20) console.log('This is loose');

// const favorite = prompt('Whats ur favorite color??');
// console.log(favorite);

// if (favorite == 3123) {
//     console.log('Cool! This is a great number!');
// } else {
//     console.log('u need a different number~');
// }

// if (favorite !== 98) console.log('Why not 98?');


// Logical operators 02022
const hasDriversLicese = true;
const hasGoodVersion = false;
console.log(hasDriversLicese && hasGoodVersion);
console.log(hasDriversLicese || hasGoodVersion);
console.log(!hasDriversLicese);

const shouldDrive = hasDriversLicese && hasGoodVersion

const isTired = true;
console.log('triple: ' + hasDriversLicese || hasGoodVersion || isTired);

if (shouldDrive && !isTired) {
    console.log('Sarah is able to drive!');
} else {
    console.log('Sorry, not capiable');
}

// switch
const day = 'monday';
switch (day) {
    case 'monday':
        console.log('Plan course structure');
        console.log('Go to coding meetup');
        break;
    case 'tuesday':
        console.log('Prepare throry videos');
        break;
    case 'wednesday':
        console.log('take a break');
        break;
    case 'thursday':
        console.log('write code examples');
        break;
    case 'tuesday':
        console.log('record videos');
        break;
    default:
        console.log('Not a valid day!');
}

// conditional ternary operator 02027
const age4 = 26;
age4 >= 18 ? console.log('Im allowed to drink wine.') : console.log('i can only drink water.')

const drink = age4 >= 30 ? 'drink wine' : 'drink water';
console.log(drink);

console.log(`I would love to drink ${age4 >= 18 ? 'wine' : 'water'}.`);

// section3



