console.log('my file');
const myElement = document.querySelector('.color') as HTMLElement;

if (myElement) {
  myElement.addEventListener('click', (event: MouseEvent): void => {
    console.log('clientX', event.clientX, 'clientY', event.clientY);
    console.log('pageX', event.pageX, 'pageY', event.pageY);
  });
}

const scrollByY = document.querySelector('#scrollby-y') as HTMLElement;
const scrollToY = document.querySelector('#scrollto-y') as HTMLElement;
const scrollInto = document.querySelector('#scrollinto-color') as HTMLElement;

scrollByY.addEventListener('click', (): void => {
  window.scrollBy({ top: 100, left: 0, behavior: 'smooth' });
});

scrollToY.addEventListener('click', (): void => {
  window.scrollTo(0, 100);
});

scrollInto.addEventListener('click', (): void => {
  myElement.scrollIntoView();
});
