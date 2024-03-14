/* eslint-disable */

export const voiceNote = (btn, input) => {
  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.interimResults = true;
  if (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      recognition.start();
    });
    recognition.addEventListener('result', (e) => {
      const result = e.results[0][0].transcript;
      if (e.results[0][0].confidence > 0.9) {
        input.value = result;
      }
    });
  }
};
