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

  orderDelivery: function(obj){
    console.log(obj);
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



