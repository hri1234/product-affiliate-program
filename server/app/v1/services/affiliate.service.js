const shortid = require('shortid');
const db = require("../models");
const { Op } = require('sequelize')
const Affiliate = db.affiliate;
const AssignAffiliate = db.affiliateAssign
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
        details.shortUrl = `${host}/affiliate/${shortId}`
        const result = await Affiliate.create(details)
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
exports.redirectShortLink = async (req, res) => {
    try {
        const shortId = req.params.shortLinkId
        const result = await Affiliate.findOne({ where: { shortId: shortId } });
        const url = result?.link
        if (result) {
            return {
                status: true,
                result: url
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

//get affiliate services
exports.getAffiliate = async (req, res) => {
    try {

        const page = parseInt(req.body.page) || 1;  // Default to page 1
        const limit = parseInt(req.body.limit) || 10;  // Default to 10 items per page
        const offset = (page - 1) * limit;

        const result = await Affiliate.findAndCountAll({
            limit: limit,
            offset: offset,
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

//add assgin affiliate service
exports.addAssignAffiliate = async (id, details) => {
    try {
        const addedValue = await details.userId.map(async (i) => {
            return createdAssign = await AssignAffiliate.bulkCreate([{ affiliateId: id, userId: i }])

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

exports.getAffiliateById=async (id)=>{

    try {

        const result=await Affiliate.findByPk(id)
      if(result){

        return {
            status:true,
            result:result
        }


      }
    else{
        return {
            status :false,
         
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