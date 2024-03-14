/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `http://127.0.0.1:8080/api/v1/users/signup`,
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });
    if (res.data.status === 'success') {
      location.assign('/activateAccount');
    }
  } catch (error) {
    // console.log(error);
    showAlert('error', error.response.data.message);
  }
};
