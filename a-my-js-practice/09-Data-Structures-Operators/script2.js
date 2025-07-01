'use strict';

const weekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
    thu: {
      open: 12,
      close: 22,
    },
    [weekDays[4]]: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
};


// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  // openingHours: openingHours,
  // ES6 enhanced object literals
  openingHours,

  order: function(starterIndex, mainIndex){
    // this 引用调用该方法的对象: restaurant
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function({starterIndex=1, mainIndex=0, time, address})     // 使用对象的解构
  {
    console.log(`Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`);
  },

  orderPista(ing1, ing2, ing3) {
    console.log(`Here is ur pista with ${ing1}, ${ing2} and ${ing3},`);
  },

  orederPasta: function (mainIng, ...restIng) {
    console.log(mainIng);
    console.log(restIng);
  },
};

// 09010 Logical assignment operator
// &&= ??=
const rest1 = {
  name: 'Capri',
  numGuests: 18,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni',
};

// or assignment operator
/*
rest1.numGuests = rest1.numGuests || 10;
rest2.numGuests = rest2.numGuests || 10;
console.log(rest1.numGuests);         // 18
console.log(rest2.numGuests);         // 10

rest1.numGuests = 0;
rest1.numGuests ||= 10;
console.log(rest1.numGuests);         // 10   take 0 as false
*/

// nullish assignment operator 空值赋值运算符 null or undefined
rest1.numGuests = 0;
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;
console.log(rest1.numGuests);         // 0
console.log(rest2.numGuests);         // 10

// 
/*
rest1.owner = rest1.owner && '<ANONYMOUS>';
console.log(rest1.owner);         // undefined
rest2.owner = rest2.owner && '<ANONYMOUS>';
console.log(rest2.owner);         // <ANONYMOUS>
*/
rest1.owner &&= '<ANONYMOUS>';
rest2.owner &&= '<ANONYMOUS>';
console.log('******************************');
console.log(rest1);
console.log(rest2);

console.log('***********************************');
// Looping arrays The for-of loop
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
for (const item of menu)
  console.log(item);

for (const [item, element] of menu.entries()){
  //console.log(items);
  // console.log(`${items[0] + 1}: ${items[1]}`);   old way to do this
  // new: destructing
  console.log(`${item + 1}: ${element}`);
}

console.log(menu.entries());    // Array Iterator { constructor: Iterator() }
console.log([...menu.entries()]);     // Array(7) [ (2) […], (2) […], (2) […], (2) […], (2) […], (2) […], (2) […] ]


// 09014
console.log(restaurant.openingHours.fri.open);    // 11   weekdays[4]
// optional chaining
console.log(restaurant.openingHours.mon?.open);   // undefined

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
for (const day of days) {
  console.log(day);
  const open = restaurant.openingHours[day]?.open ?? 'closed';    // ?? 只关注 null 或 undefined，不会把 0 或 '' 当作无效值。
  if (open && open != 'closed') {
    console.log(`On ${day}, we open at ${open}`);
  }
}

// methods -- check if it exists
/*  order?.(0, 1)
如果 restaurant.order 是一个函数，就调用它并传入 0, 1。

如果 restaurant.order 是 undefined 或 null，就不调用函数，整个表达式结果为 undefined（不会报错）。
*/
console.log(restaurant.order?.(0, 1) ?? 'order method doesnt exist');     // Array [ "Focaccia", "Pasta" ]


// Arrays
const users = [{name: 'Steven', email: 'random@icloud.com'}];
console.log(users[0]?.name ?? 'user array empty');    // Steven

// similar to following
/*
if (users.length > 0)
  console.log(users[0].name);
else 
  console.log('user array empty');
*/

// 09015 - looping
// properity names
const sth = Object.keys(openingHours);
console.log(sth);         // Array(3) [ "thu", "fri", "sat" ]
let openStr = (`We r open ${sth.length} days a week: `);

for (const day of sth) {
  openStr += `${day}, `;
}
console.log(openStr);

// properity values
const values = Object.values(openingHours);
console.log(values);      // Array(3) [ {…}, {…}, {…} ]

// properity entries
const whole = Object.entries(openingHours);
console.log(whole);       // Array(3) [ (2) […], (2) […], (2) […] ]

// destructuring
for (const [key, {open, close}] of whole) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}


// 09017 -- Sets
// elements are unique, order is irrelevent
const orderSets = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);
console.log(orderSets);       // Set(3) [ "Pasta", "Pizza", "Risotto" ]

console.log(new Set('steven'));     // Set(5) [ "s", "t", "e", "v", "n" ]

console.log(orderSets.size);    // 3
console.log(orderSets.has('pista'));    // false
orderSets.add('Garlic Bread')
orderSets.delete('');
// orderSets.clear();      // remove all
console.log(orderSets);

for (const order of orderSets)
  console.log(order);


// Example
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUnique = [...new Set(staff)];        // Array(3) [ "Waiter", "Chef", "Manager" ]
console.log(staffUnique);
console.log(new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size);


// Maps -- 09018
const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze Italy');
console.log(rest.set(2, 'Lisbon Portugal'));      // Map(3) { name → "Classico Italiano", 1 → "Firenze Italy", 2 → "Lisbon Portugal" }

rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 22)
  .set(true, 'we are open :D')
  .set(false, 'we are closed :(');

console.log(rest.get('name'));
console.log(rest.get(true));

const time = 21;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));     // console.log(true); we are open :D

console.log(rest.has('categories'))
rest.delete(2);


// rest.set([1, 2], 'Test');
const arr = [1, 2];
rest.set(arr, 'Test')
rest.set(document.querySelector('h1'), 'Heading');

// rest.clear();
console.log(rest);
console.log(rest.size);

console.log(rest.get([1, 2]));    // undefined
console.log(rest.get(arr));


console.log('**********************************************************************');
// 09019 -- Map Iteration
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'Javascript'],
  ['correct', 3],
  [true, 'Correct🎊'],
  [false, 'Try Again🖕'],
]);
console.log(question);

// convert object to map
console.log(openingHours);                            // Object { thu: {…}, fri: {…}, sat: {…} }
console.log(Object.entries(openingHours));            // Array(3) [ (2) […], (2) […], (2) […] ]
const openinghoursMap = new Map(Object.entries(openingHours));
console.log(openinghoursMap);                         // Map(3) { thu → {…}, fri → {…}, sat → {…} }

// iteration
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof(key) === 'number') 
    console.log(`Answer ${key}: ${value}`);
}

/*
const answer = Number(prompt('Type your answer: '));
console.log(answer);
console.log( question.get(question.get('correct') === answer));   // Correct🎊
*/
// convert map to array
console.log([...question]);   // Array(7) [ (2) […], (2) […], (2) […], (2) […], (2) […], (2) […], (2) […] ]
// console.log([...question.entries()]);
// console.log([...question.values()]);
// console.log([...question.keys()]);

console.log('**********************************************************************');
// 09020 -- Use which data structure
// 09022 -- Strings
const airline = 'China East Airline';
const plane = 'A320';

console.log(plane[3]);    // 0
console.log('B737'[2]);   // 3

console.log(airline.length);
console.log('ABCD'.length);

console.log(airline.indexOf('l'));    // 14
console.log(airline.lastIndexOf('i'));    // 15
console.log(airline.lastIndexOf('East'));   // 6
console.log(airline.lastIndexOf('east'));     // -1

console.log(airline.slice(6));    // East Airline
console.log(airline.slice(6, 10));    // East

console.log(airline.slice(0, airline.indexOf(' ')));     // China
console.log(airline.slice(airline.lastIndexOf(' ') + 1));     // Airline

console.log(airline.slice(-3));     // ine
console.log(airline.slice(0, -1));    // China East Airlin

// 
const checkMiddleSeat = function(seat) {
  // B & E are middle seats, check if contains
  const s = seat.slice(-1);     // use the last one
  if (s === 'B' || s=== 'E')
    console.log('U got the middle seat 😅');
  else
    console.log('U lucky dog 👯‍♀️');
}
checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('5E');

console.log(new String('steven'));      // String { "steven" }
console.log(typeof(new String('steven')));    // object

// 09023 -- Strings 2
const airline2 = 'China XiaMen Air';
console.log(airline2.toLowerCase());
console.log(airline2.toUpperCase());

// fix Capitalization in name
const passenger = 'sTeVeN'    // Steven
const passengerLower = passenger.toLowerCase();
const passengerCorrect = passenger[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

// comparing
const email = 'lix0230@gmail.com'
const loginEmail = '  LIX0230@GmaIl.com   \n';
// const lowerEmail = loginEmail.toLowerCase();
// const trimmedEmail = lowerEmail.trim();
const normalizedEmail = email.toLowerCase().trim();
console.log(normalizedEmail);

// replacing
const pricingEUR = '790,85€';
const pricingUS = pricingEUR.replace('€', '$').replace(',', '.');
console.log(pricingUS);

const announcement = 'All passengers come to boarding door 23. Boarding door 23..';
console.log(announcement.replace('door', 'gate'));    // only replace the first one
// console.log(announcement.replaceAll('door', 'gate'));
console.log(announcement.replace(/door/g, 'gate'));     // g stands for global

// Booleans
const planes = 'Airbus A320neo';
console.log(planes.includes('a320'));   // false
console.log(planes.startsWith('Air'));

if (planes.startsWith('Airb') && planes.endsWith('neo')) {
  console.log('Part of The new airbus family~');
}

// practice

const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun') ) {
    console.log('You are Not allowed on board');
  } else {
    console.log('Welcome aboard');
  }
}

checkBaggage('I have a laptop, some Food and a pocket Knife');
checkBaggage('Socks and camera');
checkBaggage('Got some snacks and a gun for protection');

// 09024 -- Strings part 3
// split & join
console.log('a+very+nice+string'.split('+'));     // Array(4) [ "a", "very", "nice", "string" ]
console.log('steven Li'.split(' '));              // Array [ "steven", "Li" ]

const [firstName, lastName] = 'steven Li'.split(' ');
const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];

  for (const n of names) {
    //namesUpper.push(n[0].toUpperCase() + n.slice[1]);
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()))
  }

  console.log(namesUpper.join(' '));
}

capitalizeName('jessica ann smith davis');
capitalizeName('jonas schmedtmann');

// Padding
const message = 'Please go to Gate 23A';
console.log(message.padStart(30, '+'));        // +++++++++Please go to Gate 23A
console.log(message.padStart(10, '+').padEnd(30, '+'));         // Please go to Gate 23A+++++++++

// practice
const masterCard = function (number) {
  const str = number + '';
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
}

console.log(masterCard(213761278465187));           // ***********5187
