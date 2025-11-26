'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

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
  countriesContainer.style.opacity = 1;
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
const request = fetch('https://restcountries.com/v3.1/name/netherlands');
console.log(request); // Promise {<pending>} - Promise = “可链式调用、可集中处理错误”的异步结果容器 - container for asy future value

const getCountryData = function (country) {
  // country 1
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json()) // asynchronous func
    .then(data => {
      const [countryData] = data;
      renderCountry(countryData);
      const neighbor = countryData.borders?.[0];

      if (!neighbor) return null;

      // second ajax call - country 2
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`);
    })
    .then(response => {
      if (!response) return null;
      return response.json();
    })
    .then(data => {
      if (!data) return;
      renderCountry(data[0], 'neighbour');
    });
};
getCountryData('germany');

// 160011 - Handling rejected promises
// 160012 -
// 160013 -
// 160014 -
// 160015 -
// 160016 -
// 160017 -
// 160018 -
// 160019 -
// 160020 -
// 160021 -
// 160022 -
// 160023 -
// 160024 -
