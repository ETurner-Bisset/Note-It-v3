/* eslint-disable */
import { showAlert } from './alerts';

export const sendContactEmail = (json) => {
  try {
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: json,
    }).then(async (response) => {
      let json = await response.json();
      showAlert('success', 'Email sent successfully!');
      window.setTimeout(() => {
        location.assign('/sentEmail');
      }, 1500);
    });
  } catch (error) {
    // console.log(error);
    showAlert(
      'error',
      'There was an error send the email. Please try again later.',
    );
  }
};
