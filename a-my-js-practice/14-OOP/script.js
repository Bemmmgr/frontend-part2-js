'use strict';

///////////////////////////Lectures//////////////////////////////
// 14005 - Constructor Func & new operators
const Person = function (firstName, birthYear) {
    // console.log(this);          // Person {}, [[Prototype]]: Object
    // instance properties
    this.firstName = firstName;
    this.birthYear = birthYear;

    // method - dont do this
    /*
    this.calcAge = function () {
        // bad practice - every objects will carry this func
        console.log(2026 - this.birthYear);
    };
    */
}

const steve = new Person('Xiangyu', 1999);
console.log(steve);             // Person {firstName: 'Xiangyu', birthYear: 1999}

// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}

const mati = new Person('Matilda', 1985);
const jack = new Person('Jackson');
console.log(mati, jack);

console.log(mati instanceof Person);            // true / 实例

// 14006 - Prototypes
console.log(Person.prototype);                  // {}

Person.prototype.calcAge = function () {
    console.log(2026 - this.birthYear);
};

steve.calcAge();        // 27

// prototype
console.log(jack.__proto__);                            // {calcAge: ƒ}
console.log(jack.__proto__ === Person.prototype);       // true
console.log(Person.prototype.isPrototypeOf(steve));     // true
console.log(Person.prototype.isPrototypeOf(Person));    // false

Person.prototype.species = 'Homo Sapiens';
console.log(jack, mati);                        // prototype got species
console.log(jack.species);                      // Homo Sapiens - not its own properity

console.log(jack.hasOwnProperty('firstName'));          // true
console.log(jack.hasOwnProperty('species'));            // false

// 14007 - Prototype Inheritance & Prototype Chain
// theoretical

// 14008 - Prototype Inheritance on built in Objects
console.log(steve.__proto__);                   // {species: 'Homo Sapiens', calcAge: ƒ}
// Object.prototype (top of prototype chain)
console.log(steve.__proto__.__proto__);         // constructor: ƒ Object()
console.log(steve.__proto__.__proto__.__proto__);       // null

console.dir(Person.prototype.constructor);      // ƒ Person(firstName, birthYear)

const arr = [3, 6, 6, 5, 6, 9, 9];
console.log(arr.__proto__);                     // all methods - inheritance
console.log(arr.__proto__ === Array.prototype);     // true

console.log(arr.__proto__.__proto__);           // constructor: ƒ Object()

// dont do this - a way to creat new methods
Array.prototype.unique = function () {
    return [...new Set(this)];
};
console.log(arr.unique());                  // [3, 6, 5, 9]

// HTML is huge prototype chain
const h1 = document.querySelector('h1');
console.dir(x => x + 1);

// ///////////////////////////////////////
// 14009 - Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

const Car = function (make, speed) {
    this.make = make;
    this. speed = speed;
};

const bmw = new Car('bmw 1 series', 160);
const mercedes = new Car('Mercedes S class', 230);

Car.prototype.accelerate = function () {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
    this.speed -= 30;
    console.log(`${this.make} is going at ${this.speed} km/h`);
};

bmw.accelerate();
bmw.accelerate();
bmw.brake();                    // bmw 1 series is going at 150 km/h
bmw.accelerate();               // 160

// 14010 - ES6 classes
