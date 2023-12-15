const cartSchema = require('../model/cart');
const productSchema = require('../model/products');

exports.create = async(req, res) => {
    try {
        
        const {Username, Unit} = req.body;
        const ProductId = req.params.id;
        const thisProduct = await productSchema.findOne({_id:ProductId});
        let message = {
            status:'',
            msg:' '
        }
        if(Unit <= 0){
            message.status = 'err';
            message.msg = 'Unit Invalid.';
            console.log(message);
            return res.send({message});
        }
        if(thisProduct.ProductStock < Unit){
            message.status = 'err';
            message.msg = 'Product There is not enough.';
            console.log(message);
            return res.send({message});
        }

        let addCart = new cartSchema({
            Username:Username,
            ProductId:ProductId,
            ProductDetail:thisProduct.ProductDetail,
            ProductPrice:thisProduct.ProductPrice,
            Quantity:Unit,
            totalPrice:thisProduct.ProductPrice*Unit
        });
        console.log(addCart);

        addCart.save();
        message.status = 'ok';
        message.msg = 'Add Product to cart success.';
        res.send({message});
    } catch (error) {
        console.log('Error: =>' + error);
        res.status(500).send('Error: Some problem on create routes..');
    }
}

exports.update = async(req, res) => {
    try {
        res.send('cart update end point.');
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

exports.list = async(req, res) => {
    try {
        const Username = req.params.id;
        let responseProduct = [];
        const cartList = await cartSchema.find({Username:Username});

        for(let i = 0 ; i < cartList.length; i++){
            let productDetail = await productSchema.findOne({_id:cartList[i].ProductId}).exec();

            let listCartDetail = {
                    cartID:cartList[i]._id,
                    ProductImage:productDetail.ProductImage,
                    ProductName:productDetail.ProductName, 
                    ProductPrice:productDetail.ProductPrice,
                    Quantity:cartList[i].Quantity,
                    TotalProce:cartList[i].totalPrice
            }   
            responseProduct.push(listCartDetail)
        }       
        console.log(responseProduct); 
        res.send(responseProduct);
    } catch (error) {
        console.log('Error: =>' + error);
        res.status(500).send('Error: Some problem on create routes..');
    }
}