const myElement = document.querySelector('.color') as HTMLElement;

if (myElement) {
  myElement.addEventListener('click', (event: MouseEvent): void => {
    const rectInfo = myElement.getBoundingClientRect();
    // console.log(event);
    console.log(rectInfo);
    console.log('clientX', event.clientX, 'clientY', event.clientY);
    console.log('pageX', event.pageX, 'pageY', event.pageY);
  });
}
