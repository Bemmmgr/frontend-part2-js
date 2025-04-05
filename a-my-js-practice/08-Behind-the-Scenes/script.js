'use strict';

const firstName = 'steven';


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

