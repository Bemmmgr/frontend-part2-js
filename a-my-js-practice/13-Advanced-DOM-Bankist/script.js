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
/*
const h1 = document.querySelector('h1');

// mouseenter - hover
const alertH1 = function (e) {
  alert('AddEventListener: Great! You are reading the heading :D');
  // just appear once
  // h1.removeEventListener('mouseenter', alertH1);
};

h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);
*/

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
const randomInt = (min, max) => 
  Math.floor(Math.random() * (max - min + 1) +min);
const randomColor = () => 
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
// console.log(randomColor());

/*
document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this);        // True

  // stop propagation
  // e.stopPropagation();    // event不会被父一级listener捕捉
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Container', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Nav', e.target, e.currentTarget);
}, true);         // true -- eventListener no longer listen to bubbling event but capturing event
*/

// 13011 - Event delegation Implementing page navigation
/*
document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    console.log(id);          // #section--n

    document.querySelector(id).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
*/

// event delegation - 事件委托
// 1. Add event to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  // console.log(e.target);
  e.preventDefault();

  // matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    // console.log(id);          // #section--n
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth'
    });
  }
})

// 13012 - DOM traversing
/*
const h1 = document.querySelector('h1');

// going downwards: child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);           // NodeList(9)
console.log(h1.children);             // HTMLCollection(3)

h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('h1').style.background = 'var(--gradient-primary)';

// going sideways: siblings - direct
console.log(h1.previousElementSibling);       // null
console.log(h1.nextElementSibling);           // <h4>

console.log(h1.previousSibling);              // #text
console.log(h1.nextSibling);                  // #text

console.log(h1.parentElement.children);     // all Siblings - include itself
[...h1.parentElement.children].forEach(function (el) {
  if(el !== h1) el.style.transform = 'scale(0.5)'
})
*/

// 13013 - Building a tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// not desirable
// tabs.forEach(tab => tab.addEventListener('click', () => console.log('TAB')));

// for event delegation, we need to attach the event handler on common parent element
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  // ignore any other click results
  if(!clicked) return;

  // remove active classes
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(content => content.classList.remove('operations__content--active'));

  // Active tab
  clicked.classList.add('operations__tab--active');

  // Active content area
  console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// 13014 - Passing Arguments to event handlers
// menu fade animation
const nav = document.querySelector('.nav');

const handleHover = function (e) {
  if(e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  };
}

/*
nav.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5);
});
*/
// passing argument into handler - .bind() -> this
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// 13015 - Implementing a sticky navigation
// scroll event
/*
const initialCoords = section1.getBoundingClientRect();
const sectionTop = initialCoords.top + window.pageYOffset;
console.log(initialCoords);         // DOMRect

window.addEventListener('scroll', function () {
  console.log(window.scrollY);

  // section 1
  if (window.scrollY > sectionTop) {
    nav.classList.add('sticky')
  } else {
    nav.classList.remove('sticky');
  }
});             // 性能不好，伴随着滚动事件
*/

// 13016 - A better way the Intersection Observer API
/*
const obsCallback = function (entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
  })
}

const obsOptions = {
  root: null,                   // the element we need to intersection with target
  threshold: [0, 0.2]                // 阈值, callback function被调用
}

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);         // target
*/

// implementing ours based on obs
//const header = document.querySelector('.header')
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;        // const entry = entries[0];
  // console.log(entry);

  if(!entry.isIntersecting)
    nav.classList.add('sticky');
  else
    nav.classList.remove('sticky');
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// 13017 - Revealing elements on scroll
// select mutiple sections
const allSections = document.querySelectorAll('.section')

// callback func
const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);               //IntersectionObserverEntry

  // make sure which section is intersection
  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');

  // 
  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
})

// 13018 - Lazy loading images - big impact of performance
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log('askgdyasy', entry);

  if(!entry.isIntersecting) return

  // replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  })

  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

// 13019 - Building a slider Conponent 1
// put each slide side bby side
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots')

let currSlide = 0;
const maxSlide = slides.length;

/*
const slider = document.querySelector('.slider');
slider.style.transform = 'scale(0.4) translateX(-800px)';
slider.style.overflow = 'visible';
*/

// 0 100% 200%
const gotoSlide = function (slide) {
  slides.forEach((s, i) => 
    s.style.transform = `translateX(${100 * (i - slide)}%)`);
}

const nextSlide = function () {
  if (currSlide === maxSlide - 1) {
      currSlide =0;
    } else {
      currSlide++; 
    }

  gotoSlide(currSlide);
  activateDot(currSlide);
}

const prevSlide = function () {
  if (currSlide === 0) {
    currSlide = maxSlide - 1;
  } else {
    currSlide--;
  }
  gotoSlide(currSlide);
  activateDot(currSlide);
}

// going to next slide
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

// 13020 - Building a slider Conponent 2
// 
document.addEventListener('keydown', function (e) {
  // console.log(e);

  if (e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});

//
const creatDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    // console.log('DOTS');
    const {slide} = e.target.dataset;
    gotoSlide(slide);
    activateDot(slide);
  };
});

const activateDot = function (slide) {
  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));

  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
};

const init = function () {
  gotoSlide(0);
  creatDots();
  activateDot(0);
};
init();

// 13021 - life cycle DOM elements
// DOM content loaded
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built', e);
});

window.addEventListener('load', function (e) {
  console.log('Page fully oaded', e);
});

/*
window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = '';
})
*/

// 13022 - Efficient script loading defer and async
// Regular // Async // Defer