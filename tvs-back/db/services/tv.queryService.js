const tvOffer = require('../../models/tvOffer.model');

exports.getTvsByModel = async () => {
    const newest = await tvOffer.aggregate([ 
        { $sort: { "model": 1, "date": -1 }}, 
        { 
            $group: { 
                _id: "$model", 
                newestDate: { "$first": "$date" },
                newestPrice: { "$first": "$price"},
            }
        }
    ]).exec();
    console.log(newest);
    
    const lowest = await tvOffer.aggregate([ 
        { $sort: { "model": 1, "price": 1 }}, 
        { 
            $group: { 
                _id: "$model", 
                lowestPrice: { "$first": "$price" },
                lowestPriceDate: { "$first": "$date"},
            }
        }
    ]).exec();
    console.log(lowest);
    
    return {
        "foo": "bar"
    };
}
