const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');


router.get('/:productCode', productController.getProductCode);

router.post('/:productCode', productController.postProductCodeToCart); 


module.exports = router;
