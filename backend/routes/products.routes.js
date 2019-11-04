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

router.get('/',productController.getProducts);

module.exports = router;