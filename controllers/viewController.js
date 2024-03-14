const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const crypto = require('crypto');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Note = require('../models/noteModel');

const date = new Date().getFullYear();
const today = new Date().toLocaleDateString('en-uk', {
  weekday: 'long',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

exports.getNoteId = catchAsync(async (req, res, next) => {
  const note = await Note.findOne({ title: req.body.title });
  if (!req.params.noteId) req.params.noteId = note.id;
  next();
});

exports.getHome = catchAsync(async (req, res, next) => {
  try {
    res.status(200).render('home', {
      title: 'Home',
      date,
      today,
    });
  } catch (error) {
    console.log(error);
  }
});

exports.getAlphaNotes = catchAsync(async (req, res, next) => {
  try {
    const notes = await Note.find({ user: res.locals.user.id }).sort('title');
    res.status(200).render('alphaHome', {
      title: 'Home',
      date,
      today,
      notes,
    });
  } catch (error) {
    console.log(error);
  }
});

exports.signupForm = (req, res, next) => {
  try {
    res.status(200).render('signup', {
      title: 'Sign Up',
      date,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.loginForm = (req, res, next) => {
  try {
    res.status(200).render('login', {
      title: 'Log In',
      date,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.forgotPassword = (req, res, next) => {
  try {
    res.status(200).render('forgotPassword', {
      title: 'Forgot Password',
      date,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.checkInbox = (req, res, next) => {
  try {
    res.status(200).render('checkInbox', {
      title: 'Check Inbox',
      date,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.checkPasswordResetToken = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    return next(new AppError('Token is invalid or has expired/', 400));
  }
  next();
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  try {
    res.status(200).render('passwordReset', {
      title: 'Reset Password',
      date,
    });
  } catch (error) {
    console.log(error);
    res.status(400).render('errorPage', {
      title: 'Something went wrong',
      date,
      msg: error.message,
    });
  }
});

exports.resetPasswordSuccess = (req, res, next) => {
  try {
    res.cookie('jwt', 'loggedout', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });
    res.status(200).render('resetSuccess', {
      title: 'Password Reset Success',
      date,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.activateAccount = (req, res, next) => {
  try {
    res.status(200).render('activateAccount', {
      title: 'Activate Account',
      date,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.signupConfirm = catchAsync(async (req, res, next) => {
  try {
    const token = req.params.token;
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('+isValidated');
    if (!user.isValidated) {
      user.isValidated = true;
      await user.save({ validateBeforeSave: false });
      res.status(200).render('signupSuccess', {
        title: 'Sign Up Success',
        date,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

exports.addNote = (req, res, next) => {
  try {
    res.status(200).render('addNote', {
      title: 'Add Note',
      date,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.showNote = async (req, res, next) => {
  const note = await Note.findById(req.params.noteId)
    .populate({ path: 'itemsArr' })
    .populate({ path: 'doneList' });
  if (!note) {
    return next(new AppError('No note found.', 404));
  }
  res.status(200).render('showNote', {
    title: `${note.title}`,
    date,
    note,
  });
};

exports.getExampleNote = (req, res, next) => {
  try {
    res.status(200).render('exampleNote', {
      title: 'Example Note',
      date,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getAccount = (req, res, next) => {
  try {
    res.status(200).render('getAccount', {
      title: 'My Account',
      date,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.contactPage = (req, res, next) => {
  try {
    res.status(200).render('contactPage', {
      title: 'Contact Us',
      date,
      accessKey: process.env.W3F_ACCESS_KEY,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.sentEmailPage = (req, res, next) => {
  try {
    res.status(200).render('sentEmail', {
      title: 'Email Sent',
      date,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getErrorPage = (req, res, next) => {
  try {
    res.status(200).render('errorPage', {
      title: 'Something went wrong',
      date,
    });
  } catch (error) {
    console.log(error);
  }
};
