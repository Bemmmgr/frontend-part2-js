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
// getCountryData('australia ');

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
/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/
const imgContainer = document.querySelector('.images');

const creatImg = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('img not found'));
    });
  });
};

/*
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};
*/
let currentImg;
creatImg('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return creatImg('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 2 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.error(err));

// 160019 - Consuming promise with AsyncAwait
// 160020 - Error handling with try-catch
//await 只暂停 当前这个 async 函数，不会卡死整个 JS 线程，外面的代码照样跑
// cant use cuz API changed from original course
const newWhereAmI = async function (country) {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse Geolocation
    const reverseGeo = await fetch(
      `https://geocode.xyz/${lat},${lng}?geoit=json`
    );
    if (!reverseGeo.ok) throw new Error('Problem getting location data');
    const dataGeo = await reverseGeo.json();

    // country data
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    if (!res.ok) throw new Error('Problem getting country data');
    console.log(res);
    // same as
    // fetch(`https://restcountries.com/v3.1/name/${country}`).then(res => console.log(res));

    const data = await res.json();
    renderCountry(data[0]);
  } catch (err) {
    console.error(`${err} 🆘`); // Cannot read properties of undefined (reading 'languages')
    renderError(`damn something went wrong(of course) ${err.message}`);
  }
};
newWhereAmI();
console.log('A');

/*
try {
  let y = 1;
  const x = 3;
  x = 2;
} catch (error) {
  alert(error.message); // Assignment to constant variable.
}
*/

/* async 决定“返回 Promise”；
await 决定“内部什么时候往下走”；
return 决定“这个 Promise 里到底包着什么值”

async/await = 在函数里面把一串 .then 展开成“看起来像同步代码”的写法而已 (优先) 本质都是基于promise
*/

// 160021 - returning values from Async Functions
// full code from course
/*
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`);
    if (!resGeo.ok) throw new Error('Problem getting location data');
    const dataGeo = await resGeo.json();

    // Country data
    const res = await fetch(
      `https://restcountries.com/v2/name/${dataGeo.country}`
    );
    if (!resGeo.ok) throw new Error('Problem getting country');
    const data = await res.json();
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(`${err} 💥`);
    renderError(`💥 ${err.message}`);

    // Reject promise returned from async function
    throw err;
  }
};

console.log('1: Will get location');
// const city = whereAmI();
// console.log(city);

// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message} 💥`))
//   .finally(() => console.log('3: Finished getting location'));

(async function () {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
  } catch (err) {
    console.error(`2: ${err.message} 💥`);
  }
  console.log('3: Finished getting location');
})();
*/

/*
const getJSON = function (url, errMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    // munaully
    if (!response.ok) throw new Error(`${errMsg} (${response.status})`);

    return response.json();
  });
};
*/

// 160022 - Running promises in parallel
const get3Countries = async function (c1, c2, c3) {
  try {
    /*
    const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
    const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
    const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);
    console.log([data1.capital, data2.capital, data3.capital]);
    */

    // one reject -> all reject
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]);
    console.log(data); // [Array(1), Array(1), Array(1)]
    console.log(data.map(d => d[0].capital)); // ['Ottawa', 'Amsterdam', 'Dodoma']
  } catch (error) {
    console.error(error);
  }
};

get3Countries('Canada', 'Netherland', 'tanzania'); // ['Ottawa', 'Amsterdam', 'Dodoma']

// 160023 - Other promises combinators race, all setled and any
// promise.race - the first fullfilled promise win race
(async function name(params) {
  const response = await Promise.race([
    getJSON(`https://restcountries.com/v2/name/Italy`),
    getJSON(`https://restcountries.com/v2/name/egypt`),
    getJSON(`https://restcountries.com/v2/name/mexico`),
  ]);
  console.log(response[0]);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    }, sec * 1000);
  });
};

Promise.race([getJSON(`https://restcountries.com/v2/name/Italy`), timeout(1)])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

// Promise.allSettled - similar to all - return all results
/*
{status: 'fulfilled', value: 'success'}
{status: 'rejected', reason: 'Error'}
{status: 'fulfilled', value: 'final success'}
*/
Promise.allSettled([
  Promise.resolve('success'),
  Promise.reject('Error'),
  Promise.resolve('final success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

// Promise.any - return first fullfilled
Promise.any([
  Promise.resolve('success'),
  Promise.reject('Error'),
  Promise.resolve('final success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

// 160024 - Challenge #3
///////////////////////////////////////
// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

/*
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

let currentImg;

// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('Image 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 2 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err => console.error(err));

// PART 1
const loadNPause = async function () {
  try {
    // Load image 1
    let img = await createImage('img/img-1.jpg');
    console.log('Image 1 loaded');
    await wait(2);
    img.style.display = 'none';

    // Load image 1
    img = await createImage('img/img-2.jpg');
    console.log('Image 2 loaded');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};
// loadNPause();

// PART 2
const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);
    imgsEl.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err);
  }
};
loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
*/
