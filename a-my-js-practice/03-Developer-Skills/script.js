// Remember, we're gonna use strict mode in all scripts now!
"use strict";

//setting up snippets - in js.code-snippets
// input cl for console.log

// setting up - todo height

// using node.js
const x ='23';
const calcAge = birthYear => 2037 - birthYear;
console.log(calcAge(1999));


// debugging process
const measureKelvin = function () {
    const measurement = {
        type: 'temp',
        unit: 'celsius',
        // value: prompt('Degree celsius:')
        value: Number(prompt('Degree celsius:'))
    }
    // another way to 
    console.table(measurement);

    // console.log(measurement.value);
    // console.warn(measurement.value);
    // console.error(measurement.value);

    const kelvin = measurement.value + 273;
    return kelvin;
}

console.log(measureKelvin());
