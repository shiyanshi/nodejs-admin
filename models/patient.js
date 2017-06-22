var mongoose = require('mongoose');
mongoose.connect('localhost:27017/mydb');
var Schema = mongoose.Schema;

var patientSchema = new Schema({
    PatientName: String,
    CustomMembershipID: String,
    CustomBarcode: String,
    RegistryNumber: String,
    CaregiverName: String,
    Physician: String,
    CardExpDate: String,
    Birthday: String,
    StreetAddress: String,
    City: String,
    State: String,
    Zipcode: String,
    Resident: String,
    PhoneNumber: String,
    PhoneCarrier: String,
    Email: String,
    JoinedAt: String,
    DriversLicenseNumber: String,
    LastVisitDate: String,
    Referrer: String,
    LastVisitPurchases: String,
    Total: String
}, {collection: 'patient'});

var Patient = mongoose.model('Patient', patientSchema);

module.exports = mongoose.model('Patient', patientSchema);