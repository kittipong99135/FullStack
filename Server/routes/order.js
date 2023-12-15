const express = require('express');
const router = express.Router();

const { 
    create, 
    remove 
  } = require('../controller/order');


router.post('/order/:id', create);
router.delete('/order/:id', remove);

module.exports = router;