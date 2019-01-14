const tvOffer = require('../../models/tvOffer.model');

exports.getTvsByModel = async () => {
    
    const tvs = await tvOffer.aggregate([
        {
            $match: {
                price: { $gt: 0 }
            }, 
        },
        { 
            $facet: {
                lowest: [
                    { $sort: { "model": 1, "price": 1 }},
                    { 
                        $group: { 
                            _id: "$model", 
                            lowestPrice: { "$first": "$price" },
                            lowestPriceDate: { "$first": "$date"},
                            diagonal: { "$first": "$diagonal" }
                        }
                    },
                ],
                newest: [
                    { $sort: { "model": 1, "date": -1 }}, 
                    { 
                        $group: { 
                            _id: "$model", 
                            newestDate: { "$first": "$date" },
                            newestPrice: { "$first": "$price"},
                        }
                    },
                ]
            }
        },
        {
            $project: { models: { $concatArrays: ['$lowest','$newest'] }}
        },
        { $unwind: '$models' },
        { $replaceRoot: { newRoot: "$models" }},
        { 
            $group:  {
                _id: "$_id",
                entries: { $push: "$$ROOT" }
            }
        },
    ]).exec();
    
    const mergedEntries = tvs.map(tv => {
        const rest = Object.assign({}, tv.entries[0], tv.entries[1]);;
        const { _id, ...withoutId } = rest;
        return {
            model: tv._id,
            ...withoutId,
        }
    });

    return mergedEntries;
}
