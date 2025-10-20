'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2025-10-15T23:36:17.929Z',
    '2025-10-19T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) => 
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  // console.log('*********' + daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yestoday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    /*
    const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
    */
    return new Intl.DateTimeFormat(locale).format(date);
  }
}

// 12012
const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(value);
}


const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);
    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

// 120014 - Implementing a countdown timer
const startLogouttimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // In each call, print the remaining time
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 seconds, stop timer and log out user
    if(time === 0) {
      clearInterval(timer);
      
      labelWelcome.textContent = 'Log in to get started'
      containerApp.style.opacity = 0;
    }

    // decrease 1s
    time--;
  };

  // set time to 5 minutes
  let time = 120;

  // call the timer every second
  tick();
  const timer = setInterval(tick, 1000);     // 1000是一秒

  return timer;
}

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

// 12009
// fake always logged in
/*
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;
*/

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // current date & time
    const now = new Date();
    /*
    const day = `${now.getDate()}`.padStart(2, 0);
    const month = `${now.getMonth() + 1}`.padStart(2, 0);
    const year = now.getFullYear();
    const hours = `${now.getHours()}`.padStart(2, 0);
    const min = `${now.getMinutes()}`.padStart(2, 0);

    labelDate.textContent = `${day}/${month}/${year}, ${hours}:${min}`;
    */
    // Experimenting with api 12011

    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'long'
    }
    // get from users browser
    // const locale = navigator.language;
    // console.log(locale);

    // labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);
    // labelDate.textContent = new Intl.DateTimeFormat('en-US', options).format(now);
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Timer
    if(timer) clearInterval(timer);
    timer = startLogouttimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = startLogouttimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // 12013
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // Reset timer
      clearInterval(timer);
      timer = startLogouttimer();
    }, 2500);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
// 12003 - converting & checking numbers
console.log(23 === 23.0);
console.log(0.1 + 0.2);             // 0.30000000000000004

// conversion
console.log(Number('23'));
console.log(+'23');                 // 强制转换

// parsing  解析
console.log(Number.parseInt('301px', 10));          // 301, 十进制
console.log(Number.parseInt('a20'));          // NaN - must start with a number

console.log(Number.parseFloat('   2.5rem', 10));        // 2.5
// check any value is not a number / NaN
console.log(Number.isNaN(20));                // false - is a number
console.log(Number.isNaN(+'20x'));            // true - is NaN
console.log(Number.isNaN(23 / 0));            // false - infinity

// checking if value is number
console.log(Number.isFinite(20));             // true - 是有限的
console.log(Number.isFinite('20'));             // false
console.log(Number.isFinite(+'20x'));           // false
console.log(Number.isFinite(23 / 0));           // false

console.log(Number.isInteger(23));
console.log(Number.isInteger(23 / 0));

// 12004 - Math & Rounding
console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
console.log(8 ** (1 / 3));

console.log(Math.max(7, 11, 34, 28, 19, 2, '23'));            // 34
console.log(Math.min(7, 11, 34, 28, 19, 2, '23'));            // 2

console.log(Math.PI);                                   // 3.141592653589793 
console.log(Math.PI * Number.parseFloat('10px') ** 2);      // 314.1592653589793

console.log(Math.trunc(Math.random()* 6) + 1);          // 掷骰子
// number between min and max
const randomInt = (min, max) => 
  Math.trunc(Math.random() * (max - min + 1)) + min;
console.log(randomInt(1, 6));

// rounding integers
console.log(Math.trunc(101.3));           // 101
console.log(Math.trunc(101.9));           // 102

console.log(Math.ceil(80.3));             // 81
console.log(Math.ceil(80.9));             // 81

console.log(Math.floor(30.3));            // 30
console.log(Math.floor(30.9));            // 30

console.log(Math.trunc(-101.3));          // -101
console.log(Math.floor(-30.9));           // -24
console.log(Math.ceil(-80.9));            // -80

// rounding decimals
console.log((21.7).toFixed(0));     // tofixed return string    22
console.log((21.7).toFixed(3));     // tofixed return string    21.700
console.log(+(21.7).toFixed(3));     // return number 21.7   


// 12005 - Remainder Operator 余数运算符
console.log(5 % 2);               // 1
const isEven = n => n % 2 === 0;
console.log(isEven(7));         // false

// practice
labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if(i % 3 === 0) row.style.backgroundColor = 'orangered';
  });
});


// 12006 - Numeric separators - 231,235,489,000
const diameter = 231_235_489_000;
console.log(diameter);

const priceCents = 345_99;
console.log(priceCents);

const transferFee1 = 15_00;
const transferFee2 = 1_500;         // same value

const PI = 3.14_15_92            
console.log(PI);                    // position of _

console.log(Number('230_000'));     // NaN - none useable in string


// 12007 - bigInt
// the biggest number js can represent
console.log(2 ** 53 - 1);                     // 9007199254740991
console.log(Number.MAX_SAFE_INTEGER);
// any bigger number  -  unsafe

// bigInt - n 结尾的数字字面量表示一个 BigInt（任意精度整数）
console.log(37593569135460949751324675318);           // 3.759356913546095e+28
console.log(BigInt(42343212390979));                  // 42343212390979n

// operations
console.log(10000n + 10000n);                        // 20000n
console.log(BigInt(98) * 100000n);                   // 9800000n

console.log(20n > 15);              // true
console.log(20n === 20);            // false

console.log(typeof 20n);            // bigint
console.log(20n == 20);             // true

const huge = 235487623531n;
console.log(huge + 'is a really big number!!');     // 235487623531is a really big number!!
// cannot aplly math func

// Divisions
console.log(10n / 3n);              // 3n


// 12008 - Creating dates
/*
// 1.
const now = new Date();
console.log(now);           // Sat Oct 18 2025 01:58:06 GMT+0200 (Central European Summer Time)

// 2. parse time
console.log(new Date('June 28 2025 08:43:26'));
console.log(new Date('December 24 2021'));
// Fri Dec 24 2021 00:00:00 GMT+0100 (Central European Standard Time)

// Mon Nov 18 2019 22:31:17 GMT+0100 (Central European Standard Time)
console.log(new Date(account1.movementsDates[0]));

// 3.
// Thu Nov 19 2037 15:23:05 GMT+0100 (Central European Standard Time)
console.log(new Date(2037, 10, 19, 15, 23 ,5));       // month is 0 base, 10 -> November

// 4.
// Thu Jan 01 1970 01:00:00 GMT+0100 (Central European Standard Time)
console.log(new Date(0));
// 3 days later: Sun Jan 04 1970 01:00:00 GMT+0100 (Central European Standard Time)
console.log(new Date(3 * 24 * 60 * 60 * 1000));       // 259200000
*/
const future = new Date(2037, 10, 19, 15, 23, 5);
console.log(future);
console.log(future.getFullYear());        // 2037
// month / date / day / hours / minutes / seconds / 
console.log(future.toISOString());          // 2037-11-19T14:23:05.000Z

console.log(future.getTime());              // 2142253385000
console.log(new Date(2142253385000));

console.log(Date.now());                    // timestamps - 1760748814036

future.setFullYear(2038);
console.log(future);            // Fri Nov 19 2038 15:23:05 GMT+0100 (Central European Standard Time)


// 12009 - adding dates to bankist -> bankist app
// 12010 - operations with dates
console.log(+future);               // 2173789385000

const calcDaysPassed = (date1, date2) => 
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

const day1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24));
console.log(day1);                  // 864000000 / 10

// 120011 - Internationalizing Dates Intl
// 120012 - Internationalizing Numbers Intl
/*
const  options = {
  style: 'unit',
  unit: 'mile-per-hour',
}
  */
const  options = {
  style: 'currency',
  unit: 'celsius',
  currency: 'EUR',
  // useGrouping: false,
}

const num = 3092875.45
console.log('US: ', new Intl.NumberFormat('en-US', options).format(num));            // 3,092,875.45
console.log('Germany: ', new Intl.NumberFormat('de-DE').format(num));       // 3.092.875,45
console.log(navigator.language, new Intl.NumberFormat(navigator.language).format(num));


// 120013 - Timers set timeout & setInterval
// 异步 在执行时传入 callback 的参数
const ingredients = ['olives', 'spinach'];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} & ${ing2} 🍕`),
  3000,
  ...ingredients
);        // 3 seconds
console.log('Waiting...');            // Asynchchronous

/*
function delayedFunction(ing1, ing2) {
  console.log(`Here is your pizza with ${ing1} & ${ing2} 🍕`);
}
setTimeout(delayedFunction, 3000, 'olives', 'spinach');
*/

if (ingredients.includes('spinach')) {
  clearTimeout(pizzaTimer);
};

// setInterval    设置间隔
/*
setInterval(function () {
  const now = new Date();
  console.log(now);
}, 3000);
*/
