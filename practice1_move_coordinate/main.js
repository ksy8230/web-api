{
  const element = document.querySelector('.move');
  const elementx = document.querySelector('.coordinate-x');
  const elementy = document.querySelector('.coordinate-y');
  const verticalLine = document.querySelector('.vertical-line');
  const horizonLine = document.querySelector('.horizon-line');

  window.addEventListener('load', () => {
    window.document.addEventListener('mousemove', (e) => {
      const x = e.clientX;
      const y = e.clientY;
      const targetRect = element.getBoundingClientRect();
      const targetHalfWidth = targetRect.width / 2;
      const targetHalfHeight = targetRect.height / 2;
      element.style.transform = `translate(${x - targetHalfWidth}px, ${y - targetHalfHeight}px)`;

      verticalLine.style.transform = `translateX(${x}px)`;
      horizonLine.style.transform = `translateY(${y}px)`;

      elementx.textContent = `${x}px`;

      elementy.textContent = `${y}px`;
    });
  });
}
