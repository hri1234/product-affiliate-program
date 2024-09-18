
const { raw } = require("express");
const db = require("../models");
const Invoice = db.invoice;
const { Op } = require('sequelize')
const sequelize = require('sequelize')


exports.getOverviews = async (req, res, id) => {
    const { month, year } = req.body;
    const first_date = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0));
    const last_date = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999));

    // Helper to query the sum of commissions
    const sumCommission = async (statusCondition) => {
        return await Invoice.findOne({
            attributes: [[sequelize.fn("SUM", sequelize.col("commission")), 'sum']],
            where: {
                userId: id,
                ...statusCondition
            },
            raw: true
        });
    };

    const paid = await sumCommission({
        createdAt: { [Op.between]: [first_date, last_date] },
        status: 'Paid'
    });

    const pending = await sumCommission({ status: "Pending" });
    const total = await sumCommission({ status: "Paid" });

    return {
        paid: Number(paid?.sum || 0),
        pending: Number(pending?.sum || 0),
        total: Number(total?.sum || 0)
    };
};
