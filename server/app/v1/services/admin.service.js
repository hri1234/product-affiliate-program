const shortid = require('shortid');
const db = require("../models");
const Affiliate = db.affiliate;
const Users = db.users
const AffiliateAssign = db.affiliateAssign
// const Users
const jwt = require('jsonwebtoken');
const fs = require('fs')
const path = require('path')
const { Op, where } = require('sequelize');

exports.allUsers = async (req) => {
    try {

        const page = parseInt(req.body.page) || 1;  // Default to page 1
        const limit = parseInt(req.body.limit) || 10;  // Default to 10 items per page
        const offset = (page - 1) * limit;

        const result = await Users.findAndCountAll({
            limit: limit,
            offset: offset,
            where: { role: 'customer' },
            include:
            {
                model: AffiliateAssign,
                attributes: ['affiliateId']
            },

            order: [['createdAt', 'DESC']],
            attributes: ["id", "email", "country", "city", "address", "userId", "companyName", "companyNumber", 'createdAt'],
            distinct: true


        });


        if (result) {
            await result?.rows?.map(user => {
                const affiliateCount = user.affiliateAssigns.length;
                user.dataValues.affiliateCount = affiliateCount;
                delete user.dataValues.affiliateAssigns
            });

            return {
                status: true,
                result: result
            }
        }
        else {
            return {
                status: false
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


exports.notAssignedCustomers = async (affiliateId, req) => {
    try {

        const page = parseInt(req.body.page) || 1;  // Default to page 1
        const limit = parseInt(req.body.limit) || 10;  // Default to 10 items per page
        const offset = (page - 1) * limit;

        const affiliateDetails = await AffiliateAssign.findAll({

            where: { affiliateId }, attributes: ['userId']

        });
        const assignedUserIds = affiliateDetails.map(detail => detail.userId);

        const result = await Users.findAndCountAll({
            limit: limit,
            offset: offset,
            where: {
                id: {
                    [Op.notIn]: assignedUserIds.length > 0 ? assignedUserIds : [0]
                },
                role: 'customer'
            },
            order: [['createdAt', 'DESC']],
            distinct: true
        });
        if (result) {
            return {
                status: true,
                result: result
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


exports.affiliateListAssign = async (id, req) => {
    try {

        const page = parseInt(req.body.page) || 1;  // Default to page 1
        const limit = parseInt(req.body.limit) || 10;  // Default to 10 items per page
        const offset = (page - 1) * limit;

        const allAdminAffiliates = await AffiliateAssign.findAndCountAll({
            limit: limit,
            offset: offset,
            where:
            {
                affiliateId: id
            },
            include: [
                {
                    model: Users,
                }
            ],
            distinct: true
        })
        if (allAdminAffiliates) {
            return {
                status: true,
                result: allAdminAffiliates
            }
        }

        return {
            status: false,

        }

    } catch (error) {
        console.log(error)
        return {
            status: false,
            result: error
        }
    }
}

exports.userAffiliates = async (userId, req) => {
    try {

        const page = parseInt(req.body.page) || 1;  // Default to page 1
        const limit = parseInt(req.body.limit) || 10;  // Default to 10 items per page
        const offset = (page - 1) * limit;

        const assignAffiliateDetails = await AffiliateAssign.findAndCountAll({

            limit: limit,
            offset: offset,

            where: { userId },
            include: [
                {
                    model: Affiliate,
                    require: true
                }
            ],
            order: [
                ['createdAt', 'DESC'],
            ],
            distinct: true
        });



        assignAffiliateDetails?.rows.forEach(obj => {


            if (obj.dataValues.affiliate.imageUrl !== null && obj.dataValues.affiliate.imageUrl !== undefined) {

                const dir = path.join(__dirname, "..")
                const newpath = `${dir}/utils/images/${obj.dataValues.affiliate.imageUrl}`

                if (fs.existsSync(`${newpath}`)) {

                    obj.dataValues.affiliate.imageUrl = req.hostname + '/' + obj.dataValues.affiliate.imageUrl

                }



            }

        });
        if (assignAffiliateDetails) {
            return {
                status: true,
                result: assignAffiliateDetails
            }
        }
        return {
            status: false
        }


    } catch (error) {
        console.log(error)
        return {
            status: false,
            result: error
        }

    }
}
