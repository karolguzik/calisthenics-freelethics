const express = require('express');
const router = express.Router();
// const { trainings } = require('../controllers');

router.get('/', (reg, res) => res.send('training authorized'))

module.exports = router;