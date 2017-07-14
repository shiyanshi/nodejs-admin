var router = require('express').Router();
var User = require('../models/user');
var passport = require('passport');
var passportConf = require('../config/passport');
var async = require('async');

router.get('/login', function(req, res) {

    if (req.user) return res.redirect('/patients');

    res.render('accounts/login', { message: req.flash('loginMessage') });

});

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/patients',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/profile', passportConf.isAuthenticated, function(req, res, next) {
    User.findOne({ _id: req.user._id })
        .populate('history.item')
        .exec(function(err, foundUser) {
            if (err) return next(err);

            res.render('accounts/profile', { user: foundUser });
        });
});

router.get('/signup', function(req, res, next) {
    res.render('accounts/signup', {
        errors: req.flash('errors')
    });
});

router.post('/signup', function(req, res, next) {

    // get our mongoose model to create a new User
    var user = new User();

    // populate the user properties based on what the user submits
    user.profile.name = req.body.name;
    user.password = req.body.password;
    user.email = req.body.email;
    var secret = req.body.secret;
    user.profile.picture = user.gravatar();
    if (secret != 'nidaye') {
        req.flash('errors', 'Secret is not correct');
        return res.redirect('/signup');
    }

    // fetch user and test if they exist
    User.findOne({ email: req.body.email }, function(err, existingUser) {
        // check if the user already exists
        if (existingUser) {
            // return an error message to indicate user already exists
            req.flash('errors', 'Account with that email address already exists');
            // redirect the user back to signup page with the error
            return res.redirect('/signup');
        } else {
            // save the user to the database if there is no error
            user.save(function(err, user) {
                if (err) return next(err);
                return res.redirect('/login')
            });
        }
    });
});

router.get('/logout', function(req, res, next) {
    req.logout();
    return res.redirect('/');
});

router.get('/edit-profile', passportConf.isAuthenticated, function(req, res, next) {
    res.render('accounts/edit-profile', { message: req.flash('success') });
});

router.post('/edit-profile', passportConf.isAuthenticated, function(req, res, next) {

    User.findOne({ _id: req.user._id }, function(err, user) {

        if (err) return next(err);

        if (req.body.name) user.profile.name = req.body.name;

        if (req.body.address) user.address = req.body.address;

        user.save(function(err) {

            if (err) return next(err);

            req.flash('success', 'You have successfully edited your profile information');

            return res.redirect('/edit-profile');
        });
    });

});

module.exports = router;
