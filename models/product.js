var mongoose = require('mongoose');
mongoose.connect('localhost:27017/mydb');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    id: String,
    name: String,
    description: String,
    category: String,
    vendor: String,
    imagelink: String,
    quantity_oz: Number,
    price_eighth_oz: Number,
    price_quarter_oz: Number,
    price_half_oz: Number,
    price_one_oz: Number,
    price_one_pound: Number,
    last_modified: Date,
    created: Date
}, {collection: 'product'});

var Product = mongoose.model('Product', productSchema);

module.exports = mongoose.model('Product', productSchema);