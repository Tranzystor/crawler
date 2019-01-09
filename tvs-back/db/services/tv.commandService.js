const tvOffer = require('../../models/tvOffer.model');

const saveTvOffers = offers => {
    const tvOfferEntities = offers.map(offer => {
        return new tvOffer({
            model: offer.model,
            date: offer.date,
            price: offer.price,
            diagonal: offer.diagonal,
            title: offer.title,
            source: offer.source,
            isProductAvailable: offer.isProductAvailable,
            url: offer.url,
        })
    });
    tvOffer.insertMany(tvOfferEntities);
}

module.exports = saveTvOffers;
