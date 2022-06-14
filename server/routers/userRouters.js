const express = require('express');
const user = require('../controllers/userControllers');
const router = express.Router();
router.post('/product', user.createProduct);
router.get('/product/:id_p', user.getByIdProduct);
router.put('/product/:id_p', user.updateProduct);
router.delete('/product/:id_p', user.deleteProduct);
router.post('/my-added-products', user.getAllAddedProducts);
router.get('/all-products', user.getAllProducts);

module.exports = router;
