/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alerts';

export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? '/api/v1/users/updateMyPassword'
        : '/api/v1/users/updateMe';
    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });
    if (res.data.status === 'success') {
      showAlert(
        'success',
        `${type === 'password' ? 'Password' : 'Information'} updated successfully!`,
      );
      window.setTimeout(() => {
        location.assign('/account');
      }, 1500);
    }
  } catch (error) {
    // console.log(error);
    showAlert('error', error.response.data.message);
  }
};

export const deleteAccount = async () => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: '/api/v1/users/deleteMe',
    });
    if (res.status === 204) {
      showAlert('success', 'Your account has been deleted.');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (error) {
    // console.log(error);
    showAlert('error', error.response.data.message);
  }
};
