const input = document.querySelector('input');
const ulContainer = document.querySelector('.list-wrap__content');
const submitButton = document.querySelector('button.submit');

const makeListDOM = () => {
  const li = document.createElement('li');
  li.innerHTML = `<li class="list-item">
                    <p class="list-item__text"></p>
                    <button class="list-item__delete">x</button>
                </li>`;
  const content = li.querySelector('.list-item__text');
  const deleteButton = li.querySelector('.list-item__delete');
  const inputValue = input!.value;
  if (content) {
    content.textContent = inputValue;
  }
  ulContainer?.append(li);
  deleteButton?.addEventListener('click', (e) => {
    const target = e.target as HTMLButtonElement;
    const deleteTarget = target.parentElement as HTMLElement;
    deleteTarget.remove();
  });
};

const resetInput = () => {
  input!.value = '';
};

submitButton?.addEventListener('click', () => {
  makeListDOM();
  resetInput();
});
