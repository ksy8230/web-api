{
  const element = document.querySelector('.move');
  const elementx = document.querySelector('.coordinate-x');
  const elementy = document.querySelector('.coordinate-y');
  const verticalLine = document.querySelector('.vertical-line');
  const horizonLine = document.querySelector('.horizon-line');

  window.addEventListener('mousemove', (e) => {
    element.style.top = `${e.pageY}px`;
    element.style.left = `${e.pageX}px`;
    verticalLine.style.left = `${e.pageX}px`;
    horizonLine.style.top = `${e.pageY}px`;
    elementx.textContent = `${e.pageX}px`;
    elementy.textContent = `${e.pageY}px`;
  });
}
