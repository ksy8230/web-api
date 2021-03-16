'use strict';

import Popup from './popup.js';
import * as sound from './sound.js';
import GameBuilder, { Reason } from './game.js';

/**
 * 빌더 패턴
 * 상수값들을 매개변수로 그대로 넣어주지 않고
 * 순서와 상관없이 Game 클래스에 변수값을 세팅해 주기 위해
 * GameBuilder 안에 변수값을 세팅해주는 함수들을 만들어준다
 * => 이 함수들은 GameBuilder를 리턴하기 때문에 메서드체인 형식으로 작성이 가능
 * => GameBuild의 build 함수에서 Game 인스턴스를 리턴
 * (이 인스턴스에 순서가 고정되어 있어서 사용자는 순서 신경 안 쓰고 세팅 함수만 사용하면 되니 편하고 안전하다)
 *
 */
const game = new GameBuilder().withGameDuration(5).withCarrotCount(3).withBugCount(5).withCarrotSize(80).build();

const gameFinishBanner = new Popup();

game.setGameStopListener((reason) => {
  let message = '';
  switch (reason) {
    case Reason.cancel:
      message = 'Wanna Replay? 🙃';
      break;
    case Reason.win:
      message = 'You win ✨';
      break;
    case Reason.lose:
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
