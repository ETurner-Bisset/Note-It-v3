/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const showNote = async (noteId) => {
  try {
    const res = await axios(`/api/v1/notes/${noteId}`);
    if (res.data.status === 'success') {
      location.assign(`/${noteId}`);
    }
  } catch (error) {
    // console.log(error);
  }
};

export const searchNotes = async (searchTitle) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/notes/searchNotes',
      data: {
        title: searchTitle,
      },
    });

    if (res.data.status === 'success') {
      location.assign(`/${res.data.note.id}`);
    }
  } catch (error) {
    // console.log(error);
    showAlert('error', error.response.data.message);
  }
};
