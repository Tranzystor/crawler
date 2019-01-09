const tvOffer = require('../models/tvOffer.model');

exports.getTvs = async (_, res) => {
    const models = await Tv.distinct('model').exec();

    const groupedModels = await Promise.all(models.map(async model => {
        const tvsByModel = await Tv.find({model}).exec();
        const sortByDate = tvsByModel.sort((a,b) => new Date(a.date) - new Date(b.date));
        return {
            model,
            elements: sortByDate
        }
    }));

    res.send(groupedModels);
}
