const Joi = require("joi");




exports.addClickAndPurchases = Joi.object({

    type: Joi.string().required().valid('clicks', 'purchases')


});
exports.getClickAndPurchasesList = Joi.object({

    type: Joi.string().required().valid('clicks', 'purchases'),
    assignAffiliateId: Joi.string()
    .optional()
    .when(Joi.ref('type'), {
        is: 'clicks',
        then: Joi.string().required(),
        otherwise: Joi.string().optional()
    }),
    month:Joi.string().required(),
    year:Joi.string().required(),


   



});

