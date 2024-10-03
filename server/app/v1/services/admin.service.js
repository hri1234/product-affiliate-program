const shortid = require('shortid');
const { Sequelize } = require('sequelize');

const db = require("../models");
const Affiliate = db.affiliate;
const Users = db.users
const AffiliateAssign = db.affiliateAssign
const ClickAndPurchases = db.ClickAndPurchases
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
        const query = req.body.search || "";


        const result = await Users.findAndCountAll({
            limit: limit,
            offset: offset,
            where: {
                role: 'customer',
                [Op.or]: {
                    email: {
                        [Op.like]: `${query}%`,
                    },
                    userId: {
                        [Op.like]: `${query}%`,
                    },
                    companyName: {
                        [Op.like]: `${query}%`,
                    },
                },
            },
            include: [{
                model: AffiliateAssign,
                attributes: ['id', 'affiliateId', "clicks"], // Get only the affiliateId field
            }],
            distinct: true,
        });
        for (const user of result.rows) {
            let totalClicks = 0;
            let totalAffiliateAssign = 0;
            if (user?.affiliateAssigns?.length) {
                for (const assingAffiliate of user.affiliateAssigns) {
                    totalAffiliateAssign += 1
                    totalClicks += assingAffiliate?.clicks || 0;
                }

            }
            user.dataValues.totalClicks = totalClicks
            user.dataValues.affiliateCount = totalAffiliateAssign
        }

        return {
            status: true,
            result: result
        }

    } catch (error) {
        console.log(error)
        return {
            status: false,
            result: error
        }
    }
}


//not assigned
exports.notAssignedCustomers = async (affiliateId, req) => {
    try {

        const page = parseInt(req.body.page) || 1;  // Default to page 1
        const limit = parseInt(req.body.limit) || 10;  // Default to 10 items per page
        const offset = (page - 1) * limit;
        const query = req.body.search || ""

        const affiliateDetails = await AffiliateAssign.findAll({

            where: {
                affiliateId

            }, attributes: ['userId']

        });
        const assignedUserIds = affiliateDetails.map(detail => detail.userId);

        const result = await Users.findAndCountAll({
            limit: limit,
            offset: offset,
            where: {
                id: {
                    [Op.notIn]: assignedUserIds.length > 0 ? assignedUserIds : [0]
                },
                [Op.or]: {
                    email: {
                        [Op.like]: `${query}%`,
                    },
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
        const query = req.body.search || ""

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
                    where: {
                        [Op.or]: {
                            email: {
                                [Op.like]: `${query}%`,
                            },
                        }

                    }
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
        const query = req.body.search || ""

        const user = await Users.findOne({ where: { id: userId } });
        if (!user) {
            return {
                status: false,
            }
        }
        const assignAffiliateDetails = await AffiliateAssign.findAndCountAll({

            limit: limit,
            offset: offset,

            where: {
                userId,
            },
            include: [
                {
                    model: Affiliate,
                    where: {
                        [Op.or]: {
                            name: {
                                [Op.like]: `${query}%`,
                                // [Op.like]: {shortId:`${query}%`}
                            },
                            shortId: {
                                [Op.like]: `${query}%`
                            }
                        },
                    },
                    require: true
                }
            ],
            order: [
                ['createdAt', 'DESC'],
            ],
            distinct: true
        });



        const uniqueId = user.userId
        assignAffiliateDetails["uniqueId"] = uniqueId

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


exports.deleteAffiliate = async (affiliateId, req) => {

    try {
        const isExist = await Affiliate.findOne({ where: { id: affiliateId } })
        if (!isExist) {
            return {
                status: false,
                isExist: false
            }
        }
        const deletedData = await Affiliate.destroy({ where: { id: affiliateId } })
        if (deletedData) {
            return {
                status: true,
                result: deletedData
            }
        }
        return {
            status: false
        }
    } catch (error) {
        console.log(error)
        return {
            status: false
        }
    }
}


//
exports.userDetails = async (userId) => {
    const result = await Users.findOne(
        {
            where: { id: userId },
            attributes: { exclude: ["password"] }
        })
    return result
}


exports.deleteAffiliateAssign = async (assignedAffilaiteId) => {


    const deletedClickAndPurchases = await ClickAndPurchases.destroy({
        where: { assignAffiliateId: assignedAffilaiteId }
    })

    const deletedAssigned = await AffiliateAssign.destroy({
        where: { id: assignedAffilaiteId }
    })

    if (deletedAssigned) {
        return true
    }

    return false


}

//update user status 
exports.updateUserStatus = async (userId, status) => {

    let updatedUserStatus
    if (status != undefined) {
        updatedUserStatus = await Users.update(
            { isActive: status },
            {
                where: {
                    id: userId
                }
            })
    }

    if (updatedUserStatus) {
        return {
            status: true
        }
    }
    return {
        status: false
    }
}
//update user status 
exports.updateCommission = async (userId, commision) => {

    let updatedUserStatus = await Users.update(
        { commisionByPercentage: commision },
        {
            where: {
                id: userId
            }
        })


    if (updatedUserStatus) {
        return {
            status: true
        }
    }
    return {
        status: false
    }
}


exports.assignedUsers = async (affiliateId, req) => {

    try {

        const page = parseInt(req.body.page) || 1;  // Default to page 1
        const limit = parseInt(req.body.limit) || 10;  // Default to 10 items per page
        const offset = (page - 1) * limit;
        const query = req.body.search || ""

        let result = await AffiliateAssign.findAndCountAll(

            {

                limit: limit,
                offset: offset,
                where: {
                    affiliateId: affiliateId
                },
                include: [{
                    model: Users,
                    attributes: { exclude: ['password'] },
                    where: {
                        role: 'customer',
                        [Op.or]: {
                            email: {
                                [Op.like]: `${query}%`,
                            },

                            city: {
                                [Op.like]: `${query}%`,
                            },
                            country: {
                                [Op.like]: `${query}%`,
                            }

                        },
                    }
                }]
            })


        if (AffiliateAssign) {
            return {
                status: true,
                result: result,
            }
        }

    } catch (error) {
        return {
            status: false,
            result: error
        }
    }

}

//update afffilite type
exports.updateAffiliateType = async (affiliateId, details) => {

    const result = await details.map(async (i) => {
        await AffiliateAssign.update(
            { type: i.type },
            {
                where: {
                    [Op.and]: [
                        { userId: i.userId },
                        { affiliateId: affiliateId }

                    ]
                }
            }
        )
    })



    if (result) {
        return {
            status: true
        }
    }
    return {
        status: false
    }
}

exports.bulkDeleteAffiliateAssign = async (details) => {

    const deletedAssigned = await details.map(async (i) => {
        console.log(i)
        const deletedClickAndPurchases = await ClickAndPurchases.destroy({
            where: { assignAffiliateId: i }
        })

        const deletedAssigned = await AffiliateAssign.destroy({
            where: { id: i }
        })
    })


    if (deletedAssigned) {
        return true
    }

    return false

}