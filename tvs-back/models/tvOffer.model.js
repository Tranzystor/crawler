const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let tvOfferSchema = new Schema({
    model: {type: String, required: true},
    date: {type: Date},
    price: {type: Number, require: true},
    diagonal: {type: Number, require: true},
    title: {type: String},
    source: {type: String},
    isProductAvailable: {type: Boolean},
    url: {type: String},
});

module.exports = mongoose.model('tvOffer', tvOfferSchema);

