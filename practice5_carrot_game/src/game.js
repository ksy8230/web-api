import Field from './field.js';
import * as sound from './sound.js';

export default class Game {
  constructor(gameDuration, carrotCount, bugCount, carrotSize) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.score = document.querySelector('.game__score');
    this.timer = document.querySelector('.game__timer');
    this.playButton = document.querySelector('.game__button');
    this.playButton.addEventListener('click', () => {
      if (this.started) {
        this.stopGame();
      } else {
        this.startGame();
      }
    });

    this.setTimer = null;
    this.started = false;
    this.time = this.gameDuration;
    this.scorePoint = 0;

    this.gameField = new Field(carrotCount, bugCount, carrotSize);
    this.gameField.setClickListener(this.onItemClick);
  }

  onItemClick = (item) => {
    if (!this.started) {
      return;
    }

    if (item === 'carrot') {
      this.scorePoint++;
      this.updateScore(this.scorePoint);
      if (this.scorePoint === this.carrotCount) {
        this.finishGame(true);
      }
    }
    if (item === 'bug') {
      this.finishGame(false);
    }
  };

  finishGame(win) {
    this.started = false;
    this.stopTimer();
    this.onGameStop && this.onGameStop(win ? 'win' : 'lose');
    // this.gameFinishBanner.showWithText(win ? 'You win ✨' : 'You lost...😣');
    if (win) {
      sound.playWin();
    } else {
      sound.playBug();
    }
    sound.stopBg();
  }

  setGameStopListener(callback) {
    this.onGameStop = callback;
  }

  stopGame() {
    this.started = false;
    this.stopTimer();
    this.onGameStop && this.onGameStop('cancel');
    // this.gameFinishBanner.showWithText('Wanna Replay? 🙃');
    sound.stopAlert();
  }

  startGame() {
    this.started = true;
    this.startTimer();
    this.initGame();
    this.showStopButton();
    sound.playBg();
  }

  initGame() {
    this.scorePoint = 0;
    this.timer.textContent = `${0}:${0}`;
    this.score.textContent = this.carrotCount;
    this.gameField.init();
  }

  updateTimerText(timeAmount) {
    const minutes = Math.floor(timeAmount / 60);
    const seconds = timeAmount % 60;
    this.timer.textContent = `${minutes}:${seconds}`;
  }

  updateScore(point) {
    this.score.textContent = this.carrotCount - point;
  }

  showPlayButton() {
    this.playButton.innerHTML = `<i class="fas fa-play"></i>`;
  }

  showStopButton() {
    this.playButton.innerHTML = `<i class="fas fa-pause"></i>`;
  }

  startTimer() {
    const carrots = document.querySelectorAll('.carrot');
    this.score.textContent = carrots.length;

    let remainingTimeSec = this.time;
    this.updateTimerText(remainingTimeSec);
    this.setTimer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        clearInterval(this.setTimer);
        this.finishGame(this.carrotCount === this.score);
        return;
      } else {
        this.updateTimerText(--remainingTimeSec);
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.setTimer);
  }
}
