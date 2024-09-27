const db = require("../models");
const Invoice = db.invoice;
const { Op } = require('sequelize');
exports.createInvoice = async (body) => {
    try {


        const result = await Invoice.create({ ...body })
        return {
            status: true,
            result: result
        }
    }

    catch (error) {
        console.log(error)
        return {
            status: false,
            result: error
        }
    }
}

exports.getInvoiceList = async (id, req) => {

    try {
        const page = parseInt(req.body.page) || 1;  // Default to page 1
        const limit = parseInt(req.body.limit) || 10;  // Default to 10 items per page
        const offset = (page - 1) * limit;
        const query = req.body.search || ""


        const result = await Invoice.findAndCountAll({
            limit: limit,
            offset: offset,
            where: {
                userId: id,
                [Op.or]: {
                    themeName: {
                        [Op.like]: `${query}%`,
                        // [Op.like]: {shortId:`${query}%`}
                    },
                    domain:{
                        [Op.like]:`${query}%`
                    },
                    transactionId:{
                        [Op.like]:`${query}%`
                    }
                }
            },
            order: [
                ['createdAt', 'DESC'],
            ],
            distinct: true
        })


        return {
            status: true,
            result: result,

        }
    }

    catch (error) {
        console.log(error)
        return {
            status: false,
            result: error
        }
    }

}


exports.updateStatus = async (id, status) => {
    try {

        const result = await Invoice.update(
            { status: status },
            {
                where: {
                    id: id,
                },
            },
        );

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
