// const Product = require('../models/product.model');

// exports.productCreate = function (req, res) {
//     let product = new Product(
//         {
//             name: req.body.name,
//             price: req.body.price
//         }
//     );

//     product.save(function (err) {
//         if (err) {
//             return next(err);
//         }
//         res.send('Product Created successfully')
//     })
// };

// exports.getProduct = function (req, res) {
//     res.send('elo');
// };

// exports.productDetails = function (req, res) {
//     Product.findById(req.params.id, function (err, product) {
//         if (err){
//              return next(err);
//         }
//         res.send(product);
//     })
// };

// exports.productUpdate = function (req, res) {
//     Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
//         if (err) { 
//             return next(err);
//         }
//         res.send('Product udpated.');
//     });
// };

// exports.productDelete = function (req, res) {
//     Product.findByIdAndDelete(req.params.id, function (err) {
//         if (err) { 
//             return next(err);
//         }
//         res.send('Product deleted!');
//     });
// };