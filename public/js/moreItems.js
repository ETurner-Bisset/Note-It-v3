/* eslint-disable */

const addEventListener = (btnId, input) => {
  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.interimResults = true;
  const btn = btnId;
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    recognition.start();
  });
  recognition.addEventListener('result', (e) => {
    const result = e.results[0][0].transcript;
    if (e.results[0][0].confidence > 0.9) {
      input.value = result;
    }
  });
};

export const moreItems = (items, itemsContainer) => {
  const newItem = document.createElement('div');
  newItem.classList.add('form-group');
  newItem.classList.add('form-item');
  newItem.innerHTML = `
      <label class='form-label' for="item${items.length + 1}">${items.length + 1}.</label>
      <input type="text" id="item${items.length + 1}" class="form-input item" name='item' >
      <button class='btn voice-btn' id='item${items.length + 1}'><i class='fa-solid fa-microphone' ></i></button>
      `;
  const btnId = newItem.childNodes[5];
  const input = newItem.childNodes[3];
  if (btnId) addEventListener(btnId, input);
  itemsContainer.appendChild(newItem);
};
