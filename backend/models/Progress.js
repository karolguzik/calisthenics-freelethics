const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  name: {
    type: String,
    required: true,
  },
  reps: {
    type: Number,
    required: true,
  },
  repsRestTime: {
    type: Number,
    required: true,
  },
  exerciseRestTime: {
    type: Number,
    required: true,
  },
  exercises: {
    type: Array,
    required: true,
  },
  totalTime: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: 'done',
  }
});

const Progress = mongoose.model('progress', ProgressSchema);

module.exports = Progress;