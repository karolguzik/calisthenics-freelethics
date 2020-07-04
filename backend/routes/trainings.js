const express = require('express');
const router = express.Router();
const { validationResult, check } = require('express-validator');
const auth = require('../middleware/auth');

const User = require('../models/User');
const Training = require('../models/Training');

// @route   GET api/trainings
// @desc    get user trainings
// @access  PRIVATE
router.get('/', auth, async (req, res) => {
  try {
    const trainings = await Training.find({
      user: req.user.id,
    });

    if (!trainings.length) {
      res.status(400).json({ msg: 'No trainings for this user' });
    }

    res.json(trainings);
  } catch (err) {
    res.status(500).send('Server error');
  }
});



// @route   GET api/trainings/:id
// @desc    get user training
// @access  PRIVATE
router.get('/:id', auth, async (req, res) => {
  try {
    const training = await Training.findById(req.params.id)

    if (!training) {
      res.status(400).json({ msg: 'Training not found' });
    }

    res.json(training);
  } catch (err) {
    res.status(500).send('Server error');
  }
});



// @route   POST api/trainings
// @desc    add training
// @access  PRIVATE
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Training name is required').not().isEmpty(),
      check('reps', 'Number of reps is required').not().isEmpty(),
      check('repsRestTime', 'Reps rest time is required').not().isEmpty(),
      check('exerciseRestTime', 'Exerciste rest time is required')
        .not()
        .isEmpty(),
      // check('exercises', 'Exercises are required').not().isEmpty(),
      check('exerciseName', 'Exercise name is required').not().isEmpty(),
      check('exerciseTime', 'Exercise time is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      reps,
      repsRestTime,
      exerciseRestTime,
      exerciseName,
      exerciseTime,
    } = req.body;

    
    const exercises = {
      exerciseFirst: {
        name: exerciseName,
        time: exerciseTime,
      },
      exerciseSecond: {
        name: exerciseName,
        time: exerciseTime,
      }
    }

    try {
      const user = await User.findById(req.user.id);

      if(!user) {
        res.status(400).json({msg:'nie znalazlo usera'})
      }

      const training = new Training({
        user: user.id,
        name,
        reps,
        repsRestTime,
        exerciseRestTime,
        exercises: exercises,
      });

      await training.save();
      res.json(training);
    } catch (error) {
      res.status(500).send('Server error');
    }
  }
);


// @route   DELETE api/trainings/:id
// @desc    delete training
// @access  PRIVATE

router.delete('/:id', auth, async (req,res) => {
  try {
    const trainingToDelete = await Training.findById(req.params.id);

    if(!trainingToDelete) {
      res.status(404).json({ msg: 'Training not found'});
    }

    await trainingToDelete.remove();
    res.json({msg: 'Training deleted'})
  } catch (error) {
    res.status(500).send('Server error')
  }
})


module.exports = router;
