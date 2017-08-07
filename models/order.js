var mongoose = require('mongoose');
mongoose.connect('localhost:27017/mydb');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    owner: {type: Schema.Types.ObjectId, ref: 'Patient'},
    total: {type: Number, default: 0},
    items: [{
        item: {type: Schema.Types.ObjectId, ref: 'Product'},
        quantity_oz: {type: Number, default: 1},
        price: {type: Number, default: 0}
    }],
    created: Date
}, {collection: 'order'});

var Order = mongoose.model('Order', orderSchema);

module.exports = mongoose.model('Order', orderSchema);