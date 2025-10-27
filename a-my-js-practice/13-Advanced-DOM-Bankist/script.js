'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

/*
for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);
*/

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/////////////////////////////////////////////////////////////////
///////////////////////////Lectures//////////////////////////////
// 13005 - Selecting, creating & deleting Elements
// select
console.log(document.documentElement); // html
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const sections = document.querySelectorAll('.section');
console.log(sections); // NodeList(4)

document.getElementById('#section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons); // HTMLCollection(9)

console.log(document.getElementsByClassName('btn')); // HTMLCollection(5)

// creat & insert
// .insertAdjacentHTML
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookied for improved functionality and analytics.';
message.innerHTML =
  'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// prepend as first child / dom elements is unique
// header.prepend(message);
// header.append(message.cloneNode(true));
header.append(message);

// header.before(message); // before the header
// header.after(message);

// Delete
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // old way
    // message.parentElement.removeChild(message);
    message.remove();
  });

// 13006 - Style, attributes & classes
// style - inline styles set directly and munually by ourselves
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.color); // nothing - hidden inside of class / dont exist

// get non-inline style
console.log(getComputedStyle(message).color); // rgb(187, 187, 187)
console.log(getComputedStyle(message).height); // 49px

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 20 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// attributes
const logo = document.querySelector('.nav__logo');
// only read standard attributes
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);              // nav__logo

logo.alt = 'Beautiful minimalist logo';
console.log(logo.alt);

// non stanard
console.log(logo.designer);               // undefined
console.log(logo.getAttribute('designer'));                   // Jonas
logo.setAttribute('company', 'Bankist');

console.log(logo.src);
console.log(logo.getAttribute('src'));

const link = document.querySelector('.twitter-link');
console.log(link.href);
console.log(link.getAttribute('href'));             // both absolute, so same

// data-: data attributes
console.log(logo.dataset.versionNumber);             // convert to camel case 驼峰命名 - 3.0

// classes
/*
logo.classList.add('s', 'b');
logo.classList.remove();
logo.classList.toggle();
logo.classList.contains();
*/

// 13007 - Implement smooth scrolling
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  //返回一个包含元素 大小（width / height） 和 相对于视口（viewport）的位置（top / left 等） 的对象。
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);                    // DOMRect

  // button event
  console.log(e.target.getBoundingClientRect());        // DOMRect

  // 当前窗口到顶部的距离
  console.log('Current scroll (X/Y)', window.pageXOffset, pageYOffset);

  // 当前视窗的 高/宽
  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // scrolling
  // top relative of viewport, not document / old way
  /*
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });
  */

  section1.scrollIntoView({
    behavior: "smooth"
  })
});

// 13008 - Types of event & event handlers
const h1 = document.querySelector('h1');

// mouseenter - hover
const alertH1 = function (e) {
  alert('AddEventListener: Great! You are reading the heading :D');
  // just appear once
  // h1.removeEventListener('mouseenter', alertH1);
};

h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// old ways
/*
h1.onmouseenter = function (e) {
  alert('AddEventListener: Great! You are reading the heading :D');
}
*/

// third way - not use
// html onclick alert

// 13009 - Event propagation bubbling & capturing
// Theoretical course

// 13010 - Event propagation in practice


// 13011 - Implement smooth scrolling
// 13012 - Implement smooth scrolling
// 13013 - Implement smooth scrolling
// 13014 - Implement smooth scrolling
// 13015 -
// 13016 -
// 13017 -
// 13018 -
// 13019 -
// 13020 -
// 13021 -
// 13022 -
