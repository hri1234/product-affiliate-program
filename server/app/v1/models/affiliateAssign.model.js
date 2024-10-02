/**
 * @typedef {import('sequelize').Sequelize} Sequelize
 * @typedef {import('sequelize').DataTypes} DataTypes
 * @typedef {import('sequelize').Model} Model
 */

/**
 * @param {Sequelize} sequelize
 * @param {typeof import('sequelize').DataTypes} DataTypes
 * @returns {Model}
 */

const bcrypt = require('bcrypt');
const { ENUM } = require('sequelize');
const { toDefaultValue } = require('sequelize/lib/utils');

module.exports = (sequelize, Sequelize) => {
    /**
     * @type {Model}
     */
    const AffiliateAssign = sequelize.define("affiliateAssign", {
        userId: {
            type: Sequelize.INTEGER,
            references: {
                model: "users",
                key: 'id',
            },
        },
        affiliateId: {
            type: Sequelize.INTEGER,
            references: {
                model: "affiliates",
                key: 'id',
            },
        },
        clicks: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        purchases: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        type: {
            type: Sequelize.ENUM,
            values: ['assigned', 'deAssigned'],
            defaultValue: "assigned"
        },
    });


    return AffiliateAssign;
};


