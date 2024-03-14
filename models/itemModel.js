const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  item: String,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
