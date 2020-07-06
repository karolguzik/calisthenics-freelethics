const express = require('express');
const router = express.Router();
const { validationResult, check } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Training = require('../models/Training');
const Progress = require('../models/Progress');

// @route    api/users/registration
// @desc     Registration user
// @access   Public
router.post(
  '/registration',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'This email is invalid').isEmail(),
    check('password', 'Password must not be shorter then 5 letters').isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exist' }] });
      }

      user = new User({
        username,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('TOKEN_SECRET'),
        {
          expiresIn: 86400,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    api/users/login
// @desc     Login user
// @access   Public
router.post(
  '/login',
  [
    check('email', 'This email is invalid').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({email});

      if(!user) {
        return res.status(400).json({errors: [{msg: 'Account with this email is not exist'}]})
      } 

      const isMatch = await bcrypt.compare(password, user.password);

      if(!isMatch) {
        return res.status(400).json({errors: [{msg: 'Incorrect password'}]});
      }

      const payload = { user : { id: user.id }}

      jwt.sign(payload, config.get('TOKEN_SECRET'), {expiresIn: 86400}, (err, token) => {
        if(err) throw err;
        res.json({token});
      });
    } catch (error) {
      res.status(500).send('Server error');
    }
  }
);



// @route    DELETE api/users/:id
// @desc     delete user
// @access   PRIVATE
router.delete('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
 
    if(!user) {
      res.status(404).json({msg: 'No user exists'})
    }
 
    await Training.deleteMany({user: req.user.id})
    await Progress.deleteMany({user: req.user.id})
    await User.findOneAndRemove({_id: req.user.id})

    res.json({msg: 'User deleted'})
  } catch (error) {
    res.status(500).send('Server error');
  }
})

module.exports = router;
