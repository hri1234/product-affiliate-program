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

module.exports = (sequelize, Sequelize) => {
    /**
     * @type {Model}
     */
    const ClickAndPurchases = sequelize.define("clickandpurchases", {
        userId: {
            type: Sequelize.INTEGER,
            references: {
                model: "users",
                key: 'id',
            },
        },
        assignAffiliateId: {
            type: Sequelize.INTEGER,
            references: {
                model: "affiliateAssign",
                key: 'id',
            },
        },
        type: {
            type: Sequelize.ENUM,
            values: ['clicks', 'purchases'],
            defaultValue:"clicks"

        },
        deviceId:{
            type:Sequelize.STRING,
            
        }
    });


    return ClickAndPurchases;
};


