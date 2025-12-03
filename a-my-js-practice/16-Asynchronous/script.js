'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

///////////////////////////////////////
// 16003 - Asynchronous, AJAX & APIs
// callback function / eventLitener alone does not make code asynchronous
/*
Asynchronous JavaScript And XML - AJAX
making asynchronous HTTP requests, and uses the new content to update the relevant parts of the page without requiring a full page load.

Application Programming Interface - API
*/

// 16005 - First AJAX call XMLhttpRequest
// 16006 - Request & Response
// 16007 - Callback Hell - nested callback
// old school way
const renderCountry = function (country, className = '') {
  //
  const languages = country.languages
    ? Object.values(country.languages).join(', ')
    : 'N/A';

  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map(c => c.name)
        .join(', ')
    : 'N/A';

  const html = `
    <article class="country ${className}">
        <img class="country__img" src="${country.flags.png}" />
        <div class="country__data">
        <h3 class="country__name">${country.name.common}</h3>
        <h4 class="country__region">${country.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +country.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${languages}</p>
        <p class="country__row"><span>💰</span>${currencies}</p>
        </div>
    </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};

/*
const getCountryAndNeighbour = function (country) {
  // AJAX call
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`); // public apis
  request.send();
  request.addEventListener('load', function () {
    console.log(this.responseText); // JSON
    // convert JSON
    const data = JSON.parse(this.responseText);
    const [country] = data; // data - 数组
    console.log(data); // Array - 0: {name: {…}, tld: Array(1), cca2: 'PT', ccn3: '620', cioc: 'POR', …}

    // render country
    renderCountry(country);

    // get neighbor country - optional chaining - data.borders 不存在 即 undefined
    const neighbor = country.borders?.[0];
    if (!neighbor) return;

    // Ajax call 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbor}`); // public apis
    request2.send();

    request2.addEventListener('load', function () {
      // console.log(this.responseText);
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);

      // render
      renderCountry(data2, 'neighbour');
    });
  });
};
getCountryAndNeighbour('nl');
*/

// 16008 - Promises and fetch API
// 16009 - Consuming promises
// 160010 - Chaining promises
// 160011 - Handling rejected promises
// 160012 - Throwing errors manually
const request = fetch('https://restcountries.com/v3.1/name/netherlands');
console.log(request); // Promise {<pending>} - Promise = “可链式调用、可集中处理错误”的异步结果容器 - container for asy future value

const getJSON = function (url, errMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    // munaully
    if (!response.ok) throw new Error(`${errMsg} (${response.status})`);

    return response.json();
  });
};

/*  ***keep as reference***
const getCountryData = function (country) {
  // country 1
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => {
      // munaully
      if (!response.ok)
        throw new Error(`Country not found(${response.status})`);

      return response.json();
    }) // asynchronous func
    .then(data => {
      const [countryData] = data;
      renderCountry(countryData);
      const neighbor = countryData.borders?.[0];

      if (!neighbor) return null;

      // second ajax call - country 2
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`);
    })
    .then(response => {
      // munaully
      if (!response.ok)
        throw new Error(`Country not found(${response.status})`);

      return response.json();
    })
    .then(data => {
      if (!data) return;
      renderCountry(data[0], 'neighbour');
    })
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong: ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
*/
const getCountryData = function (country) {
  // country 1
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      const [countryData] = data;
      renderCountry(countryData);
      const neighbor = countryData.borders?.[0];

      // if (!neighbor) return null;
      if (!neighbor) throw new Error('No neighbour found!');

      // second ajax call - country 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbor}`,
        'Country not found'
      );
    })
    .then(data => {
      if (!data) return;
      renderCountry(data[0], 'neighbour');
    })
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong: ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('germany');
});

// getCountryData('assdf'); // script.js:108  GET https://restcountries.com/v3.1/name/assdf 404 (Not Found)
getCountryData('australia ');

// 160013 - Challenge #1
/* 
 build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}.
The AJAX call will be done to a URL with this format: https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=52.508&longitude=13.381. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474
*/

const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(response => {
      if (!response.ok)
        throw new Error(`problem with geocoding${response.status}`);
      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.region}`);
    })
    .catch(err => console.error(`${err.message}`));
};
whereAmI(52.508, 13.381);
// no budget for geocding pricing

// 160014 - Asynchronous behind the scenes - The event loop
// 160015 - The event loop in practice
/*
当调用栈清空后，事件循环会先把 Microtasks Queue（微任务队列）里的所有任务都执行完，
然后才会去从 Callback Queue（也叫 Task Queue / Macrotask Queue）里取回调执行。

Promise 的 .then / .catch / .finally 回调用的就是 Microtasks Queue，
setTimeout / setInterval / DOM 事件回调 等用的是 Callback Queue。
*/
console.log('Test start');
setTimeout(() => console.log('0 second timer'), 0);
Promise.resolve('Resloved promise 1').then(res => console.log(res));

Promise.resolve('Resloved promise 2').then(res => {
  for (let index = 0; index < 10000; index++) {}
  console.log(res);
});
console.log('Test end');

// 160016 - Building a simple Promise
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening~🍱');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You win~🤫'); // fulfilled
    } else {
      reject(new Error('You lose~😢')); // reject
    }
  }, 2000);
});
lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// promisify setTimeout()
// 把 setTimeout 包装成一个 返回 Promise 的“延时函数”，然后用 then 链式地“排队等待
// Promise 写法的好处：异步流程“串起来”像写同步代码一样 - avoid callback hill
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(2)
  .then(() => {
    console.log('I waited for 2 seconds');
    return wait(1);
  })
  .then(() => {
    console.log('I waited for 1 second');
  });

// 160017 - Promisify the geolocation API
// callback based API
// promise based API
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    /*
    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      err => reject(err)
    );
    */
    // same
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
getPosition().then(pos => console.log(pos));

// 160018 - cHALLENGE #2
// 160019 - Consuming promise with AsyncAwait
// 160020 -
// 160021 -
// 160022 -
// 160023 -
// 160024 -
