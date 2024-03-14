import axios from 'axios';
import { showAlert } from './alerts';

export const forgotUserPassword = async (email) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8080/api/v1/users/forgotPassword',
      data: {
        email,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'A reset email has been sent.');
      window.setTimeout(() => {
        location.assign('/checkInbox');
      }, 1500);
    }
  } catch (error) {
    console.log(error);
    showAlert('error', error.response.data.message);
  }
};

export const resetUserPassword = async (password, passwordConfirm, token) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:8080/api/v1/users/resetPassword/${token}`,
      data: {
        password,
        passwordConfirm,
      },
    });
    if (res.data.status === 'success') {
      location.assign('/resetSuccess');
    }
  } catch (error) {
    console.log(error);
    showAlert('error', error.response.data.message);
  }
};
