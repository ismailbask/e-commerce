const express = require('express');
const user = require('../controllers/userControllers');
const router = express.Router();
const authControllers = require('../controllers/authControllers');
const elasticControllers = require('../controllers/elasticControllers');
router.post('/signup', authControllers.signUp);
router.post('/signin', authControllers.signIn);
router.get('/all-products', user.getAllProducts);
router.get('/search', elasticControllers);

module.exports = router;