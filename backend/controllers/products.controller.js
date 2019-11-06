const productModel = require('../models/product');
const productsController = {};

productsController.getProducts = async (req, res) =>{
    const products = await productModel.find();
    res.json(products);
};

productsController.createProduct = async (req, res) =>{
    const product = new productModel({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        shop: req.body.shop,
        imagePath: req.body.imagePath
    });
    console.log(product);
    await product.save();
    res.json({
        'status':'Product saved'
    });
};

productsController.getProduct = async (req, res) =>{
    const product = await productModel.findById(req.params.id);
    res.json(product);
};

productsController.editProduct = async (req, res) =>{
    const { id } = req.params;
    const product = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        shop: req.body.shop,
        imagePath: req.body.imagePath
    }
    await productModel.findByIdAndUpdate(id, {$set: product, new: true});
    res.json({'status': 'Product Updated'});
};

productsController.deleteProduct = async (req, res) =>{
    await productModel.findByIdAndDelete(req.params.id);
    res.json({'status': 'Product Removed'});
};

module.exports = productsController;