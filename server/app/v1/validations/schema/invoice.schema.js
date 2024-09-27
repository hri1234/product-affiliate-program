const Joi = require('joi')
exports.createInvoiceSchema = Joi.object({
    themeName: Joi.string().required(),
    userId: Joi.number().integer().required(),
    domain: Joi.string().optional(),
    commission: Joi.number().integer().required(),
    paymentMethod: Joi.string().required().valid("payPal"),
    transactionId: Joi.string().required(),
    invoiceId: Joi.string().allow(null, "").optional(),
    status:Joi.string().allow(null, "").optional(),
})


exports.updateStatuSchema = Joi.object({
    status: Joi.string().required().valid("Paid", "Pending", "Failed")
})
