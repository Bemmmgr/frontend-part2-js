'use strict';

// 07012 get familar with new simple project - structure
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenModal = document.querySelectorAll('.show-modal');
console.log(btnOpenModal);

for (let i = 0; i < btnOpenModal.length; i++)
  console.log(btnOpenModal[i].textContent);

// 07013 事件监听技巧，以及代码复用
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

for (let i = 0; i < btnOpenModal.length; i++)
  btnOpenModal[i].addEventListener('click', openModal);


const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// 07014 键盘事件： press esc key
document.addEventListener('keydown', function(event) {
   // console.log('A key was pressed');
   console.log(event.key);

  if(event.key === 'Escape' && !modal.classList.contains('hidden'))
    // console.log('esc key was pressed');
    closeModal();
})