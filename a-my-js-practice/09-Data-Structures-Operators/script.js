'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const italianFoods = new Set([
  'pasta',
  'gnocchi',
  'tomatoes',
  'olive oil',
  'garlic',
  'basil',
]);

const mexicanFoods = new Set([
  'tortillas',
  'beans',
  'rice',
  'tomatoes',
  'avocado',
  'garlic',
]);

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  order: function(starterIndex, mainIndex){
    // this 引用调用该方法的对象: restaurant
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function({starterIndex=1, mainIndex=0, time, address})     // 使用对象的解构
  {
    console.log(`Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`);
  },

  orderPista: function(ing1, ing2, ing3){
    console.log(`Here is ur pista with ${ing1}, ${ing2} and ${ing3},`);
  },

  orederPasta: function (mainIng, ...restIng) {
    console.log(mainIng);
    console.log(restIng);
  },

};

// 09003 destructuring 解构
const arr = [2, 4, 6];
const a = arr[0];
const b = arr[1];
const c = arr[2];

const [x, y, z] = arr;
console.log(x, y,z);    // destructuring 2, 4, 6


let [first, , second] = restaurant.categories;
console.log(first, second);     // Italian Vegetarian
[first, second] = [second, first];
console.log(first, second);     // Vegetarian Italian

// receive 2 return values
const [starter, mainCourse] = restaurant.order(1, 2);
console.log(starter, mainCourse);

// nested destructuring   嵌套解构
const nested = [2, 4, [5, 6]];
// const [i, , j] = nested;
// console.log(i, j);
const [i, ,[j, k]] = nested;
console.log(i, j, k);     // 2, 5, 6

// default values
const[p, q, r] = [8, 9];
console.log(p, q, r);     // 8, 9, undefined


// 09005 destructuring objects
const {name, openingHours, categories} = restaurant;
console.log(name, openingHours, categories);

const {name: restaurantName, openingHours: hours, categories: tags} = restaurant;
console.log(restaurantName, hours, tags);

const { mainMenu: Menu, starterMenu: starters = []} = restaurant;
console.log(Menu, starters);

// mutating variables
let m = 111;
let n = 999;
const obj = {
  m: 25,
  n: 17,
  o: 12
};

({m, n} = obj);       // 注意括号
console.log(m, n);    // 25, 17

// nested objects
let {fri: {open, close}} = openingHours;
let {fri: {open: o, close: d},} = openingHours;
console.log(open, close);     // fri: {open: 11, close: 23}  11 23
console.log(o, d);

restaurant.orderDelivery({
  time: '20:39',
  address: 'klooosterpoort',
  mainIndex: 2,
  starterIndex: 3,
});

restaurant.orderDelivery({
  address: 'klooosterpoort',
  mainIndex: 1,
});       // 有默认值显示，无默认值undefine


// 09006 - the spread operator
const arrX = [7, 8, 9]
const badArrX = [5, 6, arrX[0], arrX[1], arrX[2]];
console.log(badArrX);

const newArrX = [5, 6, ...arrX];    //take all elements and write individually 拿出所有元素拼接
console.log(newArrX);        // [5, 6, 7, 8, 9]
console.log(...newArrX);    // 5 6 7 8 9

const newMenu = [...restaurant.mainMenu, 'Goncci'];
console.log(newMenu);       // ['Pizza', 'Pasta', 'Risotto', 'Goncci'] - new arr

// copy array
const mainMenuCopy = [...restaurant.mainMenu];

// join 2 arrays
const menuJ = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menuJ);

// Iterables: arrays, strings, maps, sets, Not objects
const str = 'steven';
const letters = [...str, '', 'A'];
console.log(letters);     // ['s', 't', 'e', 'v', 'e', 'n', '', 'A']

// connot use in ${}
//console.log(`${...str} Li`);

// const ingredients = 
// [ prompt("Let\'s make psita! ingredient 1 ?"), 
//   prompt("ingredient 2 ?"),
//   prompt("ingredient 3 ?"),
// ]
// console.log(ingredients);         // 手动输入: ['a', 'b', 'c']

// same result
// restaurant.orderPista(ingredients[0], ingredients[1], ingredients[2]);
// restaurant.orderPista(...ingredients);


// Objects
const newRestaurant = {...restaurant, founder: 'Li family', foundedIn: 1998}
console.log(newRestaurant);

const copyRestaurant = {...restaurant};
copyRestaurant.name = 'Ristorante Rome';
console.log(copyRestaurant.name, '/', restaurant.name);    // Ristorante Rome / Classico Italiano

// spread  
const arrr = [1, 2, ...[3, 4]];
console.log(arrr);      // [1, 2, 3, 4]

const [v,s, ...others] = [1, 2, 3, 4, 5];
console.log(v, s, others);          // 1 2 [3, 4, 5]

const [Pizza, ,Risotto, ...otherFood] = [...restaurant.mainMenu, ...restaurant.starterMenu]
console.log(Pizza, Risotto, ...otherFood);      //Pizza Risotto Focaccia Bruschetta Garlic Bread Caprese Salad

// objects
const {sat, ...otherTime} = restaurant.openingHours;
console.log(sat, otherTime);

// functions
const add = function(...numbersNew){
  // ...numbers 整合成一个[]
  let sum = 0;
  for (let y = 0; y < numbersNew.length; y++)
    sum += numbersNew[y];
  console.log(sum);
}

add(4, 5, 2, 7, 9, 3);

const nn = [15, 76, 21];
console.log(add(...nn));

//
restaurant.orederPasta('mushrooms', 'onions', 'cheese', 'bacon');
restaurant.orederPasta('cheese');

// 09008 short circuiting && and    短路
// Use ANY data type, return ANY data type, short-circuiting
console.log('-------------OR--------------');
console.log(3 || 'Jonas');
console.log('' || 'Jonas');
console.log(true || 0);
console.log(undefined || null);

console.log(undefined || 0 || '' || 'Hello' || 23 || null);

// restaurant.numGuests = 8;
const guest1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guest1);

const guest2 = restaurant.numGuests || 6;
console.log(guest2);

console.log('-------------AND--------------');
console.log(0 && 'li');   // 0
console.log(3 && 'li');   // li

console.log(0 && '' && 'Hello' && 23 && null);    //0

// practical
if(restaurant.orderPista) {
  restaurant.orderPista('pussy');
}
restaurant.orderPista && restaurant.orderPista('mushrooms');

console.log('-------------Nullish--------------');
// Only when values are null, undefined, then contunue. Not 0 or ''
restaurant.numGuests = 0;
const guest3 = restaurant.numGuests ?? 3;
console.log(guest3);        // 0

