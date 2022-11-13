'use strict';

const score1_element = document.getElementById('score--1');
const score0_element = document.getElementById('score--0');
const dice_element = document.querySelector('.dice');
const new_game_button = document.querySelector('.btn--new');
const roll_button = document.querySelector('.btn--roll');
const hold_button = document.querySelector('.btn--hold');
const player0_element = document.querySelector('.player--0');
const player1_element = document.querySelector('.player--1');

const scores = [0, 0];
let current_score = 0;
let active_player = 0;
score0_element.textContent = 0;
score1_element.textContent = 0;
dice_element.classList.add('hidden');

let playing = true;

const switch_player = () => {
  document.getElementById(`current--${active_player}`).textContent = 0;
  current_score = 0;
  active_player = active_player === 0 ? 1 : 0;
  player0_element.classList.toggle('player--active');
  player1_element.classList.toggle('player--active');
};

roll_button.addEventListener('click', () => {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    dice_element.classList.remove('hidden');
    dice_element.src = `dice-${dice}.png`;

    if (dice != 1) {
      current_score += dice;
      document.getElementById(`current--${active_player}`).textContent =
        current_score;
    } else {
      switch_player();
    }
  }
});

hold_button.addEventListener('click', function () {
  if (playing) {
    scores[active_player] += current_score;
    document.getElementById(`score--${active_player}`).textContent =
      scores[active_player];

    if (scores[active_player] >= 10) {
      playing = false;
      dice_element.classList.add('hidden');
      document
        .querySelector(`.player--${active_player}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${active_player}`)
        .classList.remove('player--active');
    } else {
      switch_player();
    }
  }
});

new_game_button.addEventListener('click', () => {
  document.location.reload();
});
