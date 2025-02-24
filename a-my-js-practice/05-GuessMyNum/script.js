'use strict';

/*
// 07003 dom - introduction
console.log(document.querySelector('.message').textContent);

// 07004 dom manipulation
document.querySelector('.message').textContent = 'Corret Number!';

document.querySelector('.number').textContent = 14;
document.querySelector('.score').textContent = 10;

console.log(document.querySelector('.guess').value); //<empty string>
document.querySelector('.guess').value = 23;
*/

// 07005 event listener
// when button(check) 监测到 click event, call the function
const secretNumber = Math.trunc(Math.random() * 20) + 1;

let score = 20;

document.querySelector('.number').textContent = secretNumber;

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  if (!guess) {
    document.querySelector('.message').textContent = '🚫 No number!';
  } else if (guess === secretNumber) {
    document.querySelector('.message').textContent = '🎉 Correct Number!';
  } else if (guess > secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent = '📈 Too high!';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = '💥 u lost!';
      document.querySelector('.score').textContent = 0;
    }
  } else if (guess < secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent = '📉 Too low!';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = '💥 u lost!';
      document.querySelector('.score').textContent = 0;
    }
  }
});
