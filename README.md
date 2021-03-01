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
- clientY : 브라우저의 기준에서 상위부터 시작
- pageY : 페이지(문서)의 기준에서 상위부터 시작

#### window load 이벤트 ✨
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>window-coordinates</title>
</head>

<body>
    <div id="wrap"></div>
</body>

<script>
    // after resources (css, image...)
    window.addEventListener('load', () => {
        console.log('after resources callback');
    });
</script>
</html>
```
1. 브라우저가 html 파일을 열게 되면 상단부터 html 파일을 읽어들여서 돔 요소로 변환
2. script 부분을 만나면 윈도우에 이벤트 리스너를 등록
3. **윈도우에서 페이지에 필요한 모든 리소스가 다 로딩이 완료가 되면**
4. `console.log('after load callback')` 콜백 함수가 출력

#### window DOMContentLoaded 이벤트 ✨
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>window-coordinates</title>
</head>

<body>
    <div id="wrap"></div>
</body>

<script>
    // after document
    window.addEventListener('DOMContentLoaded', () => {
        console.log('after document callback');
    });

    // after resources (css, image...)
    window.addEventListener('load', () => {
        console.log('after resources callback');
    });
</script>
</html>
```
window onload 함수와 다르게 html 문서가 로드되면 실행된다.   
css나 image 요소가 없는 파일을 빠르게 불러와야 한다면 DOMContentLoaded 이벤트를 사용하는 것이 더 빠르다. 👍

#### script 파일에 defer 옵션 ✨
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>window-coordinates</title>
    <script type="module" src="./dist/index.js" defer></script> ✔
</head>

<body>
    <div id="wrap"></div>
</body>

<script>
    // after document
    window.addEventListener('DOMContentLoaded', () => {
        console.log('after document callback');
    });

    // after resources (css, image...)
    window.addEventListener('load', () => {
        console.log('after resources callback');
    });
</script>
</html>
```
defer 옵션을 사용해서 js 파일을 추가하면 html 문서가 전부 파싱이 된 다음에 `DOMContentLoaded`가 실행되기 전에 먼저 출력이 된다.   
만약 defer를 붙이지 않고 js 파일을 헤더 밑, 최상단 부분에 추가를 하면 html이 파싱되기 전에 js 파일이 호출이 되고,   
만일 해당 파일에 에러가 있다면 html이 로드가 되지 않는 현상이 발생할 수 있다. 😣

#### window unload / beforeunload 이벤트
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>window-coordinates</title>
</head>

<body>
    <div id="wrap"></div>
</body>

<script>
    // after beforeunload
    window.addEventListener('beforeunload', () => {
        console.log('after beforeunload callback');
    });

    // after unload
    window.addEventListener('unload', () => {
        console.log('after unload callback');
    });
</script>
</html>
```
`unload`: 
페이지가 끝날 때, 사용자가 페이지를 나갈 때 발생하는 이벤트이다.   
쿠키나 캐시를 지워줄 때 주로 사용한다.   
`beforeunload`: 
unload이벤트가 실행되기 이번에 발생하는 이벤트이다.

