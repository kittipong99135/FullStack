const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    Username:String,
    ProductId:String,
    ProductDetail:Object,
    ProductPrice:Number,
    Quantity:Number,
    totalPrice:Number
});

module.exports = mongoose.model('cart', cartSchema);