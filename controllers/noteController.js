const Note = require('../models/noteModel');
const Item = require('../models/itemModel');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');

exports.setUserId = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllNotes = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Note.findOne({ user: req.user.id }),
    req.query,
  )
    .filter()
    .paginate()
    .sort()
    .limitFields();
  const notes = await features.query;
  if (notes.length === 0) {
    return next(new AppError('No notes for this user were found.', 404));
  }
  res.status(200).json({
    status: 'success',
    results: notes.length,
    notes,
  });
});

exports.getNote = catchAsync(async (req, res, next) => {
  const note = await Note.findById(req.params.noteId)
    .populate({ path: 'itemsArr' })
    .populate({ path: 'doneList' });
  if (!note) {
    return next(new AppError('Note not found.', 404));
  }
  res.status(200).json({
    status: 'success',
    note,
  });
});

exports.createItem = catchAsync(async (req, res, next) => {
  let newItems = [];
  for (let i = 0; i < req.body.itemsArr.length; i++) {
    const newItem = await Item.create({
      item: req.body.itemsArr[i],
      user: req.user.id,
    });
    newItems.push(newItem);
  }
  req.itemArr = newItems;
  next();
});

exports.createNote = catchAsync(async (req, res, next) => {
  // Create note
  const note = await Note.create({
    title: req.body.title,
    noteText: req.body.noteText,
    itemsArr: [...req.itemArr],
    user: req.body.user,
  });
  //   Update notes array in user document
  await User.findByIdAndUpdate(
    req.user.id,
    { $push: { notes: note._id } },
    {
      new: true,
      runValidators: true,
    },
  );
  res.status(201).json({
    status: 'success',
    note,
  });
});

exports.deleteNote = catchAsync(async (req, res, next) => {
  await Item.deleteMany({ user: req.user.id });
  const note = await Note.findByIdAndDelete(req.params.noteId);
  if (!note) {
    return next(new AppError('No document found with that ID', 404));
  }
  await User.findByIdAndUpdate(req.user.id, { $pull: { notes: note._id } });
  res.status(204).json({
    status: 'success',
  });
});

exports.addItem = catchAsync(async (req, res, next) => {
  const item = await Item.create({
    item: req.body.item,
    user: req.user.id,
  });
  const note = await Note.findOneAndUpdate(
    { _id: req.params.noteId },
    { $push: { itemsArr: item } },
    {
      new: true,
      runValidators: true,
    },
  );
  if (!note) {
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(201).json({
    status: 'success',
    note,
  });
});

exports.editNote = catchAsync(async (req, res, next) => {
  const note = await Note.findByIdAndUpdate(
    req.params.noteId,
    req.body.newInput,
    {
      new: true,
    },
  );
  await note.save();
  if (!note) {
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    note,
  });
});

exports.addToDoneList = catchAsync(async (req, res, next) => {
  const item = await Item.findById(req.body.item);
  const note = await Note.findByIdAndUpdate(
    req.params.noteId,
    {
      $pull: { itemsArr: item.id },
      $push: { doneList: item.id },
    },
    { new: true },
  );
  if (!note) {
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    note,
  });
});

exports.undoDone = catchAsync(async (req, res, next) => {
  const item = await Item.findById(req.body.item);
  const note = await Note.findByIdAndUpdate(
    req.params.noteId,
    {
      $push: { itemsArr: item.id },
      $pull: { doneList: item.id },
    },
    { new: true },
  );
  if (!note) {
    return next(new AppError('No note found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    note,
  });
});

exports.editItem = catchAsync(async (req, res, next) => {
  const item = await Item.findByIdAndUpdate(
    req.params.itemId,
    { item: req.body.updatedItem },
    { new: true },
  );
  if (!item) {
    return next(new AppError('No item found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    item,
  });
});

exports.clearDoneList = catchAsync(async (req, res, next) => {
  const doneList = await Note.findById(req.params.noteId);
  doneList.doneList.forEach(async (done) => {
    await Item.findByIdAndDelete(done);
  });
  const note = await Note.findByIdAndUpdate(
    req.params.noteId,
    { doneList: [] },
    { new: true },
  );
  if (!note) {
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    note,
  });
});

exports.deleteList = catchAsync(async (req, res, next) => {
  const itemIds = await Note.findById(req.params.noteId);
  itemIds.itemsArr.forEach(async (item) => {
    await Item.findByIdAndDelete(item);
  });
  const note = await Note.findByIdAndUpdate(
    req.params.noteId,
    { itemsArr: [] },
    { new: true },
  );
  if (!note) {
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    note,
  });
});

exports.getNoteByTitle = catchAsync(async (req, res, next) => {
  const note = await Note.findOne({ title: req.body.title });
  if (!note) {
    return next(new AppError('No note found with that title', 404));
  }
  res.status(200).json({
    status: 'success',
    note,
  });
});
