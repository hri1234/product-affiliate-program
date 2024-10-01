const Joi = require("joi");
const { NPO_TYPE } = require('../../constants/enum')

const emailSchema = Joi.string().email().required()
const passwordSchema = Joi.string()
    //   .pattern(/(?=.*[a-z])/, 'lowercase letter') 
    //   .pattern(/(?=.*[A-Z])/, 'uppercase letter') 
    //   .pattern(/(?=.*[\W_])/, 'special character') 
    .min(6)
    .max(20)
    .required();


exports.loginSchema = Joi.object({
    email: emailSchema.required(),
    password: passwordSchema

});
exports.updatePassword = Joi.object({
    oldPassword: passwordSchema,
    newPassword: passwordSchema
})

exports.registerSchema = Joi.object({
    email: emailSchema.required(),
    password: passwordSchema,
    paypalAddress: Joi.string().optional(),
    country: Joi.string().optional(),
    city: Joi.string().optional(),
    address: Joi.string().optional(),
    companyName: Joi.string().allow(null, '').optional(),
    // companyNumber: Joi.number().optional(),
    companyUrl: Joi.string().allow(null, '').optional(),
    phone: Joi.number().max(10).optional(),
    role: Joi.string().valid('admin', 'customer').optional(),
    isActive: Joi.boolean().optional(),
    commisionByPercentage: Joi.number().optional(),
});

exports.resetPasswordSchema = Joi.object({
    password: passwordSchema
});

exports.forgotPasswordSchema = Joi.object({
    email: emailSchema.required(),
})
exports.updateProfile = Joi.object({

    paypalAddress: Joi.string().optional(),
    country: Joi.string().optional(),
    city: Joi.string().optional(),
    address: Joi.string().optional(),
    companyName: Joi.string().allow(null, '').optional(),
    companyNumber: Joi.number().optional(),
    companyUrl: Joi.string().allow(null, '').optional(),
    phone: Joi.number().max(10).optional(),
    role: Joi.string().valid('admin', 'customer').optional(),
    isActive: Joi.boolean().optional()
})

exports.listSchema = Joi.object({
    limit: Joi.number().optional(),
    offset: Joi.number().optional(),
})

exports.idSchema = Joi.object({
    id: Joi.number().required(),
})

exports.npoImageTypeSchema = Joi.object({
    type: Joi.valid(NPO_TYPE.LOGO, NPO_TYPE.BANNER, NPO_TYPE.TEXT).required()
})