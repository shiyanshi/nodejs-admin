var express = require('express');
var router = express.Router();
var passportConf = require('../config/passport');
var Product = require('../models/product');
var Cart = require('../models/cart');


// GET /order/insert
// Before inserting, render insert page
router.get('/insert', passportConf.isAuthenticated, function(req, res, next) {
    Product.find().sort({id: 1})
        .then(function(products) {
            res.render('orders/insert-order', {items: products});
        });
});

router.post('/insert', passportConf.isAuthenticated, function(req, res, next) {
    var product_id = req.body.id;
    var quantity_eighth_oz = req.body.quantity_eighth_oz;
    var quantity_quarter_oz = req.body.quantity_quarter_oz;
    var quantity_half_oz = req.body.quantity_half_oz;
    var quantity_one_oz = req.body.quantity_one_oz;

    if (!quantity_eighth_oz && !quantity_quarter_oz && !quantity_half_oz && !quantity_one_oz) {
        res.redirect('/product/get/' + product_id);
    }

    var cart = new Cart(req.session.cart ? req.session.cart : {});
    Product.findById(product_id, function (err, product) {
        cart.add(product, product._id, quantity_eighth_oz, quantity_quarter_oz, quantity_half_oz, quantity_one_oz);
        req.session.cart = cart;
        req.flash('success', 'You have successfully added to cart');
        res.render('/product');
    });
});

router.get('/get', function (req, res, next) {
    if (!req.session.cart) {
        return res.render('cart/cart', {products: null});
    }
    var cart = new Cart(req.session.cart.items);
    res.render('cart/cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

module.exports = router;