const mongoose = require('mongoose');
const slugify = require('slugify');

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'You must enter a title.'],
      trim: true,
      unique: [true, 'A note title must be unique.'],
    },
    noteText: {
      type: String,
      trim: true,
    },
    itemsArr: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Item',
      },
    ],
    slug: String,
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A note must belong to a user.'],
    },
    doneList: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Item',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

noteSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
