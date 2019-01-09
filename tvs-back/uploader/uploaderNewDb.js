const fs = require('fs');
const saveTvOffers = require('../db/services/tv.service');
const sources = require('../utils/constants');

const uploadByDayAllegro = day => {
    const year = 2018;
    const month = 12;
    const tvOffers = JSON.parse(fs.readFileSync(`./uploader/data/allegro/${day}.${month}.${year}.json`, 'utf8'));
    const readyToUpload = tvOffers.map(offer => {
        const priceNumber = offer.price.replace(",",".").split(' ').join('');
        return {
            model: offer.model,
            date: new Date(year, month - 1, day + 1),
            price: priceNumber,
            diagonal: offer.diagonal,
            title: offer.title,
            source: sources.ALLEGRO,
            isProductAvailable: true,
            url: "",
        };
    });
    saveTvOffers(readyToUpload);
}

const uploadAllegro = () => {
    uploadByDayAllegro(24);
    // uploadByDayAllegro(26);
    // uploadByDayAllegro(28);
}

const getModel = title => {
    const LGModelPattern = /((\d\d)[L|l|U|u|E|e|P|p|S|s][K|k|J|j|H|h|F|f|G|g|B|b|C|c|N|n|A|a|W|w|M|m|S|s|V|v](\d){4}[P|p|W|w|S|s|A|a][U|u|L|l|N|n|S|s|J|j](\w){1}|(\d\d)[L|l|U|u|E|e|P|p|S|s][K|k|J|j|H|h|F|f|G|g|B|b|C|c|N|n|A|a|W|w|M|m|S|s|V|v](\d){3}(\w){1}|(\d\d)(\w){1}[6|7|8][T|D|P|V|J|P|W|S|A|t|d|p|v|j|p|w|s|a][U|L|N|S|J|u|l|n|s|j](\w){1})/;
    const modelExec = LGModelPattern.exec(title);
    const extractedModel = modelExec ? modelExec[0] : "";
    return extractedModel;
}


const uploadExpertByDay = day => {
    const year = 2018;
    const month = 12;
    const offers = JSON.parse(fs.readFileSync(`./uploader/data/expert/${day}.${month}.${year}.json`, 'utf8'));
    const readyToUpload = offers.map(offer => {
        const model = getModel(offer.title);
        if(model){
            return {
                model: model,
                date: new Date(year, month - 1, day + 1),
                price: offer.price,
                diagonal: offer.diagonal,
                title: offer.title,
                source: sources.MEDIA_EXPERT,
                isProductAvailable: offer.isProductAvailable,
                url: offer.productUrl,
            };
            
        }
        return null;
    }).filter(x => x);

    //TODO: call db service to push data
}

const uploadExpert = () => {
    uploadExpertByDay(20);
    uploadExpertByDay(21);
    uploadExpertByDay(22);
    uploadExpertByDay(23);
    uploadExpertByDay(24);
    uploadExpertByDay(26);
}

const upload = () => {
    uploadAllegro();
    // uploadExpert();
}

module.exports = upload;