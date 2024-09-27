const { AdminDetails } = require("../constants/constants");
//response handler
const { SuccessMessage, ErrorMessage } = require("../constants/messages.js");
const { sendResponse } = require("../utils/sendResponse.js");
const statusCode = require("../constants/statusCodes.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const emailConfig = require('../config/email');
const emailTemplates = require('../utils/emailTemplate.js');
const ShortUniqueId = require('short-unique-id');


const db = require("../models");
const Users = db.users;
const Affiliate = db.affiliate;
const AssignAffiliate = db.affiliateAssign


// login service 
exports.login = async (details) => {
    // check email password for Npo

    // check email exist or not for admin 
    const user = await Users.findOne({ where: { email: details.email } });

    // log(user)
    if (!user) {
        return { status: false, message: `User ${ErrorMessage.NOT_FOUND}` };
    }
    if (!user.isActive) {
        return { status: false, message: `${ErrorMessage.IN_ACTIVE}` };
    }
    // Compare password
    const isPasswordValid = await bcrypt.compare(details.password, user.password);
    if (!isPasswordValid) {
        return { status: false, message: `${ErrorMessage.INVALID_CREDENTIAL}` };
    }
    // create jwt token for admin
    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET_KEY,
        { expiresIn: Math.floor(Date.now() / 1000) + 60 * 60, }
    );
    return { status: true, message: { accessToken: token } };
}

//register service
exports.register = async (details, userId) => {

    const exist = await this.ifIdAlreadyExist(userId)
    if (exist.status == false && exist.userId) {
        return { status: false, result: exist.userId };
    }
    if (exist.status == false) {
        const data = { ...details, userId: exist.userId }
        const userDetails = await Users.create(data);
        // remove password
        delete userDetails.dataValues.password;

        const assignAffiliate = await bulkAssign(userDetails.id)
        return userDetails;
    }



}

//bulk assign 
const bulkAssign = async function (id) {
    const affiliates = await Affiliate.findAll()
    // Prepare data for bulkCreate
    const bulkData = [];
    for (const affiliate of affiliates) {
        bulkData.push({
            affiliateId: affiliate.id,
            userId: id
        });
    }
    // Perform bulkCreate once with all data
    const createdAssign = await AssignAffiliate.bulkCreate(bulkData);
    if (createdAssign) {
        return true;
    }
    return false
}

exports.generateId = async () => {
    const uid = new ShortUniqueId({ length: 10 })
    return uid.rnd()
}
exports.ifIdAlreadyExist = async (userId) => {
    const isExist = await Users.findOne({ where: { userId } })
    if (isExist) {
        userId = await this.generateId()

        this.ifIdAlreadyExist(userId)

    }

    return { status: false, userId: userId }


}


exports.updatePassword = async (id, oldPassword, newPassword) => {

    const user = await Users.findOne({ where: { id: id } });
    if (!user) {
        return { status: false, message: `User ${ErrorMessage.NOT_FOUND}` };
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password)

    if (!isPasswordValid) {
        return { status: false, message: `User ${ErrorMessage.INVALID_CREDENTIAL}` };
    }
    console.log("user:", isPasswordValid);
    const newHashPass = await this.genHashPassword(newPassword)
    const result = await Users.update({
        password: newHashPass
    }, {
        where: {
            id: id
        }
    })

    return {
        status: true, message: `password ${SuccessMessage.UPDATE}`
    }

}


exports.genHashPassword = async (password) => {
    if (password) {
        const salt = await bcrypt.genSalt(10);
        return password = await bcrypt.hash(password, salt);
    }
}

//get user profile
exports.getUserProfile = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const id = jwt.decode(token).id
        const user = await Users.findOne({ where: { id: id } })
        if (user) {

            delete user.dataValues.password
            return {
                status: true,
                result: user
            }
        }
        else {
            return {
                status: false,
            }
        }
    } catch (error) {
        return {
            status: false,
            result: error
        }
    }
}

//update user profile
exports.updateProfile = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const id = jwt.decode(token).id
        const updatedUser = await Users.update(
            req.body,
            {
                where:
                {
                    id: id
                }
            }
        )
        if (updatedUser) {
            return {
                status: true,
                result: updatedUser
            }
        }
        else {
            return {
                status: false
            }
        }

    } catch (error) {
        return {
            status: false,
            result: error
        }
    }
}

//forget password
exports.forgetPassword = async (req, res) => {
    try {
        const email = req.body.email
        const isExisted = await Users.findOne({ where: { email: email } })
        if (isExisted) {
            const transporter = nodemailer.createTransport(emailConfig);
            const mailOptions = emailTemplates.resetLink(email, `${process.env.RESET_PASSWORD_LINK}/${isExisted.id}`);
            const sendMailPromise = () => {
                return new Promise((resolve, reject) => {
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.error(`Reset Password ${ErrorMessage.EMAIL_NOT_SEND}`, error);
                            reject({ status: false, message: ErrorMessage.EMAIL_NOT_SEND });
                        } else {
                            console.log(`Reset Password ${SuccessMessage.EMAIL_SEND}`, info.response);
                            resolve({ status: true, message: SuccessMessage.EMAIL_SEND });
                        }
                    });
                });
            };

            // Await the result of sendMailPromise
            const result = await sendMailPromise();
            if (result) {
                return {
                    status: true
                }
            }
            else {
                return {
                    status: false
                }
            }

        }
        else {
            return {
                status: false,
                isExist: false
            }
        }


    } catch (error) {
        console.log(error)
        return {
            status: false,
            result: error
        }
    }
}


//reset password
exports.resetPassword = async (id, password, role) => {
    try {
        const hashPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUND));
        const isExist = await Users.update({ password: hashPassword }, { where: { id } });
        if (!isExist[0]) {
            return {
                status: false
            }
        }
        return {
            status: true
        }
    } catch (error) {
        console.log(error)
        return {
            status: false,
            result: error
        }
    }
}
