/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const deleteNote = async (noteId) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `http://127.0.0.1:8080/api/v1/notes/${noteId}`,
    });
    if (res.status === 204) {
      showAlert('success', 'Note deleted');
      setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (error) {
    console.log(error);
    showAlert('error', error.response.data.message);
  }
};

export const addItem = async (noteId, item) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:8080/api/v1/notes/${noteId}/addItem`,
      data: {
        item,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'An item has been added.');
      setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (error) {
    console.log(error);
    showAlert('error', error.response.data.message);
  }
};

export const editNote = async (noteId, newInput) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:8080/api/v1/notes/${noteId}`,
      data: {
        newInput,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Your note was updated.');
      setTimeout(() => {
        location.assign(`/${noteId}`);
      }, 1500);
    }
  } catch (error) {
    console.log(error);
    showAlert('error', error.response.data.message);
  }
};

export const addToDoneList = async (noteId, item) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:8080/api/v1/notes/${noteId}/doneList`,
      data: {
        item,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Item moved to your done list.');
      setTimeout(() => {
        location.assign(`/${noteId}`);
      }, 1500);
    }
  } catch (error) {
    console.log(error);
    showAlert('error', error.response.data.message);
  }
};

export const undoDoneItem = async (noteId, item) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:8080/api/v1/notes/${noteId}/undo`,
      data: {
        item,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Item moved to your list.');
      setTimeout(() => {
        location.assign(`/${noteId}`);
      }, 1500);
    }
  } catch (error) {
    console.log(error);
    showAlert('error', error.response.data.message);
  }
};

export const editItem = async (noteId, itemId, updatedItem) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:8080/api/v1/notes/${noteId}/items/${itemId}`,
      data: {
        updatedItem,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'An item has been edited.');
      setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (error) {
    console.log(error);
    showAlert('error', error.response.data.message);
  }
};

export const deleteItem = async (noteId, itemId) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `http://127.0.0.1:8080/api/v1/notes/${noteId}/items/${itemId}`,
    });
    if (res.data.status === 'success') {
      showAlert('success', 'An item has been deleted.');
      setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (error) {
    console.log(error);
    showAlert('error', error.response.data.message);
  }
};

export const clearDoneList = async (noteId, emArr) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:8080/api/v1/notes/${noteId}/clearDone`,
      data: {
        emArr,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Done list has been deleted.');
      setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (error) {
    console.log(error);
    showAlert('error', error.response.data.message);
  }
};

export const deleteList = async (noteId) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:8080/api/v1/notes/${noteId}/deleteList`,
    });
    if (res.data.status === 'success') {
      showAlert('success', 'List deleted');
      setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (error) {
    console.log(error);
    showAlert('error', error.response.data.message);
  }
};
