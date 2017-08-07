var express = require('express');
var router = express.Router();
var passportConf = require('../config/passport');
var Product = require('../models/product');

// GET /product/{id}
// get single product information
router.get('/get/:id', passportConf.isAuthenticated, function(req, res, next) {
    var id = req.param("id");
    Product.findById(id)
        .then(function(doc) {
            res.render('products/product', {product: doc});
        });
});

// GET /product/insert
// Before inserting, render insert page
router.get('/insert', passportConf.isAuthenticated, function(req, res, next) {
    res.render('products/insert-product', {message: req.flash('success')});
});

// POST /product/insert
router.post('/insert', function(req, res, next) {
    var currentTime = new Date().getTime().toString();
    var product = {
        id: currentTime,
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        vendor: req.body.vendor,
        imagelink: req.body.imagelink,
        quantity_oz: req.body.quantity_oz,
        price_eighth_oz: req.body.price_eighth_oz,
        price_quarter_oz: req.body.price_quarter_oz,
        price_half_oz: req.body.price_half_oz,
        price_one_oz: req.body.price_one_oz,
        price_one_pound: req.body.price_one_pound,
        last_modified: new Date(),
        created: new Date()
    };

    var product = new Product(product);
    product.save(function(err) {
        if (err) {
            console.error('Insert error!');
            return next(err);
        }
        return res.redirect('/product/all');
    });
});

// GET /product/edit/{id}
// after editing, return to edit page by id
router.get('/edit/:id', passportConf.isAuthenticated, function(req, res, next) {
    var id = req.param("id");
    Product.findById(id)
        .then(function(doc) {
            res.render('products/edit-product', {product: doc, message: req.flash('success')});
        });
});

// POST /product/edit
// update product
router.post('/edit', passportConf.isAuthenticated, function(req, res, next) {
    var id = req.body.id;
    Product.findById(id, function(err, product) {
        if (err) {
            console.error('error, no entry found');
        }
        product.name = req.body.name;
        product.description = req.body.description;
        product.category = req.body.category;
        product.vendor = req.body.vendor;
        product.imagelink = req.body.imagelink;
        product.quantity_oz = parseFloat(req.body.quantity_oz);
        product.price_eighth_oz = parseFloat(req.body.price_eighth_oz);
        product.price_quarter_oz = parseFloat(req.body.price_quarter_oz);
        product.price_half_oz = parseFloat(req.body.price_half_oz);
        product.price_one_oz = parseFloat(req.body.price_one_oz);
        product.price_one_pound = parseFloat(req.body.price_one_pound);
        product.last_modified = new Date();
        product.save(function(err) {
            if (err) return next(err);
            req.flash('success', 'You have successfully edited product information');
            return res.redirect('/product/edit/' + id);
        });
    })
});

// POST /product/delete/{id}
// delete product by id
router.get('/delete/:id', passportConf.isAuthenticated, function(req, res, next) {
    var id = req.param("id");
    Product.findByIdAndRemove(id).exec();
    res.render('products/all', {message: req.flash('success')});
});

// return all products
router.get('/all', passportConf.isAuthenticated, function(req, res, next) {
    Product.find().sort({id: 1})
        .then(function(doc) {
            res.render('products/all', {items: doc});
        });
});

router.post('/search-id', passportConf.isAuthenticated, function(req, res, next) {
    var id = req.body.id;
    Product.find().where('id').equals(id).exec(function (err, doc) {
        if (err) return handleError(err);
        res.render('products/all', {items: doc});
    })
});

router.post('/search-name', passportConf.isAuthenticated, function(req, res, next) {
    var name = req.body.name;
    Product.find().where('name').equals(name).exec(function (err, doc) {
        if (err) return handleError(err);
        res.render('products/all', {items: doc});
    })
});

module.exports = router;