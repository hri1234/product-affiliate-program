//models
const Invoice = require('../models/invoice.model.js')
//service
const service = require("../services/invoice.service");
//response handler
const { sendResponse } = require("../utils/sendResponse.js");
const { SuccessMessage, ErrorMessage } = require("../constants/messages.js");
const statusCode = require("../constants/statusCodes.js");
const { decode } = require('jsonwebtoken');

exports.createInvoice = async (req, res) => {
    try {

        const result = await service.createInvoice(req.body)
        if (result.status == false && result.result) {
            return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR);
        }
        if (result.status == true && result.result) {
            return sendResponse(res, statusCode.OK, true, `Invoice ${SuccessMessage.CREATED}`, result);

        }
        return sendResponse(res, statusCode.BAD_REQUEST, false, ErrorMessage.BAD_REQUEST);




    } catch (error) {
        console.error('Error In Create Invoice', error);
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors);

    }
}

exports.userInvoiceList = async (req, res) => {

    try {
        const id = req.params.id
        const result = await service.getInvoiceList(id, req)
        if (result.status == false && result.result) {
            return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR);
        }
        if (result.status == true && result.result) {
            return sendResponse(res, statusCode.OK, true, `Invoice list ${SuccessMessage.FETCH}`, result);

        }
        if (result.status == false && !result.result) {
            return sendResponse(res, statusCode.NOT_FOUND, false, ErrorMessage.NOT_FOUND, result);

        }




    } catch (error) {
        console.error('Error In Invoice List', error);
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors);

    }

}
exports.updateStatus = async (req, res) => {
    try {

        const id = req.params.id
        const status = req.body.status
        const result = await service.updateStatus(id, status)
        if (result.status == true && result.result) {
            return sendResponse(res, statusCode.OK, true, `Status  ${SuccessMessage.UPDATE}`, result);

        }
        if (result.status == false && result.result) {
            return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR);
        }
        if (result.status == false && !result.result) {
            return sendResponse(res, statusCode.NOT_FOUND, false, ErrorMessage.NOT_FOUND, result);
        }


    } catch (error) {
        console.log('error in update status api', error);
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.error)
    }
}

exports.updateInvoice = async (req, res) => {
    try {

        const id = req.params.id
        const body = req.body
        const result = await service.updateInvoice(id, body)
        return sendResponse(res, statusCode.OK, true, `Status  ${SuccessMessage.UPDATE}`, result);

    } catch (error) {
        console.log('error in update status api', error);
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.error)
    }
}