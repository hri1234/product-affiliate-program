const schema = require("./schema/auth.schema.js");
const statusCode = require("../constants/statusCodes.js");
//
exports.login = async (req, res, next) => {
    const { error } = schema.loginSchema.validate(req.body,{abortEarly:false});
    if (error) {
        res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
    } else {
        next();
    }
};

exports.updatePassword=async (req,res,next)=>{
    const {error}=schema.updatePassword.validate(req.body)
    if (error) {
        res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
    } else {
        next();
    }
}

exports.register = async (req, res, next) => {
    const { error } = schema.registerSchema.validate(req.body,{abortEarly:false});
    if (error) {
        res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
    } else {
        next();
    }
};

exports.resetPassword = async (req, res, next) => {
    const { error } = schema.resetPasswordSchema.validate(req.body);
    if (error) {
        res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
    } else {
        next();
    }
};

exports.forgotPassword = async (req, res, next) => {
    const { error } = schema.forgotPasswordSchema.validate(req.body);
    if (error) {
        res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
    } else {
        next();
    }
};
exports.updateProfile=async (req,res,next)=>{
    const {error}=schema.updateProfile.validate(req.body);
    if (error) {
        res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
    } else {
        next();
    }
}

exports.list = async (req, res, next) => {
    const { error } = schema.listSchema.validate(req.body);
    if (error) {
        res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
    } else {
        next();
    }
};

exports.id = async (req, res, next) => {
    const { error } = schema.idSchema.validate({ id: req.params.id });
    if (error) {
        res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
    } else {
       next();
    }
};

exports.npoImageType = async (req, res, next) => {
    const { error } = schema.npoImageTypeSchema.validate({ type: req.query.type });
    if (error) {
        res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
    } else {
       next();
    }
};
