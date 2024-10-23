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
    const Invoice = sequelize.define("invoice", {
        userId: {
            type: Sequelize.INTEGER,
            references: {
                model: "users",
                key: 'id',
            },
        }
        ,
        themeName: {
            type: Sequelize.STRING,
            unique: false
        },
        domain: {
            type: Sequelize.STRING
        },
        commission: {
            type: Sequelize.INTEGER
        },
        paymentMethod: {
            type: Sequelize.STRING
        },
        transactionId: {
            type: Sequelize.STRING
        },
        invoiceId: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.ENUM,
            values: ['Pending', 'Paid', 'Failed'],
            defaultValue: "Pending"
        }, 
        shopifyUrl:{
            type:Sequelize.STRING
        }
    });


    return Invoice;
};


