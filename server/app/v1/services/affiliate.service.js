const shortid = require('shortid');
const db = require("../models");
const { Op } = require('sequelize')
const Sequelize = require('sequelize');
const Affiliate = db.affiliate;
const AssignAffiliate = db.affiliateAssign
const ClickAndPurchases = db.ClickAndPurchases
const Users = db.users;
const jwt = require('jsonwebtoken');
const fs = require('fs')
const path = require('path')
//add affiliate 
exports.addAffiliate = async (req, res, shortId) => {
    try {
        const imageUrl = req.body.imageUrl

        const details = { ...req.body, imageUrl: imageUrl }
        const isAlreadyExist = await Affiliate.findOne({
            where: {
                [Op.and]:
                    [
                        { name: req.body.name },
                    ]
            }
        })
        if (isAlreadyExist) {
            return {
                status: false,
                isAlreadyExist: true
            }
        }
        details.shortId = shortId
        const host = await req.headers.host
        details.shortUrl = `${host}/${shortId}`
        const result = await Affiliate.create(details)
        const users = await Users.findAll({
            where: {
                [Op.not]: [
                    { role: 'admin' }
                ]
            }
        })
        const bulkData = [];
        for (const user of users) {
            bulkData.push({
                affiliateId: result.id,
                userId: user.id
            });
        }
        // Perform bulkCreate once with all data
        const createdAssign = await AssignAffiliate.bulkCreate(bulkData);
        if (result) {
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

//short link id generate
exports.shortLink = async (req, res, link) => {
    try {
        const urls = {};

        const shortId = shortid.generate();

        urls[shortId] = link;
        return shortId
    } catch (error) {
        console.log(error)
        return false
    }
}

// redirect short url link
exports.redirectShortLink = async (req, res, userId, assignAffiliateId, deviceId) => {
    try {
        const { shortLinkId } = req.params;
        // const isExistClickAndPurchase = await ClickAndPurchases.findOne({ where: { userId: userId, assignAffiliateId: assignAffiliateId, deviceId: deviceId } })


        // // Fetch affiliate details and handle if not found
        const affiliate = await Affiliate.findOne({ where: { shortId: shortLinkId } });
        // if (isExistClickAndPurchase) {
        //     return {
        //         status: false,
        //         isExistClickAndPurchase: true,
        //         result: affiliate.link

        //     }
        // }
        // if (!affiliate) {
        //     return { status: false, message: 'Affiliate not found' };
        // }

        // // Fetch assign affiliate details and handle if not found
        const assignAffiliate = await AssignAffiliate.findOne({ where: { userId, affiliateId: affiliate.id } });
        // if (!assignAffiliate) {
        //     return { status: false, message: 'AssignAffiliate details not found' };
        // }

        // // Log the click and increment the 'click' count in one step
        // await Promise.all([
        await ClickAndPurchases.create({ type: 'clicks', userId, assignAffiliateId: assignAffiliate.id, deviceId: deviceId }),

            await AssignAffiliate.update({ clicks: Sequelize.literal('clicks + 1') }, { where: { id: assignAffiliate.id } })
        // ]);

        return { status: true, result: affiliate.link };
    } catch (error) {
        console.error('Error in redirectShortLink:', error);
        return { status: false, message: 'Server error', error: error.message };
    }
};

//get affiliate services
exports.getAffiliate = async (req, res) => {
    try {

        const page = parseInt(req.body.page) || 1;  // Default to page 1
        const limit = parseInt(req.body.limit) || 10;  // Default to 10 items per page
        const offset = (page - 1) * limit;
        const query = req.body.search || ""

        console.log(query, "query")
        const result = await Affiliate.findAndCountAll({
            limit: limit,
            offset: offset,
            where: {
                [Op.or]: {
                    name: {
                        [Op.like]: `${query}%`,
                        // [Op.like]: {shortId:`${query}%`}
                    },
                    shortId: {
                        [Op.like]: `${query}%`
                    }
                }
            },
            order: [
                ['createdAt', 'DESC'],
            ],
            distinct: true
        });


        result?.rows.forEach(obj => {


            if (obj.dataValues.imageUrl !== null && obj.dataValues.imageUrl !== undefined) {

                const dir = path.join(__dirname, "..")
                const newpath = `${dir}/utils/images/${obj.dataValues.imageUrl}`

                if (fs.existsSync(`${newpath}`)) {

                    obj.dataValues.imageUrl = req.hostname + '/' + obj.dataValues.imageUrl

                }



            }

        });


        if (result) {
            return {
                status: true,
                result: result
            }
        } else {
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

//main functionality
//add assgin affiliate service

// exports.addAssignAffiliate = async (id, details) => {
//     const transaction = await db.sequelize.transaction();
//     try {

//         const addedValue = await Promise.all(details.details.map(async (i) => {
//             const result = await Users.update(
//                 { commisionByPercentage: i.commision },
//                 {
//                     where: { id: i.userId },
//                     transaction,
//                 }
//             );


//             if (result[0] === 0) {
//                 return false
//             }

//             return {
//                 affiliateId: id,
//                 userId: i.userId,
//             };
//         }));
//         if (!addedValue[0] == false) {
//             const createdAssign = await AssignAffiliate.bulkCreate(addedValue, { transaction });

//             await transaction.commit();

//             return {
//                 status: true,
//                 result: createdAssign,
//             };
//         }
//         await transaction.rollback()

//     } catch (error) {

//         await transaction.rollback();
//         console.log('Error occurred:', error);

//         return {
//             status: false,
//             result: error.message,
//         };
//     }
// };



//add assgin affiliate service
exports.addAssignAffiliate = async (id, details) => {
    try {
        const addedValue = await details.details.map(async (i) => {
            const result = await Users.update(
                { commisionByPercentage: i.commision },
                {
                    where: { id: i.userId },
                    // transaction,
                }
            );


            return createdAssign = await AssignAffiliate.bulkCreate([{ affiliateId: id, userId: i.userId }])

        })
        const result = await Promise.all(addedValue).then((i) => {
            return i
        })

        if (addedValue) {
            return {
                status: true,
                result: result
            }
        }
        return false
    } catch (error) {
        console.log(error)
        return {
            status: false,
            result: error
        }
    }

}

exports.updateAffiliate = async (id, body, req) => {

    try {

        const isExist = await Affiliate.findByPk(id)
        if (isExist) {
            const result = await Affiliate.update(
                {
                    ...body,
                    imageUrl: req.body.imageUrl
                },
                {
                    where: {
                        id: id
                    }
                }
            )
            if (result) {
                return {
                    status: true,
                    result: result
                }

            }



        }
        else {
            return {
                status: false,

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

exports.getAffiliateById = async (id) => {

    try {

        const result = await Affiliate.findByPk(id)
        if (result) {

            return {
                status: true,
                result: result
            }


        }
        else {
            return {
                status: false,

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