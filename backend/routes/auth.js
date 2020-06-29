const express = require('express');
const router = express.Router();
// const { auth } = require('../controllers')


router.get('/', (req, res) => res.send('Authorized render'))

module.exports = router;