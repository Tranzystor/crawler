// const Tv = require('../models/tv.model');

// const query  = async () => {
//     const models = await Tv.distinct('model').exec();
//     console.log(models.length);

//     const groupedModels = await Promise.all(models.map(async model => {
//         const www = await Tv.find({model}).exec();
//         const sortByDate = www.sort((a,b) => new Date(a.date) - new Date(b.date));
//         return {
//             model,
//             elements: sortByDate
//         }
//     }));

//     console.log(groupedModels);
// }

// module.exports = query;