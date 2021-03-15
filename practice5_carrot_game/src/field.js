'use strict';
import * as sound from './sound.js';

export default class Field {
  constructor(carrotCount, bugCount, carrotSize) {
    this.carrotSize = carrotSize;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.gameField = document.querySelector('.game__field');
    this.fieldRect = this.gameField.getBoundingClientRect();
    // 게임 필드 클릭 이벤트을 클릭하면
    // 클래스 함수 onFieldClickListener를 실행한다

    // ❗ 함수 (onFieldClickListener)를 인자로 어딘가에 전달할 때 클래스 정보(this)는 함께 전달되지 않는다
    // 방법 1. this.onFieldClickListener = this.onFieldClickListener.bind(this);
    this.gameField.addEventListener('click', this.onFieldClickListener);
  }

  _addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width;
    const y2 = this.fieldRect.height;
    for (let i = 0; i < count; i++) {
      const item = document.createElement('img');
      item.src = imgPath;
      item.setAttribute('class', className);
      const fieldYRange = getRandomNumber(y1, y2 - this.carrotSize);
      const fieldXRange = getRandomNumber(x1, x2 - this.carrotSize);
      item.style.transform = `translate(${fieldXRange}px, ${fieldYRange}px)`;
      this.gameField.append(item);
    }
  }

  init() {
    this.gameField.innerHTML = '';
    this._addItem('carrot', this.carrotCount, 'img/carrot.png');
    this._addItem('bug', this.bugCount, 'img/bug.png');
  }

  // class Field안에 있는 멤버변수 onItemClick에 전달 받은 callback 인자를 할당
  setClickListener(callback) {
    this.onItemClick = callback;
  }

  onFieldClickListener = (event) => {
    const target = event.target;
    if (target.className === 'carrot') {
      target.remove();
      sound.playCarrot();
      // ❗ this는 바인드 시켜주지 않으면 undefiend
      this.onItemClick && this.onItemClick('carrot');
    }
    if (target.className === 'bug') {
      this.onItemClick && this.onItemClick('bug');
    }
  };
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
