const express = require('express');
const noteController = require('../controllers/noteController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);
router.use(noteController.setUserId);

router
  .route('/')
  .get(noteController.getAllNotes)
  .post(noteController.createItem, noteController.createNote);

router
  .route('/:noteId')
  .get(noteController.getNote)
  .patch(noteController.editNote)
  .delete(noteController.deleteNote);

router.route('/:noteId/addItem').patch(noteController.addItem);

router.route('/:noteId/clearDone').patch(noteController.clearDoneList);

router.route('/:noteId/items/:itemId').patch(noteController.editItem);

router.route('/:noteId/doneList').patch(noteController.addToDoneList);
router.route('/:noteId/undo').patch(noteController.undoDone);

router.route('/:noteId/deleteList').patch(noteController.deleteList);

router.route('/searchNotes').post(noteController.getNoteByTitle);

module.exports = router;
