const statusCodes = require('../constants/statusCodes');
const schema=require('./schema/clickPurchase.schema')

exports.addClickAndPurchases=async (req,res,next)=>{
const {error}=schema.addClickAndPurchases.validate(req.body);
if(error){
    res.status(statusCodes.BAD_REQUEST).json({error:error.details[0].message})
}
else{
    next()
}

};
exports.getClickAndPurchasesList=async (req,res,next)=>{
const {error}=schema.getClickAndPurchasesList.validate(req.body);
if(error){
    res.status(statusCodes.BAD_REQUEST).json({error:error.details[0].message})
}
else{
    next()
}

};