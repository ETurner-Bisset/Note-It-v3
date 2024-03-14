/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alerts';

export const addNote = async (title, noteText, itemsArr) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8080/api/v1/notes',
      data: {
        title,
        noteText,
        itemsArr,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Note created!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (error) {
    // console.log(error);
    showAlert('error', error.response.data.message);
  }
};
