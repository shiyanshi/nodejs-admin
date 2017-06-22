var express = require('express');
var router = express.Router();
var Patient = require('../models/patient');

// return all patients
router.get('/', function(req, res, next) {
    Patient.find().sort({PatientName: 1})
        .then(function(doc) {
           res.render('patients', {items: doc});
        });
});

module.exports = router;