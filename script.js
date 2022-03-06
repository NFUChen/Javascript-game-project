'use strict';

let HIGHEST_SCORE = 0;

class GuessingGame {
  constructor() {
    this.score = 20;
    this.secretNumber = Math.trunc(Math.random() * 10) + 1;
    console.log(this.secretNumber);
  }

  getScore() {
    return this.score;
  }

  isFailed() {
    return this.score <= 0;
  }

  getMsg(guessNum) {
    if (this.isFailed()) {
      return 'You lose the game';
    }

    if (!guessNum) {
      return 'No Number';
    }
    if (guessNum === this.secretNumber) {
      HIGHEST_SCORE = Math.max(HIGHEST_SCORE, this.score);
      return 'Correct';
    }

    if (guessNum !== this.secretNumber) {
      return guessNum > this.secretNumber ? '📈 Too high!' : '📉 Too low!';
    }
  }
  isWinTheGame(guessNum) {
    if (guessNum === this.secretNumber) {
      return true;
    }
    return false;
  }
  updateCurrentScore() {
    this.score -= 1;
  }
}

let game = new GuessingGame();
// button element
const checkBtn = document.querySelector('.check');
const againBth = document.querySelector('.again');

// element consieder when winning the game
const bodyElement = document.querySelector('body');
const numberInTheMiddleElement = document.querySelector('.number');

// element consieder when not winning the game
const guessNumElement = document.querySelector('.guess');
const msgElement = document.querySelector('.message');
const scoreElement = document.querySelector('.score');
const highestScoreElement = document.querySelector('.highscore');
// logic for buttons
checkBtn.addEventListener('click', function () {
  const guessNum = Number(guessNumElement.value);
  if (game.isWinTheGame(guessNum)) {
    bodyElement.style.backgroundColor = '#60b347';
    numberInTheMiddleElement.style.width = '30rem';
    numberInTheMiddleElement.textContent = guessNum;
  } else {
    game.updateCurrentScore();
  }

  msgElement.textContent = game.getMsg(guessNum);
  scoreElement.textContent = game.getScore();
  highestScoreElement.textContent = HIGHEST_SCORE;
});

againBth.addEventListener('click', function () {
  game = new GuessingGame();
  msgElement.textContent = 'Start Guessing...';
  numberInTheMiddleElement.textContent = '?';
  guessNumElement.value = '';
  scoreElement.textContent = game.score;
  bodyElement.style.backgroundColor = '#222';
  numberInTheMiddleElement.style.width = '15rem';
});
