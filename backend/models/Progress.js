const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  idTraining: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Progress = mongoose.model('progress', ProgressSchema);

module.exports = Progress;