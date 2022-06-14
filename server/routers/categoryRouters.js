const express = require('express');
const router = express.Router();
const category = require('../controllers/categoryControllers');
router.post('/shirts', category.getAllShirts);
router.post('/pants', category.getAllPants);
router.post('/shoes', category.getAllShoes);
router.post('/bags', category.getAllBags);
router.post('/coats', category.getAllCoats);
router.post('/hats', category.getAllHats);
router.post('/skirts', category.getAllSkirts);
router.post('/watches', category.getAllWatches);
router.post('/swearters', category.getAllSweaters);
router.post('/pajamas', category.getAllPajamas);
router.get('/all-catagories', category.getAllCategories);


module.exports = router;