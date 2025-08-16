'use strict';

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const score = document.querySelectorAll('.score');
const current = document.querySelectorAll('.current-score');
const dice = document.querySelector('.dice');
const play = document.querySelectorAll('.player');

let num;
let playing = true;

score[0].textContent = 0;
score[1].textContent = 0;
dice.classList.add('hidden');

const isPlayer = function () {
  if (play[0].classList.contains('player--active')) {
    return 0;
  }
  return 1;
};

const exchange = function (i) {
  play[i].classList.remove('player--active');
  play[1 - i].classList.add('player--active');
};

const roll = function () {
  if (playing) {
    num = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove('hidden');
    dice.src = `dice-${num}.png`;

    const i = isPlayer();
    if (num === 1) {
      current[i].textContent = 0;
      exchange(i);
    } else {
      current[i].textContent = Number(current[i].textContent) + num;
    }
  }
};

const hold = function () {
  if (playing) {
    const i = isPlayer();
    score[i].textContent =
      Number(score[i].textContent) + Number(current[i].textContent);
    current[i].textContent = 0;
    if (Number(score[i].textContent) >= 20) {
      play[i].classList.add('player--winner');
      console.log(`player--${i + 1} is winner!`);
      playing = false;
      // alert(`player--${i + 1} is winner!`);
      return;
    } else {
      exchange(i);
    }
  }
};

const reset = function () {
  for (let i = 0; i < score.length; i++) {
    score[i].textContent = 0;
    current[i].textContent = 0;
  }
  play[0].classList.add('player--active');
  play[0].classList.remove('player--winner');
  play[1].classList.remove('player--winner');
  play[1].classList.remove('player--active');
  dice.classList.add('hidden');
  playing = true;
};

btnRoll.addEventListener('click', roll);
btnHold.addEventListener('click', hold);
btnNew.addEventListener('click', reset);
