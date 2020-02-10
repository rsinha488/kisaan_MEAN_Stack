var express = require('express');
var router = express.Router();

var ctrlProducts =require('../controllers/products.controllers.js');
var ctrlUsers =require('../controllers/users.controllers.js');
//Authentication

router  
    .route('/products')
    .get(ctrlProducts.productsGetAll)
    .post(ctrlProducts.productsAddOne);
router  
    .route('/users/register')
    .post(ctrlUsers.register);
router  
   .route('/users/login')
    .post(ctrlUsers.login);

module.exports = router;

//user 
// router
//     .route('/dashboard')
