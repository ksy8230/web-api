'use strict';

import Popup from './popup.js';
import * as sound from './sound.js';
import Game from './game.js';

const CARROT_SIZE = 80;
const CARROT_COUNT = 4;
const BUG_COUNT = 8;
const GAME_DURATION = 5;

const game = new Game(GAME_DURATION, CARROT_COUNT, BUG_COUNT, CARROT_SIZE);
const gameFinishBanner = new Popup();

game.setGameStopListener((reason) => {
  let message = '';
  switch (reason) {
    case 'cancel':
      message = 'Wanna Replay? 🙃';
      break;
    case 'win':
      message = 'You win ✨';
      break;
    case 'lose':
      message = 'You lost...😣';

      break;
    default:
      throw new Error('not valid reason');
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(onRefreshClick);
function onRefreshClick() {
  game.startGame();
  game.showStopButton();
}
