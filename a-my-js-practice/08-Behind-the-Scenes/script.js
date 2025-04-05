'use strict';

// scope of (variables, functions)
// const firstName = 'steven';

function calAge (nowYear, birthYear) {
    // console.log(firstName);
    const age = nowYear - birthYear;

    function printAge() {
        let output = `${firstName}, You are ${age}, born in ${birthYear}.`;
        console.log(output);

        if (birthYear >= 1981 && birthYear <= 1999) {
            var millenial = true;       // function scope
            const firstName = 'bemmgr';

            const str = `Ohh, u are a millenial, ${firstName}`;
            console.log(str);

            // function are block scope
            function add (a, b) {
                return a + b;
            }

            const output = 'NEW OUTPUT!';
        }

        // add(2, 3);

    }

    printAge();
    return age;
}

// calAge(2025, 1999);

// 08-008 Hoisting & TDZ
// variables
console.log(me);        // undefined
// console.log(job);       // in TDZ: Uncaught ReferenceError:
// console.log(year);

var me = 'Xiangyu';
let job = 'student';
const year = 1990;

// functions
console.log(addDecl(2, 3));     // 5
// console.log(addExpr(2, 3));     // Uncaught ReferenceError
// console.log(addArrow(2, 3));        // Uncaught ReferenceError

function addDecl(a, b) {
    return a + b;
}

const addExpr = function (a, b) {
    return a + b;
}

const addArrow = (a, b) => a + b;

var x = 1;
let y = 2;
const z = 3;
console.log(x === window.x);       // true

// 08010 - this keyword
// depand on how the function is called
console.log(this);      // window object

const calAge2 = function (birthYear) {
    console.log(2025 - birthYear);
    console.log(this);      //undefined
}

const calAgeArrow = (birthYear) => {
    console.log(2025 - birthYear);
    console.log(this);      // window - for arrow funtion no this keyword, point to its parent keyword
}

calAge2(2000);
calAgeArrow(2000);

const steven = {
    age: 26,
    job: 'student',
    calAge: function () {
        console.log(this);
        console.log(2025 - this.age);
    }
}

steven.calAge();        // Object { age: 26, job: "student", calAge: calAge() }

const matilda = {
    age: 2017,

}

matilda.calAge = steven.calAge;     // method borrowing
console.log(matilda);       // Object { year: 2017, calAge: calAge() }
matilda.calAge();

const f = steven.calAge;
// f();    // undefined


// 08012 
// var firstName = 'Matilda';
const bemmgr = {
    year: 1990,
    firstName: 'Steven',
    calAge: function () {
        // console.log(this);
        console.log(2025 - this.year);

        // solution 1
        // const self = this;
        // const isMillenial = function (){
        //     console.log(self);
        //     console.log(self.year >= 1981 && self.year <=1996);
        // };
        // isMillenial();

        // solution 2
        const isMillenial = () => {
            console.log(this);
            console.log(this.year >= 1981 && this.year <=1996);
        };
        isMillenial();
    },

    greet: () => console.log(`Hey! ${this.firstName}`),
};
bemmgr.greet();     // Hey! undefined. arrow function does not have this keyword. use this from its surrounding - parent this keyword global
// after var firstName = 'Matilda'; creates this kind of properties on global object

bemmgr.calAge();

// arguments keyword
const addExpr2 = function (a, b) {
    console.log(arguments);
    return a + b;
}
addExpr2(2, 5);     // Arguments { 0: 2, 1: 5, … } only exist in regular functions


