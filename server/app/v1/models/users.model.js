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
    const Users = sequelize.define("users", {
        userId:{
            type:Sequelize.STRING
        },
        companyUrl:{
            type:Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
        },
        paypalAddress: {
            type: Sequelize.STRING
        },
        country: {
            type:  Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        companyName: {
            type: Sequelize.STRING
        },
        // companyNumber: {
        //     type: Sequelize.STRING,
        // },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        role: {
            type: Sequelize.STRING,
            defaultValue:"customer"
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            defaultValue:true
        }
    });

    // Hook to hash the password before saving
    Users.beforeCreate(async (user) => {
        if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }
    });

    return Users;
};
