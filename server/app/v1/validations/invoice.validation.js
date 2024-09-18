const statusCodes = require('../constants/statusCodes');
const schema=require('./schema/invoice.schema')

exports.addInvoice=async (req,res,next)=>{
const {error}=schema.createInvoiceSchema.validate(req.body);
if(error){
    res.status(statusCodes.BAD_REQUEST).json({error:error.details[0].message})
}
else{
    next()
}

};

exports.updateStatus=async (req,res,next)=>{
const {error}=schema.updateStatuSchema.validate(req.body);
if(error){
    res.status(statusCodes.BAD_REQUEST).json({error:error.details[0].message})
}
else{
    next()
}

};
