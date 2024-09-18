const schema=require('./schema/affiliate.schema.js')

const statusCode=require('../constants/statusCodes.js')

exports.addAffiliate=async (req,res,next)=>{
const {error}=schema.addAffiliateSchema.validate(req.body)
if(error){
    res.status(statusCode.BAD_REQUEST).json({error:error.details[0].message});
}
else{
    next();
}
}
 
exports.updateAffiliate=async (req,res,next)=>{
const {error}=schema.updateAffiliateSchema.validate(req.body)
if(error){
    res.status(statusCode.BAD_REQUEST).json({error:error.details[0].message});
}
else{
    next();
}
}
 