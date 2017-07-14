var express = require('express');
var router = express.Router();
var passport = require('passport');
var Patient = require('../models/patient');
var passportConf = require('../config/passport');

// return all patients
router.get('/', passportConf.isAuthenticated, function(req, res, next) {
    Patient.find().select('PatientName CustomMembershipID PhoneNumber').sort({PatientName: 1})
        .then(function(doc) {
           res.render('patients', {items: doc});
        });
});

router.post('/search-name', passportConf.isAuthenticated, function(req, res, next) {
    var name = req.body.name;
    Patient.find().select('PatientName CustomMembershipID PhoneNumber').where('PatientName').equals(name).exec(function (err, doc) {
        if (err) return handleError(err);
        res.render('patients', {items: doc});
    })
});

router.post('/search-phone', passportConf.isAuthenticated, function(req, res, next) {
    var phoneNumber = req.body.phoneNumber;
    Patient.find().where('PhoneNumber').equals(phoneNumber).select('PatientName CustomMembershipID PhoneNumber').exec(function (err, doc) {
        if (err) return handleError(err);
        res.render('patients', {items: doc});
    })
});

router.post('/search-member-id', passportConf.isAuthenticated, function(req, res, next) {
    var memberId = req.body.memberId;
    Patient.find().where('CustomMembershipID').equals(memberId).select('PatientName CustomMembershipID PhoneNumber').exec(function (err, doc) {
        if (err) return handleError(err);
        res.render('patients', {items: doc});
    })
});

module.exports = router;