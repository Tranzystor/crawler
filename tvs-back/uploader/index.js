// const fs = require('fs');
// const Tv = require('../models/tv.model');

// const sources = require('../utils/constants');

// const uploadAllegro = () => {
//     uploadByDayAllegro(24);
//     uploadByDayAllegro(26);
//     uploadByDayAllegro(28);
// }

// const uploadByDayAllegro = day => {
//     const year = 2018;
//     const month = 12;
//     const entities = JSON.parse(fs.readFileSync(`./uploader/data/allegro/${day}.${month}.${year}.json`, 'utf8'));
//     entities.forEach((entity, i) => {
//         const priceNumber = entity.price.replace(",",".").split(' ').join('');
//         const newTv = new Tv({
//             model: entity.model,
//             date: new Date(year, month - 1, day + 1),
//             price: priceNumber,
//             diagonal: entity.diagonal,
//             title: entity.title,
//             source: sources.ALLEGRO,
//             isProductAvailable: true,
//             url: "",
//         });
//         newTv.save();
//     });
//     console.log(`saved: ${entities.length}`);
// }



// const upload = () => {
//     uploadAllegro();
//     uploadExpert();
// }

// const uploadExpert = () => {
//     uploadExpertByDay(20);
//     uploadExpertByDay(21);
//     uploadExpertByDay(22);
//     uploadExpertByDay(23);
//     uploadExpertByDay(24);
//     uploadExpertByDay(26);
// }

// const getModel = title => {
//     const LGModelPattern = /((\d\d)[L|l|U|u|E|e|P|p|S|s][K|k|J|j|H|h|F|f|G|g|B|b|C|c|N|n|A|a|W|w|M|m|S|s|V|v](\d){4}[P|p|W|w|S|s|A|a][U|u|L|l|N|n|S|s|J|j](\w){1}|(\d\d)[L|l|U|u|E|e|P|p|S|s][K|k|J|j|H|h|F|f|G|g|B|b|C|c|N|n|A|a|W|w|M|m|S|s|V|v](\d){3}(\w){1}|(\d\d)(\w){1}[6|7|8][T|D|P|V|J|P|W|S|A|t|d|p|v|j|p|w|s|a][U|L|N|S|J|u|l|n|s|j](\w){1})/;
//     const modelExec = LGModelPattern.exec(title);
//     const extractedModel = modelExec ? modelExec[0] : "";
//     return extractedModel;
// }

// const uploadExpertByDay = day => {
//     const year = 2018;
//     const month = 12;
//     const entities = JSON.parse(fs.readFileSync(`./uploader/data/expert/${day}.${month}.${year}.json`, 'utf8'));
//     entities.forEach(entity => {
//         const model = getModel(entity.title);
//         if(model){
//             const newTv = new Tv({
//                 model: model,
//                 date: new Date(year, month - 1, day + 1),
//                 price: entity.price,
//                 diagonal: entity.diagonal,
//                 title: entity.title,
//                 source: sources.MEDIA_EXPERT,
//                 isProductAvailable: entity.isProductAvailable,
//                 url: entity.productUrl,
//             });
//             newTv.save();
//         } else {
//             console.log(`model unrecognized: ${entity.title}`);
//         }

//     });
//     console.log(`saved`);
// }


// module.exports = upload;

db.agg.aggregate([ 
    { $sort: { "model": 1, "date": -1 }}, 
    { 
        $group: { 
            _id: "$model", 
            newestDate: { "$first": "$date" },
            newestPrice: { "$first": "$price"},
        }
    }
])

db.agg.aggregate([ 
    { $sort: { "model": 1, "price": 1 }}, 
    { 
        $group: { 
            _id: "$model", 
            lowestPrice: { "$first": "$price" },
            lowestPriceDate: { "$first": "$date"},
        }
    }
]);

