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
// old school way
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`); // public apis
  request.send();
  request.addEventListener('load', function () {
    console.log(this.responseText); // JSON
    // convert JSON
    const data = JSON.parse(this.responseText);
    const [country] = data;
    console.log(data); // Array - 0: {name: {…}, tld: Array(1), cca2: 'PT', ccn3: '620', cioc: 'POR', …}

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
    <article class="country">
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
  });
};
getCountryData('nl');
getCountryData('portugal');
getCountryData('fra');

// 16005 -
// 16006 -
// 16007 -
// 16008 -
// 16009 -
// 160010 -
// 160011 -
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
