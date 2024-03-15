/* eslint-disable */
import { login, logout } from './login';
import { signup } from './signup';
import { forgotUserPassword, resetUserPassword } from './forgotPassword';
import { togglePassword } from './showPassword';
import { moreItems } from './moreItems';
import { addNote } from './addNote';
import { showNote, searchNotes } from './showNote';
import { voiceNote } from './voiceNote';
import {
  deleteNote,
  addItem,
  editNote,
  addToDoneList,
  editItem,
  deleteItem,
  clearDoneList,
  undoDoneItem,
  deleteList,
} from './noteFunctions';
import { toggleBtnVis, toggleItemBtnsVis } from './toggleBtns';
import { updateSettings, deleteAccount } from './accountFunctions';
import { sendContactEmail } from './contact';
import { showAlert } from './alerts';

// DOM selectors
// Dropdown menu
const dropdown1 = document.getElementById('nav-id');
const dropdown2 = document.getElementById('nav-id-bars');
const dropdownMenu1 = document.querySelector('.dropdown-menu1');
const dropdownMenu2 = document.querySelector('.dropdown-menu2');
const mainContainer = document.querySelector('main');
// Login, sign up and reset password
const loginForm = document.getElementById('login-form');
const logoutBtn = document.querySelector('.logout');
const logoutBtnMob = document.querySelector('.logout-mobile');
const signupForm = document.getElementById('signup-form');
const signupBtn = document.querySelector('.btn-signup');
const resetBtn = document.querySelector('.btn-reset');
const forgotPasswordForm = document.getElementById('forgot-password-form');
const resetPasswordForm = document.getElementById('reset-password-form');
const signupPasswordInput = document.getElementById('password-signup');
const toggleShowPassword = document.getElementById('togglePassword');
const loginPasswordInput = document.getElementById('password-login');
const toggleShowLoginPassword = document.getElementById('togglePasswordLogin');
const resetPasswordInput = document.getElementById('reset-password');
const toggleShowResetPassword = document.getElementById('togglePasswordReset');
// Note selectors
const moreItemsBtn = document.getElementById('more-items');
const addNoteForm = document.getElementById('add-note');
const titleBtn = document.getElementById('title-btn');
const title = document.getElementById('title');
const noteTextBtn = document.getElementById('text-btn');
const noteText = document.getElementById('note-text');
const formItems = document.querySelectorAll('.form-item');
const showNoteBtns = document.querySelectorAll('.show-note');
const deleteNoteBtn = document.querySelector('.btn-delete-note');
const addItemBtn = document.querySelector('.btn-add-item');
const editTitleBtn = document.getElementById('edit-title');
const editTitleInput = document.getElementById('editTitleInput');
const titleTickBtn = document.querySelector('.title-tick');
const titleText = document.getElementById('title-text');
const editTextBtn = document.getElementById('edit-text');
const editTextInput = document.getElementById('editNoteInput');
const textTickBtn = document.querySelector('.text-tick');
const noteTextP = document.querySelector('.note-text-p');
const btnDeleteText = document.getElementById('delete-text');
const listItems = document.querySelectorAll('.list-item');
const itemTickBtns = document.querySelectorAll('.item-tick');
const itemDeleteBtns = document.querySelectorAll('.fa-trash');
const clearDoneBtn = document.querySelector('.btn-clear');
const undoBtns = document.querySelectorAll('.btn-undo');
const deleteListBtn = document.querySelector('.btn-delete-list');
const searchForm = document.getElementById('search-form');
// Modal
const modal = document.getElementById('text-modal');
const openModalBtn = document.querySelector('.btn-add-text');
const modalSpan = document.querySelector('.close');
const listModal = document.getElementById('list-modal');
const openListModalBtn = document.querySelector('.btn-add-list');
const modalListSpan = document.querySelector('.close-list');
// Modal forms and btns
const addTextForm = document.getElementById('add-text');
const addListForm = document.getElementById('add-list');
// Account
const currentPasswordInput = document.getElementById('current-password');
const toggleShowCurrentPassword = document.getElementById(
  'togglePasswordAccount',
);
const newPasswordInput = document.getElementById('new-password');
const toggleShowNewPassword = document.getElementById(
  'togglePasswordAccountNew',
);
const updatePasswordForm = document.getElementById('update-password');
const updateInfoForm = document.getElementById('update-info');
const deleteAccountForm = document.getElementById('delete-account');
// Contact page
const contactForm = document.getElementById('contact-form');

// Show password
togglePassword(signupPasswordInput, toggleShowPassword);
togglePassword(loginPasswordInput, toggleShowLoginPassword);
togglePassword(resetPasswordInput, toggleShowResetPassword);
togglePassword(currentPasswordInput, toggleShowCurrentPassword);
togglePassword(newPasswordInput, toggleShowNewPassword);

// Open dropdown menus
dropdown1.addEventListener('click', () => {
  dropdownMenu1.classList.toggle('show');
  mainContainer.classList.toggle('move-main');
});
dropdown2.addEventListener('click', () => {
  dropdownMenu2.classList.toggle('show');
  mainContainer.classList.toggle('move-main');
});

// Log in
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    document.querySelector('.btn-login').textContent = 'Processing...';
    const email = document.getElementById('email-login').value;
    const password = document.getElementById('password-login').value;
    login(email, password);
    return false;
  });
}

// Log out
if (logoutBtn) logoutBtn.addEventListener('click', logout);
if (logoutBtnMob) logoutBtnMob.addEventListener('click', logout);

// Sign up
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    signupBtn.textContent = 'Processing...';
    const name = document.getElementById('name').value;
    const email = document.getElementById('email-signup').value;
    const password = document.getElementById('password-signup').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    signup(name, email, password, passwordConfirm);
  });
}

// Forgot password
if (forgotPasswordForm) {
  forgotPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email-forgot').value;
    forgotUserPassword(email);
  });
}

// Reset password
if (resetPasswordForm) {
  resetPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    resetBtn.textContent = 'Processing...';
    const password = document.getElementById('reset-password').value;
    const passwordConfirm = document.getElementById(
      'reset-passwordConfirm',
    ).value;
    const token = e.target.action.split('/')[4];
    resetUserPassword(password, passwordConfirm, token);
  });
}

// Add one more item to add note form
if (moreItemsBtn) {
  moreItemsBtn.addEventListener('click', function (e) {
    e.preventDefault();
    const items = document.getElementsByClassName('form-item');
    const itemsContainer = document.querySelector('.items-container');
    moreItems(items, itemsContainer);
  });
}

// Voice note
voiceNote(titleBtn, title);
voiceNote(noteTextBtn, noteText);
formItems.forEach((item) => voiceNote(item.childNodes[3], item.childNodes[2]));

// Add note
if (addNoteForm) {
  addNoteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const noteText = document.getElementById('note-text').value;
    const items = document.querySelectorAll('.item');
    let itemsArr = [];
    items.forEach((item) => {
      if (item.value !== '') {
        itemsArr.push(item.value);
      }
    });
    addNote(title, noteText, itemsArr);
  });
}

// Show note
if (showNoteBtns) {
  showNoteBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const noteId = e.target.id;
      showNote(noteId);
    });
  });
}

// Open/close modals
if (openModalBtn) {
  openModalBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'block';
  });
}

if (openListModalBtn) {
  openListModalBtn.addEventListener('click', (e) => {
    e.preventDefault();
    listModal.style.display = 'block';
  });
}

if (modalSpan) {
  modalSpan.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'none';
  });
}

if (modalListSpan) {
  modalListSpan.addEventListener('click', (e) => {
    e.preventDefault();
    listModal.style.display = 'none';
  });
}

if (modal) {
  window.addEventListener('click', (e) => {
    if (e.target == modal) {
      modal.style.display = 'none';
    }
  });
}

if (listModal) {
  window.addEventListener('click', (e) => {
    if (e.target == listModal) {
      listModal.style.display = 'none';
    }
  });
}

// Modal forms
if (addTextForm) {
  addTextForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const noteText = document.getElementById('note-text').value;
    const noteId = e.target.childNodes[2].childNodes[1].id;
    editNote(noteId, { noteText: noteText });
  });
}

if (addListForm) {
  addListForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let itemsArr = [];
    const items = document.querySelectorAll('.item');
    const noteId = e.target.childNodes[1].childNodes[0].id;
    items.forEach((item) => {
      if (item.value !== '') {
        addItem(noteId, item.value);
      }
    });
  });
}

// Delete note
if (deleteNoteBtn) {
  deleteNoteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const noteId = e.target.id;
    if (!noteId) return location.reload();
    deleteNote(noteId);
  });
}

// Add item
if (addItemBtn) {
  addItemBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const item = document.getElementById('add-item').value;
    const noteId = e.target.id;
    if (!noteId) return location.reload();
    if (item !== '') {
      addItem(noteId, item);
    }
  });
}

// Toggle edit btns visibility
toggleBtnVis(editTitleBtn, editTitleInput, titleText, titleTickBtn);
toggleBtnVis(editTextBtn, editTextInput, noteTextP, textTickBtn, btnDeleteText);
listItems.forEach((item) => {
  toggleItemBtnsVis(
    item.childNodes[1].childNodes[0],
    item.childNodes[1].childNodes[1].childNodes[0],
    item,
    item.childNodes[1].childNodes[1].childNodes[1],
    item.childNodes[1].childNodes[2],
  );
});

// Edit note title
if (titleTickBtn) {
  titleTickBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const noteId = e.target.id;
    const newInput = document.getElementById('editTitleInput').value;
    if (!noteId) return location.reload();
    editNote(noteId, { title: newInput });
  });
}

// Edit note text
if (textTickBtn) {
  textTickBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const noteId = e.target.id;
    const newInput = document.getElementById('editNoteInput').value;
    if (!noteId) return location.reload();
    editNote(noteId, { noteText: newInput });
  });
}

// Delete note text
if (btnDeleteText) {
  btnDeleteText.addEventListener('click', (e) => {
    e.preventDefault();
    const noteId = e.target.id;
    const newInput = '';
    if (!noteId) return location.reload();
    editNote(noteId, { noteText: newInput });
  });
}

// Edit Item
if (itemTickBtns) {
  itemTickBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const itemId = e.target.id;
      const item = e.target.parentNode.parentNode.childNodes[0].value;
      const noteId = e.target.parentNode.parentNode.parentNode.id;
      if (!noteId) return location.reload();
      editItem(noteId, itemId, item);
    });
  });
}

// Move Item to done list
if (itemDeleteBtns) {
  itemDeleteBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const itemId = e.target.id;
      const noteId = e.target.parentNode.parentNode.id;
      if (!noteId) return location.reload();
      addToDoneList(noteId, itemId);
    });
  });
}

// Clear done list
if (clearDoneBtn) {
  clearDoneBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const noteId = e.target.id;
    const emArr = [];
    clearDoneList(noteId, emArr);
    if (!noteId) return location.reload();
  });
}

// Undo done items
if (undoBtns) {
  undoBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const itemId = e.target.id;
      const noteId = e.target.parentNode.id;
      if (!noteId) return location.reload();
      undoDoneItem(noteId, itemId);
    });
  });
}

if (deleteListBtn) {
  deleteListBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const noteId = e.target.id;
    deleteList(noteId);
  });
}

// Search function
if (searchForm) {
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTitle = document.getElementById('search-title').value;
    searchNotes(searchTitle);
  });
}

// Account page
// Update password
if (updatePasswordForm) {
  updatePasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn-update-password').textContent = 'Updating...';
    const passwordCurrent = document.getElementById('current-password').value;
    const password = document.getElementById('new-password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;

    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password',
    );
    document.querySelector('.btn-update-password').textContent =
      'Update Password';
    document.getElementById('current-password').value = '';
    document.getElementById('new-password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}

// Update info
if (updateInfoForm) {
  updateInfoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('update-name').value;
    const email = document.getElementById('update-email').value;
    updateSettings({ name, email }, 'data');
  });
}

// Delete account
if (deleteAccountForm) {
  deleteAccountForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const checkbox = document.getElementById('checkbox').checked;
    if (!checkbox) {
      showAlert('error', 'Check the box to delete your account.');
    } else {
      deleteAccount();
    }
  });
}

// Contact form
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    document.querySelector('.btn-contact').textContent = 'Sending...';
    const form = new FormData();
    form.name = document.getElementById('contact-name').value;
    form.email = document.getElementById('contact-email').value;
    form.message = document.getElementById('message').value;
    form.access_key = document.querySelector('.access_key').value;
    form.subject = document.querySelector('.subject').value;
    const json = JSON.stringify(form);
    sendContactEmail(json);
  });
}
