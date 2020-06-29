const express = require('express');
const router = express.Router();
const { validationResult, check } = require('express-validator');
const bcrypt = require('bcryptjs');
// const { user } = require('../controllers');

const User = require('../models/User');

router.post(
  '/',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please put a valid email').isEmail(),
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

      if(user) {
        res.status(400).json({errors: [{ msg: 'User already exist'}]})
      }

      user = new User({
        username,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      res.send('User registered');
    } catch(err) {
      console.log(err.message)
      res.status(500).send('Server error')
    }
  }
);

module.exports = router;
