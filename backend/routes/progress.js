const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Progress = require('../models/Progress');


// @route    POST api/progress/
// @desc     Add complete training to progress
// @access   Private
router.post('/', auth, async (req, res) => {
  try {
    const {
      name,
      reps,
      repsRestTime,
      exerciseRestTime,
      exercises,
      totalTime,
    } = req.body;

    const progress = new Progress({
      user: req.user.id,
      name,
      reps,
      repsRestTime,
      exerciseRestTime,
      exercises,
      totalTime,
    });

    await progress.save();

    res.json(progress)
  } catch (error) {
    res.status(500).send('Server error');
  }
})


// @route    GET api/progress/
// @desc     Get progress trainings
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const progress = await Progress.find({user: req.user.id});

    if(!progress) {
      res.status(400).json({ msg: 'No progress for this user' });
    }

    res.json(progress);
  } catch (error) {
    res.status(500).send('Server error');
  }
})

module.exports = router;
