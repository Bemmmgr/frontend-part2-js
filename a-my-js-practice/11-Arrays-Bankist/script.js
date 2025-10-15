'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// 11008 - creating DOM elements
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal'

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__value">${mov}</div>
      </div>
    `;

    // attach html to js      -- MDN
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}
// displayMovements(account1.movements)

// console.log(containerMovements.innerHTML);


const creatUsernames = function (user) {
  // use foreach to mutate original array
  accounts.forEach(function (user) {
    user.username = user.owner
      .toLowerCase().split(' ').map(name => name[0]).join('');
  });  
}

creatUsernames(accounts);
// console.log(accounts);              // (4) [{…}, {…}, {…}, {…}]


const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} EUR`;
}
// calcDisplayBalance(account1.movements);


const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}$`;
  
  const outcomes = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}$`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * acc.interestRate / 100)
    .filter((inter, i, arr) => {
      console.log(arr);
      return inter >= 1;
    })
    .reduce((acc, inter) => acc + inter, 0);
  labelSumInterest.textContent = `${interest}$`;
};
// calcDisplaySummary(account1.movements)

// 
const updateUI = function (acc) {
    // display movements
    displayMovements(acc.movements);

    // display balance
    calcDisplayBalance(acc);

    // display summary
    calcDisplaySummary(acc);
}

// Event handler - 11019 - Implementing logiin
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // prevent form from submitting - 默认button点击(enter)会触发提交
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);

  if(currentAccount?.pin === Number(inputLoginPin.value)) {
    // display ui & welcome message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    // clear input fields
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

// 11020 - implmenting Transfers
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  console.log(amount, receiverAcc);

  if (amount > 0 && currentAccount.balance >= amount && receiverAcc && receiverAcc?.username !== currentAccount.username) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // update
    updateUI(currentAccount);
  };

  inputTransferAmount = inputTransferTo = '';
})

// 11021 - request a loan from bank
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= 0.1 * amount)) {
    // console.log('loan granted!');
    // Add movment here and update UI
    currentAccount.movements.push(amount);
    updateUI(currentAccount);

    // clear input values
    inputLoanAmount.value = '';
  }
})

// 11020 - findIndex Method
btnClose.addEventListener('click', function(e) {
  e.preventDefault();         // 阻止默认，自定义操作
  // console.log('delete');
  if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) {
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);
    console.log(index);

    // delete account
    accounts.splice(index, 1);

    // hide UI
    containerApp.style.opacity = 0;
  };
  inputCloseUsername.value = inputClosePin.value = '';
})

// 11024 - sort button
// add state monitor
let sorted = false
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);   */

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// 11003 - Array methods
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(2));          // ['c', 'd', 'e']
console.log(arr.slice(1,3));        // ['b', 'c']
console.log(arr.slice(-3));         // ['c', 'd', 'e']
console.log(arr.slice(1, -2));      // ['b', 'c']
console.log([...arr]);              // ['a', 'b', 'c', 'd', 'e']

// SPLICE
//console.log(arr.splice(2));       // ['c', 'd', 'e']  original: ['a', 'b']
arr.splice(-1);                     // remove last one:['a', 'b', 'c', 'd']
arr.splice(1, 2)                    // ['a', 'd']
console.log(arr);             

// REVERSE
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());              // ['f', 'g', 'h', 'i', 'j']
console.log(arr2);                        // original: ['f', 'g', 'h', 'i', 'j']

// CONCAT
const sentence = arr.concat(arr2);
console.log(sentence);                    // ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
console.log([...arr, ...arr2]);           // same

// JOIN
console.log(sentence.join(' - '));        // string: a - b - c - d - e - f - g - h - i - j

// check MDN every time

// 11004 new AT method
const arrAT = [23, 74, 62];
console.log(arrAT[0]);            // 23
console.log(arrAT.at(1));         // 74

// 3 ways to get last element
console.log(arrAT[arrAT.length - 1]);       // 62
console.log(arrAT.slice(-1)[0]);
console.log(arrAT.at(-1));
// suitable for strings
console.log('I am Steven Li'.at(-1));       // i


// 11005 Looping arrays: forEach
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

// forEach achieve same effect
movements.forEach(function (movement, index, array) {
  if (movement > 0) {
    console.log(`Movement ${index + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${index + 1}: You withdrew ${Math.abs(movement)}`);
  }
})
/*
  0: function(200)
  1: function(450)
  2: function(400)
  3: function(3000)
  ...
  continue & break do not work in forEach statement
*/

// 11006 forEach - Sets & Maps
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);    
  /*  
    USD: United States dollar
    EUR: Euro
    GBP: Pound sterling
  */
})

const currenciesUnique = new Set(['USD', 'GBP', 'EUR', 'CNY', 'JPR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);    
  /*  
    USD: USD
    EUR: EUR
    key is same as value
  */
})

///////////////////////////////////////
// 11009 - Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorr = dogsJulia.slice();      // copy
  dogsJuliaCorr.splice(0, 1);
  dogsJuliaCorr.splice(-2);
  console.log(dogsJuliaCorr);

  const dogs = dogsJuliaCorr.concat(dogsKate);
  console.log(dogs);

  dogs.forEach(function (dog, i) {
    if (dog >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy 🐕`);
    }
  })
}

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);


// Data transformations: Map / Filter / Reduce - 11010
const eurToUsd = 1.1;
/*
  const movementsUSD = movements.map(function (mov) {
    return mov * eurToUsd;
  })
*/
const movementsUSD = movements.map(mov => mov * eurToUsd);
console.log(movements);
console.log(movementsUSD);

// another way
const movementsUSDfor = [];
for (const mov of movements) 
  movementsUSDfor.push(mov * eurToUsd);
console.log(movementsUSDfor);

const movementsDescriptions = movements.map(
  (mov, i, arr) => 
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrawl'} ${Math.abs(mov)}`
);
console.log(movementsDescriptions);
/*
(8) ['Movement 1: You deposited 200', 'Movement 2: You deposited 450', 'Movement 3: You withdrawl 400', 'Movement 4: You deposited 3000', 'Movement 5: You withdrawl 650', 'Movement 6: You withdrawl 130', 'Movement 7: You deposited 70', 'Movement 8: You deposited 1300']
*/


// 11012 - Computing usernames
// const user = 'Steven Thomas Williams';      // stw

// const username = user.toLowerCase().split(' ').map(function (name) {
/*
const username = user.toLowerCase().split(' ').map(name => name[0]).join('');
console.log(username);        // (3) ['s', 't', 'w']
*/

// 11013 - filter method
const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);           // (5) [200, 450, 3000, 70, 1300]

const withdrawls = movements.filter(mov => mov < 0);
console.log(withdrawls);              // (3) [-400, -650, -130]


// 11014 - reduce method - accumulator like snowball
/*
const balance = movements.reduce(function (accumulator, current, index, array) {
  console.log(`Iteration ${index}: ${accumulator}`);
  return accumulator + current;
}, 0);          // initialValue of acculumator set to 0;
*/
const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance);

//same thing with for loop
let balance2 = 0;
for(const mov of movements)
  balance2 += mov;
console.log(balance2);

// Maximum value
const maxValue = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log(maxValue);


///////////////////////////////////////
// 11015 - Coding Challenge #2
/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map(age => age <= 2 ? 2 * age : 16 + age * 4);
  console.log(humanAges);
  
  const adultsDogs = humanAges.filter(age => age >= 18);
  console.log(adultsDogs);

  const average = adultsDogs.reduce((acc, age, i, arr) => acc + age, 0) / arr.length;
  return average;
}
const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);          // 44 47.333333333333336

// 11016 - chaining method
// pipeline
const totalDepositUsd = movements
  .filter(mov => mov > 0)
  // .map(mov => mov * eurToUsd)
  .map((mov, i, arr) => {
    // console.log(arr);
    return mov * eurToUsd;
  })
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositUsd);       // 5522.000000000001


// 11017 - coding challenge #3
// 11018 - find method
const firstWithdrawl = movements.find(mov => mov < 0);
console.log(movements);          // [200, 450, -400, 3000, -650, -130, 70, 1300]
console.log(firstWithdrawl);      // -400   element itself

console.log(accounts);      // an array and each element is an array
const account = accounts.find(acc => acc.owner === 'Steven Thomas Williams');
console.log(account);


// 11021 - some是否有至少一个元素满足条件 & every是否所有元素都满足条件 methods
console.log(movements);
console.log(movements.includes(500));         // equality -- false

const anyDeposit = movements.some(mov => mov > 2000);         // condition 
console.log(anyDeposit);                // true

console.log(movements.every(mov => mov > 1000));
console.log(account4.movements.every(mov => mov > 10));         // true

// separate call back - reuse mind  注意高阶函数的写法
const depositX = n => mov => mov > n;
console.log(account4.movements.every(depositX(10)));


// 11023 - flat & flatMap Method
const arrNew = [[1, 2, 3], [4, 5, 6], 7, 8];
const arrDeep = [[[1, 2], 3], [4, 5, 6], 7, 8];
console.log(arrNew.flat());           // 1 is default - [1, 2, 3, 4, 5, 6, 7, 8]
console.log(arrDeep.flat());          // [Array(2), 3, 4, 5, 6, 7, 8]
// 指定展开的层数
console.log(arrDeep.flat(2));         // [1, 2, 3, 4, 5, 6, 7, 8]

/*
const accountMovments = accounts.map(acc => acc.movements);
console.log(accountMovments);          // (4) [Array(8), Array(8), Array(8), Array(5)] - 整合所有 - nested structure - arr 集合

const allMovments = accountMovments.flat();           // 整合成一个集合
console.log(allMovments);
// reduce 累(加)器
const overallBalance = allMovments.reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);          // 17840
*/

// combined - flatMap - only goes 1 level deep - cannnot be changed
// const overallBalance = accounts.map(acc => acc.movements).flat().reduce((acc, mov) => acc + mov, 0);
const overallBalance = accounts.flatMap(acc => acc.movements).reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);          // 17840


// 11024 - sorting arrays
const owners = ['Jonas', 'Adam', 'Martha'];
console.log(owners.sort());               // A to Z, ['Adam', 'Jonas', 'Martha'], mutate original

// numbers
console.log(movements);                   // [200, 450, -400, 3000, -650, -130, 70, 1300]
// console.log(movements.sort());            // [-130, -400, -650, 1300, 200, 3000, 450, 70] - convert to strings, then sorting
/*
movements.sort((a, b) => {
  if (a > b) {
    return 1;          // return > 0 - switch order
  }
  if (b > a) {
    return -1;        // return < 0 - keep order
  }
})
*/
movements.sort((a, b) => a - b);
console.log(movements);


// 11025 - creating and filling arrays
const x = new Array(7);
console.log(x);             // [empty × 7]
console.log(x.fill(0).map(() => 1));          // [1, 1, 1, 1, 1, 1, 1]
console.log(x.fill(2, 3, 5));                 // start from 3 to 5, [0, 0, 0, 2, 2, 0, 0]

// array.from
const y = Array.from({length: 7}, () => 1);
console.log(y);                       // (7) [1, 1, 1, 1, 1, 1, 1]

const z = Array.from({length: 7}, (current, index) => index + 1);
console.log(z);                       // (7) [1, 2, 3, 4, 5, 6, 7]

labelBalance.addEventListener('click', function (e) {
  const movmentsUI = Array.from(document.querySelectorAll('.movements__value'));
  console.log(movmentsUI.map(elements => Number(elements.textContent.replace('EUR', ''))));       // ['1300', '70', '-130', '-650', '3000', '-400', '450', '200']
});

// 11027 - Array method practice
// 1.
const bankDepositSum = accounts.flatMap(acc => acc.movements).filter(mov => mov > 0).reduce((sum, cur) => sum + cur, 0);
console.log(bankDepositSum);                  // 25180

// 2.
const numDeposits1000 = accounts.flatMap(acc => acc.movements).filter(mov => mov >= 1000).length;
console.log(numDeposits1000);         // 6
// different way
// const numDeposits02 = accounts.flatMap(acc => acc.movements).reduce((count, current) => (current >= 1000 ? count + 1 : count), 0);
const numDeposits02 = accounts.flatMap(acc => acc.movements).reduce((count, current) => (current >= 1000 ? ++count : count), 0);
console.log(numDeposits02);

// 3.
const sums = accounts.flatMap(acc => acc.movements).reduce((sums, cur) => {
  // cur > 0 ? sums.deposits += cur : sums.withdrawals += cur;
  sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
  return sums;            // 必须
}, {deposits: 0, withdrawals: 0})
console.log(sums);                  // {deposits: 25180, withdrawals: -7340}

// 4.
// this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'in', 'the'];
  const capitzalize = str => str[0].toUpperCase() + str.slice(1);
  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => exceptions.includes(word) ? word : capitzalize(word))
    .join(' ');

  return capitzalize(titleCase);
}
console.log(convertTitleCase('this is a nice title'));

// challenge #4 11028 skipped
