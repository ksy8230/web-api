const input = document.querySelector('input');
const ulContainer = document.querySelector('.list-wrap__content');
const submitButton = document.querySelector('button.submit');

// add item
function onAdd() {
  const text = input?.value.trim(); // Remove left and right spaces
  if (text === '') {
    resetInput();
    return;
  }
  const item = createItem(text!);
  ulContainer?.append(item);
  item.scrollIntoView();
  resetInput();
}

// make item and delete the item Event
function createItem(text: string) {
  const li = document.createElement('li');
  li.innerHTML = `<li class="list-item">
                    <p class="list-item__text"></p>
                    <button class="list-item__delete">x</button>
                </li>`;
  const content = li.querySelector('.list-item__text');
  if (content) {
    content.textContent = text;
  }
  return li;
}

// reset Item
function resetInput() {
  input!.value = '';
  input?.focus();
}

submitButton?.addEventListener('click', () => {
  onAdd();
});

input?.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    onAdd();
  }
});

// event delegate to ulContainer for deleting li
ulContainer?.addEventListener('click', (e) => {
  const tobeDeleteLi = (e.target as HTMLElement).parentElement;
  tobeDeleteLi?.remove();
});
