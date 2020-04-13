const express = require('express');
const {
  getUsers,
  register
} = require('../controllers/auth');

const router = express.Router({ mergeParams: true });

router.get('/', getUsers);

router.post('/register', register);

module.exports = router;