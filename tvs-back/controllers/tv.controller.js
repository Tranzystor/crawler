const queryService = require('../db/services/tv.queryService');

const getTvsByModel = async (_, res) => {
    const groupedModels = await queryService.getTvsByModel();
    res.send(groupedModels);
}

module.exports = {
    getTvsByModel
}
