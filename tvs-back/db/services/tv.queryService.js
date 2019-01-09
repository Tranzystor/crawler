const tvOffer = require('../../models/tvOffer.model');

const getTvsByModel = () => {

    const newest = tvOffer.aggregate([ 
        { $sort: { "model": 1, "date": -1 }}, 
        { 
            $group: { 
                _id: "$model", 
                newestDate: { "$first": "$date" },
                newestPrice: { "$first": "$price"},
            }
        }
    ]);
    console.log(newest);
    
    const lowest = tvOffer.aggregate([ 
        { $sort: { "model": 1, "price": 1 }}, 
        { 
            $group: { 
                _id: "$model", 
                lowestPrice: { "$first": "$price" },
                lowestPriceDate: { "$first": "$date"},
            }
        }
    ]);
    console.log(lowest);
}

module.exports = getTvsByModel;
