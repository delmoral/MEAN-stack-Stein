const productModel = require('../models/product');
const productsController = {};

productsController.getProducts = async (req, res) =>{
    const products = await productModel.find();
    res.json(products);
};

module.exports = productsController;