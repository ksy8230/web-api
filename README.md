### Web API

[MDN 정리한 글 📖](https://velog.io/@mollog/Web-API-MDN-%EB%82%B4%EC%9A%A9-%EC%A0%95%EB%A6%AC)   
✔ 웹 API란 개발자가 브라우저 상에 쉽게 개발할 수 있도록 도와주는 객체 모음들입니다.   
✔ 웹 API를 이용해서 돔요소를 조작하거나 일부 영역을 업데이트 시키거나 비디오나 오디오나 그래픽 요소를 사용할 수 있습니다.   
✔ 웹 API는 객체 기반으로 동작하고 엔트리 포인트가 존재합니다.   

[사용 가능한 Web API 둘러보기 📖](https://developer.mozilla.org/en-US/docs/Web/API)

### 브라우저 구조 

브라우저는 window라는 글로벌 객체를 갖는다. 그리고 window 객체는 **DOM**(Document Object Model), **BOM**(Browser Obejct Model), **js** api를 포함한다.   
이렇게 브라우저에서 제공하는 다양한 api들 중 특히 size 관련한 api를 자주 사용한다.
- window.screen : 브라우저 바깥에 있는 영역까지 합한 모니터 사이즈
- window.outer : 브라우저 전체의 사이즈
- window.inner : 스크롤바를 포함한 페이지가 표기되는 사이즈
- documentElement.clientWidth : 스크롤바를 제외한 순수 페이지 영역 사이즈
