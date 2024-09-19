const service = require("../services/affiliate.service.js");
const { sendResponse } = require("../utils/sendResponse.js");
const { SuccessMessage, ErrorMessage } = require("../constants/messages.js");
const statusCode = require("../constants/statusCodes.js");
const db = require("../models");
const Affiliate = db.affiliate;
//aws 
const aws = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const spacesEndpoint = new aws.Endpoint(process.env.S3_ENDPOINT);
const s3 = new aws.S3({
    endpoint: spacesEndpoint,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_ACCESS_SECRET_KEY
    }
});

//add affiliate link
exports.addAffiliate = async (req, res) => {
    try {

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

exports.fileUpload = async (request, response) => {
    try {
       
        const shop = "images"
        let uploadPromises = {}
        const file = request.file
        if (request.file) {
            const storageUuid = uuidv4();
            const fileContent = file.buffer;
            const originalname = file.originalname;
            const extension = path.extname(originalname);
            const type = file.mimetype;
            const key = `${storageUuid}${extension}`;
            const params = {
                Bucket: `${process.env.S3_BUCKET}/${shop}`,
                Key: key,
                Body: fileContent,
                ACL: "public-read",
                ContentType: type
            };

            // Create a promise for each file upload
            const uploadPromise = new Promise((resolve, reject) => {
                s3.putObject(params, (err, data) => {
                    if (err) {
                        console.error("Error uploading image:", err);
                        reject(err);
                    } else {
                        const fileUrl = `${process.env.S3_BASEURL}/${shop}/${key}`;
                        resolve({ id: storageUuid, url: fileUrl });
                    }
                });
            });
            const result = await uploadPromise
            uploadPromises.id = await result.id;
            uploadPromises.url = await result.url;

        }
        if (uploadPromises) {
            return sendResponse(response, statusCode.OK, true, SuccessMessage.UPLOAD_FILE_SUCCESS, uploadPromises);
        } else {
            return sendResponse(response, statusCode.BAD_REQUEST, false, ErrorMessage.UPLOAD_FILE_FAILURE);
        }
    } catch (error) {
        console.log(error);
        return sendResponse(response, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR);
    }
};
