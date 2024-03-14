/* eslint-disable */

export const togglePassword = (input, btn) => {
  if (btn) {
    btn.addEventListener('click', (e) => {
      const type =
        input.getAttribute('type') === 'password' ? 'text' : 'password';
      input.setAttribute('type', type);
      e.target.classList.toggle('fa-eye');
    });
  }
};
