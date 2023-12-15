const cartSchema = require('../model/cart');
const productSchema = require('../model/products');
const orderSchema = require('../model/order');

exports.create = async(req, res) => {
    try {
        const id = req.params.id;
        let message = {
            status:'',
            msg:' '
        }
        const cartToOrder = await cartSchema.findOne({_id:id}).exec();
        const orderProduct = await productSchema.findOne({_id:cartToOrder.ProductId})
        console.log(cartToOrder);
        const newOrder = new orderSchema({
            ProductId:orderProduct._id,
            ProductName:orderProduct.ProductName,
            Quantity:cartToOrder.Quantity,
            totalPrice:cartToOrder.totalPrice
        });
       
        let stock = orderProduct.ProductStock - cartToOrder.Quantity;
        let order = orderProduct.ProductOrder + cartToOrder.Quantity;

        await productSchema
            .findOneAndUpdate({_id:cartToOrder.ProductId}, {ProductStock:stock, ProductOrder:order});
        await cartSchema
            .findOneAndDelete({_id:id});
        
        newOrder.save();

        message.status = 'ok';
        message.msg = 'Add Product to cart success.';
        res.send({message});

    } catch (error) {
        console.log('Error: =>' + error);
        res.status(500).send('Error: Some problem on create routes..');
    }
}

exports.remove = async(req, res) => {
    try {
        const cartId = req.params.id;
        await cartSchema.findOneAndDelete({_id: cartId}).exec();
    } catch (error) {
        console.log('Error: =>' + error);
        res.status(500).send('Error: Some problem on create routes..');
    }
}