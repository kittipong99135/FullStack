const express = require('express');
const router = express.Router();

const { 
    create, 
    list, 
    read, 
    update,
    remove
   
  } = require('../controller/products');

const { upload } = require('../middleware/upload');

router.post('/product',upload, create);
router.get('/product', list);
router.get('/product/:id', read);
router.put('/product/:id', update);
router.delete('/product/:id', remove);

module.exports = router;