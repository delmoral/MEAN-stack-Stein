const express = require('express');
const router = express.Router();

const productController = require('../controllers/products.controller');
/*
router.get('/',(req, res) =>{
    res.json({
        status: 'Api Works!'
    })
});
*/

router.get('/', productController.getProducts);

router.post('/', productController.createProduct);

router.get('/:id', productController.getProduct);

router.put('/:id', productController.editProduct);

router.delete('/:id', productController.deleteProduct);

module.exports = router;