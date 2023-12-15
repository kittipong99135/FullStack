const productSchema = require('../model/products');
const orderSchema = require('../model/order');
const cartSchema = require('../model/cart');

exports.create = async(req, res) => {
    try {
        console.log(req.body);
        console.log(req.file);

        let ProductData = req.body;

        if(req.file){
            ProductData.ProductImage = req.file.filename;
            console.log(ProductData);
        }
        else{
            ProductData.ProductImage = 'defuatImage.png';
            console.log(ProductData);
        }
        product = new productSchema(ProductData);
        product.save();
        res.send(product);
    } catch (error) {
        console.log('Error: =>' + error);
        res.status(500).send('Error: Some problem on create routes..');
    }
}

exports.list = async(req, res) => {
    try {
        const productList = await productSchema.find().exec();
        res.send(productList);
    } catch (error) {
        console.log('Error: =>' + error);
        res.status(500).send('Error: Some problem on list routes..');
    }
}

exports.read = async(req, res) => {
    try {
        const id = req.params.id;
        const readProduct = await productSchema.findOne({_id:id}).exec();
        res.send(readProduct);
    } catch (error) {
        console.log('Error: =>' + error);
        res.status(500).send('Error: Some problem on read routes..');
    }
}

exports.update = async(req, res) => {
    try {
        let message = {
            status:'',
            msg:' '
        }
        const id = req.params.id;
        const Stock = req.body.Stock
        const oldStock = await productSchema.findOne({_id:id});
        // console.log(oldStock.ProductStock + "--" + Stock);
        const updateProduct = await productSchema.findOneAndUpdate({_id:id}, {ProductStock:oldStock.ProductStock + Stock});
        message.status = 'ok';
        message.msg = 'Add Product to cart success.';
        res.send({message});
    } catch (error) {
        console.log('Error: =>' + error);
        res.status(500).send('Error: Some problem on update routes..');
    }
}

exports.remove = async(req, res) =>{
    try {
        const id = req.params.id;
        let message = {
            status:'',
            msg:' '
        }
        const delProduct = await productSchema.findOneAndDelete({_id:id}).exec();
        const delCart = await cartSchema.deleteMany({ProductId:id}).exec();

        message.status = 'ok';
        message.msg = 'Dalete Product to cart success.';
        res.send({message})
    } catch (error) {
        console.log('Error: =>' + error);
        res.status(500).send('Error: Some problem on remove routes..');
    }
}



