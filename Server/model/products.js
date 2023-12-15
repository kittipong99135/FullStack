const mongoose = require('mongoose');

 const productSchema = mongoose.Schema({
    ProductName:String,
    ProductDetail:String,
    ProductPrice:Number,
    ProductOrder:Number,
    ProductStock:Number,
    ProductImage:String
 },{timestamps:true});

 module.exports = mongoose.model('product', productSchema);