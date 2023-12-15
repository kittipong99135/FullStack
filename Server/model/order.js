const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    ProductId:String,
    ProductName:String,
    Quantity:Number,
    totalPrice:Number
});

module.exports = mongoose.model('order', orderSchema);