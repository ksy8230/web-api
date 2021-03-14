'use strict';
{
  const CARROT_SIZE = 80;
  const CARROT_COUNT = 5;
  const BUG_COUNT = 4;
  const gameField = document.querySelector('.game__field');
  const fieldRect = gameField.getBoundingClientRect();
  const playButton = document.querySelector('.game__button');
  const score = document.querySelector('.game__score');
  const timer = document.querySelector('.game__timer');
  const popup = document.querySelector('.pop-up');
  const popupRefreshButton = document.querySelector('.pop-up__refresh');
  const popupMessage = document.querySelector('.pop-up__message');

  const carrotSound = new Audio('./sound/carrot_pull.mp3');
  const alertSound = new Audio('./sound/alert.wav');
  const bgSound = new Audio('./sound/bg.mp3');
  const winSound = new Audio('./sound/game_win.mp3');
  const bugSound = new Audio('./sound/bug_pull.mp3');

  let setTimer = null;
  let started = false;
  let time = 6;
  let scorePoint = 0;

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width;
    const y2 = fieldRect.height;
    for (let i = 0; i < count; i++) {
      const item = document.createElement('img');
      item.src = imgPath;
      item.setAttribute('class', className);
      const fieldYRange = getRandomNumber(y1, y2 - CARROT_SIZE);
      const fieldXRange = getRandomNumber(x1, x2 - CARROT_SIZE);
      item.style.transform = `translate(${fieldXRange}px, ${fieldYRange}px)`;
      gameField.append(item);
    }
  }

  function initGame() {
    gameField.innerHTML = '';
    timer.textContent = `${0}:${0}`;
    score.textContent = CARROT_COUNT;
    scorePoint = 0;
    addItem('carrot', CARROT_COUNT, 'img/carrot.png');
    addItem('bug', BUG_COUNT, 'img/bug.png');
  }

  function updateTimerText(timeAmount) {
    const minutes = Math.floor(timeAmount / 60);
    const seconds = timeAmount % 60;
    timer.textContent = `${minutes}:${seconds}`;
  }

  function updateScore(point) {
    score.textContent = CARROT_COUNT - point;
  }

  function showPopupWithText(text) {
    popup.classList = 'pop-up';
    popupMessage.textContent = text;
  }

  function showPlayButton() {
    playButton.innerHTML = `<i class="fas fa-play"></i>`;
  }

  function showStopButton() {
    playButton.innerHTML = `<i class="fas fa-pause"></i>`;
  }

  function startTimer() {
    const carrots = document.querySelectorAll('.carrot');
    score.textContent = carrots.length;

    let remainingTimeSec = time;
    updateTimerText(remainingTimeSec);
    setTimer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        clearInterval(setTimer);
        finishGame(CARROT_COUNT === score);
        return;
      } else {
        updateTimerText(--remainingTimeSec);
      }
    }, 1000);
  }

  function stopTimer() {
    clearInterval(setTimer);
  }

  function startGame() {
    started = true;
    startTimer();
    initGame();
    showStopButton();
    playSound(bgSound);
  }

  function stopGame() {
    started = false;
    stopTimer();
    showPopupWithText('Wanna Replay? 🙃');
    stopSound(alertSound);
  }

  function finishGame(win) {
    started = false;
    stopTimer();
    showPopupWithText(win ? 'You win ✨' : 'You lost...😣');
    if (win) {
      playSound(winSound);
    } else {
      playSound(bugSound);
    }
    stopSound(bgSound);
  }

  function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
  }
  function stopSound(sound) {
    sound.pause();
  }

  // 게임 시작 버튼 이벤트
  playButton.addEventListener('click', () => {
    if (started) {
      stopGame();
    } else {
      startGame();
    }
  });

  // 리프레시 버튼 이벤트
  popupRefreshButton.addEventListener('click', () => {
    popup.classList = 'pop-up pop-up--hide';
    startGame();
    showStopButton();
  });

  // 게임 필드 클릭 이벤트
  gameField.addEventListener('click', (e) => {
    if (!started) {
      return;
    }
    const target = e.target;

    if (target.className === 'carrot') {
      target.remove();
      scorePoint++;
      playSound(carrotSound);
      updateScore(scorePoint);
      if (scorePoint === CARROT_COUNT) {
        finishGame(true);
      }
    }
    if (target.className === 'bug') {
      finishGame(false);
    }
    console.log('scorePoint', scorePoint);
  });
}
