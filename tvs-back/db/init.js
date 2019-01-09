const tvOffer = require('../models/tvOffer.model');

const connect = () => {
    const mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost:27017/crawling', { useNewUrlParser: true });
    mongoose.Promise = global.Promise;
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}

const ensureIndexes = () => {
    tvOffer.collection.createIndex({name: 1});
}

const init = () => {
    connect();
    ensureIndexes();
}

module.exports = init;
