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
