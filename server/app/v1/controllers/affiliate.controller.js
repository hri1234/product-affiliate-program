const service = require("../services/affiliate.service.js");
const { sendResponse } = require("../utils/sendResponse.js");
const { SuccessMessage, ErrorMessage } = require("../constants/messages.js");
const statusCode = require("../constants/statusCodes.js");
const db = require("../models");
const Affiliate = db.affiliate;

//add affiliate link
exports.addAffiliate = async (req, res) => {
    try {
        if (req.checkImage === "Only images are allowed") {
            return sendResponse(res, statusCode.BAD_REQUEST, false, `Only Images Are Allowed`)
        }
        const link = req.body.link
        //short link id generate
        const shortUrl = await service.shortLink(req, res, link)
        const result = await service.addAffiliate(req, res, shortUrl)
        if (result.status == false && result.isAlreadyExist == true) {
            return sendResponse(res, statusCode.BAD_REQUEST, false, `Affiliate With Given Name ${ErrorMessage.ALREADY_EXIST}`)

        }
        if (result.status) {
            return sendResponse(res, statusCode.CREATED, true, SuccessMessage.CREATED, result)

        }
        else if (result.status == false && !result.result) {
            sendResponse(res, statusCode.BAD_REQUEST, false, ErrorMessage.BAD_REQUEST)
        }
        else if (result.status == false && result.result) {
            return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR)
        }
    } catch (error) {
        console.log(error)
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR)
    }
}

// redirect short link 
exports.redirectShortLink = async (req, res) => {
    try {
        const result = await service.redirectShortLink(req, res)
        if (result.status && result) {
            res.redirect(result.result)
        }
        else if (result.status == false && !result.result) {
            sendResponse(res, statusCode.NOT_FOUND, false, ErrorMessage.NOT_FOUND)

        }
        else if (result.status == false && result.result) {
            return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR)

        }
    } catch (error) {
        console.log(error)
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR)

    }
}

//get affiliate
exports.getAffiliate = async (req, res) => {
    try {
        const result = await service.getAffiliate(req, res);
        if (result.status && result) {
            return sendResponse(res, statusCode.OK, true, `Affiliate ${SuccessMessage.FETCH}fully`, result.result)
        }
        else if (result.status == false && !result.result) {
            sendResponse(res, statusCode.BAD_REQUEST, false, ErrorMessage.BAD_REQUEST)

        }
        else if (result.status == false && result.result) {
            return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR)

        }
    } catch (error) {
        console.log(error)
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR)

    }
}


//add asign affiliate
exports.addAssignAffiliate = async (req, res) => {
    try {
        const id = req.params.id
        const details = req.body
        const result = await service.addAssignAffiliate(id, details)
        return sendResponse(res, statusCode.CREATED, true, SuccessMessage.CREATED, result)

    } catch (error) {
        console.log(error)
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR)

    }
}

//get affilaite customer
exports.getAffiliateCusomter = async (req, res) => {
    try {

    } catch (error) {
        console.log(error)
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR)

    }
}

//update Affiliate 
exports.updateAffiliate = async (req, res) => {
    try {
        const id = req.params.id
        const details = req.body
        const result = await service.updateAffiliate(id, details,req)
        if(result.status && result.result){
            return sendResponse(res, statusCode.CREATED, true, SuccessMessage.UPDATE, result)
        }
        if(result.status==false && !result.result){
            return sendResponse(res, statusCode.NOT_FOUND, false, ErrorMessage.NOT_FOUND)
        }
        if(result.status==false && result.result){
            return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR)
        }
       

    } catch (error) {
        console.log(error)
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR)
    }
}