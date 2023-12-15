const express = require('express');
const router = express.Router();

const {
  regis,
  login
} = require('../controller/users');

router.post('/regis', regis);
router.post('/login', login);

module.exports = router;