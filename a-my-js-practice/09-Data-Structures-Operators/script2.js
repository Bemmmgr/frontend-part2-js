'use strict';

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

rest1.owner = rest1.owner && '<ANONYMOUS>';
console.log(rest1.owner);         // undefined
rest2.owner = rest2.owner && '<ANONYMOUS>';
console.log(rest2.owner);         // <ANONYMOUS>
// rest1.owner &&= '<ANONYMOUS>';

