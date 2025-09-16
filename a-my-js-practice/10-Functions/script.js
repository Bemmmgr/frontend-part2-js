'use strict';

// 10003 - default parameter
const bookings = []

const createBooking = function(
    flightNum, 
    numPassengers=1, 
    price=199 * 4) {
    // ES5 way of setting default value
    // numPassengers = numPassengers || 1;
    // price = pric ||1099;

    const booking = {
        flightNum,
        numPassengers,
        price,
    };
    console.log(booking);
    bookings.push(booking);
}

createBooking('MH9507', 28);
createBooking('MH9508', undefined, 28);

// 10004 - values vs references
const flight = 'LH2543';
const steve = {
    name: 'Steven Li',
    passport: 'EH874125',
}
const checkIn = function(flightNum, passenger) {
    flightNum = 'LH9990';
    passenger.name = 'Mr. ' + passenger.name;

    if (passenger.passport === 'EH874125'){
        alert('Checked In!');
    } else {
        alert('Wrong passport!');
    }
}

// checkIn(flight, steve);         // LH2543 {name: 'Mr. Steven Li', passport: 'EH874125'}
// console.log(flight);
// console.log(steve);

const newPassport = function(person) {
    person.passport = Math.trunc(Math.random() * 100000000000);

}

newPassport(steve);
// checkIn(flight, steve);             // wrong passport!

// js does not has pass by reference
// 10006 - functions accepting callback functions

const oneWord = function(str) {
    return str.replace(/ /g, '').toLowerCase();
}

const upperFirstWord = function(str) {
    const [first, ...restwords] = str.split(' ');
    return [first.toUpperCase(), ...restwords].join(' ');
}

// Higher order function
const transformer = function (str, fn) {
    console.log(`Original string: ${str}`);
    console.log(`Transformered string: ${fn(str)}`);

    console.log(`Transformered by ${fn.name}`);
}

transformer('Javascript is the best language!', upperFirstWord);
transformer('Javascript is the best language!', oneWord);

const high5 = function () {
    console.log('🤚');
}
document.body.addEventListener('click', high5);

// JS uses callbacks all the time
['jackson', 'sid', 'penny'].forEach(high5);

// 10007 - function return functions
const greet = function (greeting) {
    return function (name) {
        console.log(`${greeting} ${name}`);
    }
}

const smallTalk = greet('Hey, how are u?');
smallTalk('steven');

greet('Yo, Whats up')('Sid');

// transfor to arr function
const greetArr = greeting => name => console.log(`${greeting} ${name}`);
greetArr('Just hi')('my bro');

// 10008 - call and apply methods
const lufthansa = {
    airline: 'LuftHansa',
    iataCode: 'LH',
    bookings: [],
    // with out writing function
    book(flightNum, name) {
        console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`);
        this.bookings.push({flight: `${this.iataCode}${flightNum}, name`});
    },
}
console.log(lufthansa);
lufthansa.book('2380', 'Xiangyu');      // Xiangyu booked a seat on LuftHansa flight LH2380

// call method
const eurowings = {
    airline: 'EuroWings',
    iataCode: 'EW',
    bookings: [],
};

const book = lufthansa.book;
// book(2300, 'Louis Anna');
book.call(eurowings, 2300, 'Louis Anna')

// apply method
const swiss = {
    airline: 'Swiss Air Lines',
    iataCode: 'SA',
    bookings: [],
}

const flightData = [583, 'Mary Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

// call better
book.call(swiss, ...flightData);

// bind method
// do not immediately call the func, returns a new function where this keywords is bind
const bookEW = book.bind(eurowings);
bookEW('3400', 'Steven Li');

// pre specify
const bookEW45 = book.bind(eurowings, 3700);
bookEW45('Shawn');

// with event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
    console.log(this);

    this.planes++;
    console.log(this.planes);
}

// buyPlane point to .buy (button - this) after bind this point to lufthansa
document
    .querySelector('.buy')
    .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

// bind 的第一个参数是 this（这里 null 表示不用 this） 之后的参数会按 顺序依次固定 rate: 0.23
const addVAT = addTax.bind(null, 0.23);
console.log(addVAT(100));

// 等价写法
const addTaxRate = function(rate) {
    return function (value) {
        return value + value * rate;
    }
}
const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));              // 123


// 10009 - Challenge #1
/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),

  registerNewAnswer() {
    // Get answer
    const answer = Number(
        prompt(
            `${this.question}\n${this.options.join('\n')}\n(Write option number)`
        )
    );
    console.log(answer);

    // Register Answer, Increase the vote count for the chosen option by 1
    typeof answer === 'number' && answer < this.answers.length && this.answers[answer]++;
    //console.log(this.answers);

    this.displayResults();    
    this.displayResults('string');    

  },

  displayResults (type = 'array') {
    if (type === 'array') {
        console.log(this.answers);
    } else if (type === 'string') {
        console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
};

//poll.registerNewAnswer();
document.querySelector('.poll').addEventListener('click', poll.registerNewAnswer.bind(poll));

// manually set this keywords point to what we want(new array)
poll.displayResults.call({ answers: [5, 2, 3]}, 'string');


// 10011 - Immediately Invoked Function Expressions - 即刻调用的函数表达式
const runOnce = function () {
    console.log('This will never run again');
}
runOnce();

// IIFE - intance
(function () {
    console.log('This will never run again');
    const isPrivate = 23;
}) ();

(() => console.log('This will ALSO never run again')) ();

{
    const isPrivate2 = 34;
    var notPrivate = 45;
}
// console.log(isPrivate);
console.log(notPrivate);        // 45

// 10012 - closures 闭包
// 一个函数 + 这个函数能够访问的“词法作用域（lexical scope）”的组合
const secureBooking = function () {
    let passengerCount = 0;

    return function () {
        passengerCount++;
        console.log(`passenger: ${passengerCount}`);
    }
}

const booker = secureBooking();
booker();

// check func
console.dir(booker);

// 10013 - more closure
const boardPassengers = function (n, wait) {
    const perGroup = n / 3;

    setTimeout(function () {
        console.log(`We are all noarding all ${n} passengers`);         // 后
        console.log(`There are 3 groups, each with ${perGroup} passengers`);
    }, wait * 1000)

    console.log(`Will start wait in ${wait} seconds`);      // 先
}
// closure have priority over scopechain
boardPassengers(180, 3);


// 10014 - Coding Challenge #2
/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

(function () {
    const header = document.querySelector('h1');
    header.style.color = 'red';

    document.querySelector('body').addEventListener('click', function() {
        header.style.color = 'blue';
    })
}) ();
