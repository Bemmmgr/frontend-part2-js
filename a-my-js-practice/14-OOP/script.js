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

/*
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
*/

// 14010 - ES6 classes
// class expression
/*
const PersonCl = class {

}
*/

// class declaration
class PersonCl {
    constructor(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    }

    // Methods will add to .prototype property
    calcAge() {
        console.log(2025 - this.birthYear);
    }

    // getter & setter
    get age() {
        return 2026 - this.birthYear;
    }

    set firstName(name) {
        console.log(name);
        if (name.includes(' ')) {
            this._firstName = name;
        } else {
            alert(`${name} is not a vaild name~!`);
        }
    }

    // instance method - add to prototype get instant access
    get firstName() {
        return this._firstName;
    }

    // static method
    static hey() {
        console.log('Hi there 👋');
        console.log(this);
    }
}

const jessica = new PersonCl('Jessica Davis', 1990);
console.log(jessica);
jessica.calcAge();              // 35

// diff from construct func - age, becomes a property / not function
// console.log('Note here: ', jessica.age);                    // Note here:  36

// .prototype 是“构造函数（或类）”自带的属性，用来定义实例要共享的原型
// .__proto__ 是“对象实例”的内部原型（[[Prototype]]）的访问器，指向创建它的那个原型对象
console.log(jessica.__proto__ === PersonCl.prototype);              // true

PersonCl.prototype.greet = function () {
    console.log(`Hey! ${this.firstName}, nice to meet you`);
};
jessica.greet();

// 1. Classes are NOT hoisted   类不能提前调用
// 2. Classes are first-class citizens
//类跟函数、对象一样，可以赋值给变量、当作参数传递、从函数返回、放在数据结构里。因为 class 本质上是个函数对象
// 3. Classes are executed in strict mode

// 14010 - setter & getter
const account = {
    owner : 'steve',
    movements : [200, 650, 300, 1100],

    get latest() {
        return this.movements.slice(-1).pop();
    },

    set latest(mov) {
        this.movements.push(mov);
    }
};

console.log(account.latest);                    // 1100

// regular
//account.latest(50);
account.latest = 50;
console.log(account.movements);                 // (5) [200, 650, 300, 1100, 50]

console.log(jessica._firstName);

// 14012 - static methods
// Array.from(document.querySelectAll('h1'))        methods attach to Array construct

// add static method to Person
Person.hey = function () {
    console.log('Hey there 👋');
    console.log(this);
};

Person.hey();
PersonCl.hey();

// 14013 - Object create
// munually set the prototype of an object to any other object we want
/*
const PersonProto = {
    calcAge() {
        console.log(2025 - this.birthYear);
    },

    init(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    },
};
*/

// dont need to creat
/*
const bemmgr = Object.create(PersonProto);
console.log(bemmgr);
bemmgr.name = 'Bemmgr';
bemmgr.birthYear = 2002;
bemmgr.calcAge();                   // 23

console.log(bemmgr.__proto__ === PersonProto);          // true

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1985);
sarah.calcAge();                    // 40
*/

// 14014 - coding challenge #2
/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

class CarCl {
    constructor(make, speed) {
        this.make = make;
        this.speed = speed;
    };

    accelerate() {
        this.speed += 10;
        console.log(`${this.make} is going at ${this.speed} km/h`);
    };

    brake() {
        this.speed -= 30;
        console.log(`${this.make} is going at ${this.speed} km/h`);
    };

    get speedUS() {
        return this.speed / 1.6;
    };

    set speedUS(speed) {
        this.speed  = speed * 1.6
    }

};
const ford = new CarCl('ford', 110);
ford.accelerate();
console.log(ford.speedUS);              // get - 75

ford.speedUS = 50
console.log(ford);                      // set - CarCl {make: 'ford', speed: 80}

// 14015 - Inheritance between classes & constructor funcs
const Student = function(firstName, birthYear, course) {
    // this.firstName = firstName;
    // this.birthYear = birthYear;
    // 把 Person 当作一个普通函数执行，但把它内部的 this 指向当前的 Student 实例，实例属性的继承
    Person.call(this, firstName, birthYear);
    this.course = course;
};

// 继承 Person.prototype 上的方法, linking prototypes
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
    console.log(`my name is ${this.firstName}, and my major is ${this.course}`);
};

const mike = new Student('Mike', 2003, 'Computer Science');
console.log(mike);
mike.introduce();

mike.calcAge();                         // 23

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

console.log(mike instanceof Student);
console.log(mike instanceof Person);            // true

// 14016 - coding challenge #3
/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

const Car = function (make, speed) {
    this.make = make;
    this. speed = speed;
};

Car.prototype.accelerate = function () {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
    this.speed -= 30;
    console.log(`${this.make} is going at ${this.speed} km/h`);
};

const EV = function (make, speed, charge) {
    Car.call(this, make, speed);
    this.charge = charge;
};

// link prototype
EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
    this.charge = chargeTo;
    console.log(`Now your ${this.make} will charge to ${this.charge}`);
};

EV.prototype.accelerate = function () {
    this.speed += 20;
    this.charge--;
}

const tesla = new EV('Tesla', 150, 23);
tesla.chargeBattery(85);
console.log(tesla);

tesla.brake();              // 120
tesla.accelerate();         // 140
console.log(tesla);         // EV {make: 'Tesla', speed: 140, charge: 84}

// 14017 - Inheritance between classes & ES6 classes
class StudentCl extends PersonCl {
    constructor(firstName, birthYear, course) {
        // Always need to happen first
        // PersonCl.call();
        super(firstName, birthYear);
        // not mandatory
        this.course = course;
    };

    introduce() {
        console.log(`My name is ${this.firstName}, and I learn ${this.course}`);
    };

    calcAge() {
        console.log(`I'm ${2025 - this.birthYear} years old, but as Asian people really feel a little bit younger than actually`);
    }
};

const martha = new StudentCl('Martha Jones', 2003, 'Natural Science');
console.log(martha);

martha.introduce();
martha.calcAge();       // 22

// 14018 - Inheritance between classes Object.creat()
const PersonProto = {
    calcAge() {
        console.log(2025 - this.birthYear);
    },

    init(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    },
};

const bemmgr2 = Object.create(PersonProto);
const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
    PersonProto.init.call(this, firstName, birthYear);
    this.course = course;
}

StudentProto.introduce = function () {
    console.log(`My name is ${this.firstName}, and I learn ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2004, 'Physics');
jay.introduce();
jay.calcAge();

// 14019 - another class example
class Account {
    // public fields (instances)
    locale = navigator.language;

    //private fields (instances)
    #movements = [];                  // Cannot read properties of undefined
    #pin;

    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;

        // protected property
        this.#pin = pin;
        // this._movements = [];
        // this.locale = navigator.language;

        console.log(`Thank you for opening an account, ${owner}!`);
    };

    // public interface - public methods
    getMovements() {
        return this.#movements;
    };

    deposit(val) {
        this.#movements.push(val);
        return this;
    };

    withdrawl(val) {
        this.deposit(-val);
        return this;
    };

    requestLoan(val) {
        if (this._approveLoan(val)) {
            this.deposit(val);
            console.log('Loan approved!');
            return this;
        }
    };

    // private methods
    // not support by any browser
    // #approveLoan() {
    _approveLoan() {
        return true;
    };
};

const acc1 = new Account('Jonas', 'Eur', 1111);
console.log(acc1);

/*
acc1._movements.push(220);
acc1._movements.push(-120);
*/
acc1.deposit(80);
acc1.withdrawl(50);
acc1.requestLoan(100);
acc1._approveLoan(100);
console.log(acc1.getMovements());           // [80, -50, 100]

console.log(acc1);
console.log(acc1._pin);

// 14020 - Encapsulation protected properties and methods 封装
// fake Encapsulation - use _

// 14021 - Encapsulation private class fields and methods
// 1) Public fields
// 2) Private fields
// 3) Public methods
// 4) Private methods
// STATIC version of these 4

// console.log(acc1.#movements);
// console.log(acc1.#pin);
// console.log(acc1.#approveLoan());

// 14022 - chaining methods - first return this on every method
acc1.deposit(200).deposit(200).withdrawl(180).requestLoan(1000).withdrawl(800);
console.log(acc1.getMovements());           // (8) [80, -50, 100, 200, 200, -180, 1000, -800]

// 14023 - classes summary
// all concepts wrap up
