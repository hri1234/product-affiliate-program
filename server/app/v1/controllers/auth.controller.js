const service = require("../services/auth.service");
const { sendResponse } = require("../utils/sendResponse.js");
const { SuccessMessage, ErrorMessage } = require("../constants/messages.js");
const statusCode = require("../constants/statusCodes.js");
const useragent = require('useragent');
const requestIp = require('request-ip');
const crypto  = require('crypto')


// login controller
exports.login = async (req, res) => {
    console.log(req.ip, "------------------req.ip")
    // console.log(req.cookies.deviceId,"---------------------->cookie")
    console.log(req.headers['user-agent'], "------------------>req.header user agent")
    const userAgentString = req.headers['user-agent'];
    const userAgent = useragent.parse(userAgentString);

    // Get the client's IP address
    const clientIp = req.clientIp;
    console.log(clientIp, "-------------------client ipsssssssssssssssss")
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('Client IP:', ip);
    const userInfo = {
        device: userAgent.device.toString(),
        os: userAgent.os.toString(),
        browser: userAgent.toString(),
        ip: clientIp,
        // location: geoData.city || 'Unknown',
        // country: geoData.country_name || 'Unknown'
    };
    console.log(userInfo, "user info")
    const data = `${ip}-${userAgent}`;
    const hashed_ip =  crypto.createHash('sha256').update(data).digest('hex');
    console.log(hashed_ip,"hashed Ip")
    console.info('***************************************************Login Api************************************************');
    try {
        const details = req.body;
        const result = await service.login(details);
        if (!result.status) {
            return sendResponse(res, statusCode.BAD_REQUEST, false, result.message);
        }
        return sendResponse(res, statusCode.OK, true, SuccessMessage.LOGIN, result.message);
    } catch (error) {
        console.error('Error in login api : ', error);
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors);
    }
};

//  register controller
exports.register = async (req, res) => {
    console.info('***************************************************Register Api************************************************');
    try {
        const details = req.body;
        console.log(details);
        const uniqueId = await service.generateId()
        const result = await service.register(details, uniqueId);
        return sendResponse(res, statusCode.OK, true, `User ${SuccessMessage.CREATED}`, result);
    } catch (error) {
        console.error('Error in register api : ', error);
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors);
    }
};


exports.updatePassword = async (req, res) => {
    console.info('********************************************************Update Password*********************************************')
    try {
        const id = req.currUser.id
        const oldPassword = req.body.oldPassword
        const newPassword = req.body.newPassword
        // console.log(id, oldPassword,newPassword);
        const result = await service.updatePassword(id, oldPassword, newPassword)
        if (!result.status) {
            return sendResponse(res, statusCode.BAD_REQUEST, false, result.message)
        }

        return sendResponse(res, statusCode.OK, true, result.message, result)


    } catch (error) {
        console.error('Error in update Password api : ', error);
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors)
    }
}
//forget password
exports.forgetPassword = async (req, res) => {
    try {
        const result = await service.forgetPassword(req, res)
        console.log(result)
        if (result.status == false && result.result == false) {
            return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, result.result);
        }
        if (result.status == false && result.isExist == false) {
            return sendResponse(res, statusCode.NOT_FOUND, false, `User ${ErrorMessage.NOT_FOUND}`);
        }
        if (result.status == false) {
            return sendResponse(res, statusCode.BAD_REQUEST, false, ErrorMessage.BAD_REQUEST);
        }
        return sendResponse(res, statusCode.OK, true, SuccessMessage.FORGOT_PASSWORD)
    } catch (error) {
        console.log(error)
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors);

    }
}


//reset password
exports.resetPassword = async (req, res) => {
    try {
        const id = req.params.id
        const password = req.body.password
        const result = await service.resetPassword(id, password)
        if (result.status) {
            return sendResponse(res, statusCode.OK, true, SuccessMessage.RESET_PASSWORD)
        }
        if (result.status == false && result.result) {
            return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors);

        }
        return sendResponse(res, statusCode.NOT_FOUND, false, `User ${ErrorMessage.NOT_FOUND}`);

    } catch (error) {
        console.log(error)
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors);

    }
}

//get user profile
exports.getProfile = async (req, res) => {
    try {
        const result = await service.getUserProfile(req, res)
        if (result.status) {
            return sendResponse(res, statusCode.OK, true, `User Details${SuccessMessage.FETCH}`, result);
        }
        else if (result.status == false && result.result) {
            return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, result.result);
        }
        else {
            return sendResponse(res, statusCode.BAD_REQUEST, false, ErrorMessage.BAD_REQUEST);

        }
    } catch (error) {
        console.log(error)
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors);

    }
}

//update profile
exports.updateProfile = async (req, res) => {
    try {
        const result = await service.updateProfile(req, res)
        console.log(result)
        if (result.status && result.result) {
            return sendResponse(res, statusCode.OK, true, `User Profile ${SuccessMessage.UPDATE}`);
        }
        if (result.status == false && result.result) {
            return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, result.result);
        }
        if (result.status) {
            return sendResponse(res, statusCode.BAD_REQUEST, false, ErrorMessage.BAD_REQUEST);
        }
    } catch (error) {
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors);

    }
}
