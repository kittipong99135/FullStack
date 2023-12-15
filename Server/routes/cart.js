const express = require('express');
const router = express.Router();

const {
    create,
    update, 
    remove,
    list
} = require('../controller/cart');

router.post('/cart/:id', create);
router.put('/cart/:id', update);
router.delete('/cart/:id', remove, list);
router.get('/cart/:id', list);

module.exports = router;