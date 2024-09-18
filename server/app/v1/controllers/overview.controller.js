const overviewService = require("../services/overview.service.js");
const { sendResponse } = require("../utils/sendResponse.js");
const { SuccessMessage, ErrorMessage } = require("../constants/messages.js");
const statusCode = require("../constants/statusCodes.js");

const { decode } = require('jsonwebtoken')


exports.getOverviews = async (req, res) => {
    try {
        const id = req.params.id
        const result = await overviewService.getOverviews(req, res, id)
        return sendResponse(res, statusCode.OK, true, SuccessMessage.FETCH, result);

    } catch (error) {
        console.log(error);
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR);
    }
}