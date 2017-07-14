// needed for local authentication
var passport = require('passport');

// needed for local login
var LocalStrategy = require('passport-local').Strategy;


var secret = require('../config/secret');

var User = require('../models/user');

var async = require('async');


// serialize and deserialize
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});


// give the middleware a name, and create a new anonymous instance of LocalStrategy
passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {
    // find a specific email
    User.findOne({ email: email }, function(err, user) {
        // in case of an error return a callback
        if (err) return done(err);

        if (!user) {
            return done(null, false, req.flash('loginMessage', 'No user with such credentials found'));
        }

        // compare user provided password and the database one
        if (!user.comparePassword(password)) {
            return done(null, false, req.flash('loginMessage', 'Oops! Wrong credentials'));
        }

        // return user object
        return done(null, user);

    });
}));

// custom function validate
exports.isAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');

}
