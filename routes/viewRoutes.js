const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get(
  '/sortByTitle',
  authController.protect,
  viewController.getAlphaNotes,
);

router.get('/', authController.isLoggedIn, viewController.getHome);
router.get('/errorPage', viewController.getErrorPage);
router.get('/signup', viewController.signupForm);
router.get('/activateAccount', viewController.activateAccount);
router.get('/signup/:token', viewController.signupConfirm);
router.get('/login', viewController.loginForm);
router.get('/forgotPassword', viewController.forgotPassword);
router.get('/checkInbox', viewController.checkInbox);
router.get(
  '/resetPassword/:resetToken',
  viewController.checkPasswordResetToken,
  viewController.resetPassword,
);
router.get('/resetSuccess', viewController.resetPasswordSuccess);

router.route('/account').get(authController.protect, viewController.getAccount);
router.route('/contactUs').get(viewController.contactPage);
router.route('/sentEmail').get(viewController.sentEmailPage);

router.get(
  '/exampleNote',
  authController.protect,
  viewController.getExampleNote,
);
router.get('/addNote', authController.protect, viewController.addNote);
router.get(
  '/:noteId',
  authController.protect,
  viewController.getNoteId,
  viewController.showNote,
);

module.exports = router;
