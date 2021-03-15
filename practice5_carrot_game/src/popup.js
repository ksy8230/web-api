'use strict';

export default class Popup {
  constructor() {
    this.popup = document.querySelector('.pop-up');
    this.popupRefreshButton = document.querySelector('.pop-up__refresh');
    this.popupMessage = document.querySelector('.pop-up__message');
    // 리프레시 버튼 이벤트을 클릭하면
    // 바깥에서 뭘 가져올지는 모르겠지만 클래스 멤버변수에 할당된 콜백 함수를 실행한다
    this.popupRefreshButton.addEventListener('click', () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }

  // class Popup안에 있는 멤버변수 onClick 에 전달 받은 callback 인자를 할당
  setClickListener(callback) {
    this.onClick = callback;
  }

  showWithText(text) {
    this.popup.classList = 'pop-up';
    this.popupMessage.textContent = text;
  }

  hide() {
    this.popup.classList = 'pop-up pop-up--hide';
  }
}
