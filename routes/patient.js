var express = require('express');
var router = express.Router();
var passportConf = require('../config/passport');
var Patient = require('../models/patient');

// GET /patient/{id}
// get single patient information
router.get('/get/:id', passportConf.isAuthenticated, function(req, res, next) {
    var id = req.param("id");
    Patient.findById(id)
        .then(function(doc) {
            res.render('patient', {patient: doc});
        });
});

// GET /patient/insert
// Before inserting, render insert page
router.get('/insert', passportConf.isAuthenticated, function(req, res, next) {
    res.render('insert-patient', {message: req.flash('success')});
});

// POST /patient/insert
router.post('/insert', function(req, res, next) {
    var patient = {
        PatientName: req.body.PatientName,
        CustomMembershipID: req.body.CustomMembershipID,
        CustomBarcode: req.body.CustomBarcode,
        RegistryNumber: req.body.RegistryNumber,
        CaregiverName: req.body.CaregiverName,
        Physician: req.body.Physician,
        CardExpDate: req.body.CardExpDate,
        Birthday: req.body.Birthday,
        StreetAddress: req.body.StreetAddress,
        City: req.body.City,
        State: req.body.State,
        Zipcode: req.body.Zipcode,
        Resident: req.body.Resident,
        PhoneNumber: req.body.PhoneNumber,
        PhoneCarrier: req.body.PhoneCarrier,
        Email: req.body.Email,
        JoinedAt: req.body.JoinedAt,
        DriversLicenseNumber: req.body.DriversLicenseNumber,
        LastVisitDate: req.body.LastVisitDate,
        Referrer: req.body.Referrer,
        LastVisitPurchases: req.body.LastVisitPurchases,
        Total: req.body.Total
    };

    var data = new Patient(patient);
    data.save(function(err) {
        if (err) {
            console.error('Insert error!');
            return next(err);
        }
        return res.redirect('/patients');
    });
});

// GET /patient/edit/{id}
// after editing, return to edit page by id
router.get('/edit/:id', passportConf.isAuthenticated, function(req, res, next) {
    var id = req.param("id");
    Patient.findById(id)
        .then(function(doc) {
            res.render('edit-patient', {patient: doc, message: req.flash('success')});
        });
});

// POST /patient/edit
// update patient
router.post('/edit', passportConf.isAuthenticated, function(req, res, next) {
    var id = req.body.id;
    Patient.findById(id, function(err, doc) {
        if (err) {
            console.error('error, no entry found');
        }
        doc.PatientName = req.body.PatientName;
        doc.CustomMembershipID = req.body.CustomMembershipID;
        doc.CustomBarcode = req.body.CustomBarcode;
        doc.RegistryNumber = req.body.RegistryNumber;
        doc.CaregiverName = req.body.CaregiverName;
        doc.Physician = req.body.Physician;
        doc.CardExpDate = req.body.CardExpDate;
        doc.Birthday = req.body.Birthday;
        doc.StreetAddress = req.body.StreetAddress;
        doc.City = req.body.City;
        doc.State = req.body.State;
        doc.Zipcode = req.body.Zipcode;
        doc.Resident = req.body.Resident;
        doc.PhoneNumber = req.body.PhoneNumber;
        doc.PhoneCarrier = req.body.PhoneCarrier;
        doc.Email = req.body.Email;
        doc.JoinedAt = req.body.JoinedAt;
        doc.DriversLicenseNumber = req.body.DriversLicenseNumber;
        doc.LastVisitDate = req.body.LastVisitDate;
        doc.Referrer = req.body.Referrer;
        doc.LastVisitPurchases = req.body.LastVisitPurchases;
        doc.Total = req.body.Total;
        doc.save(function(err) {
            if (err) return next(err);
            req.flash('success', 'You have successfully edited patient information');
            return res.redirect('/patient/edit/' + id);
        });
    })
});

// POST /patient/delete/{id}
// delete patient by id
router.get('/delete/:id', passportConf.isAuthenticated, function(req, res, next) {
    var id = req.param("id");
    Patient.findByIdAndRemove(id).exec();
    res.redirect('/patients');
});

module.exports = router;