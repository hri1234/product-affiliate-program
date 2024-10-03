const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//   host: dbConfig.HOST,
//   dialect: dbConfig.dialect,
//   operatorsAliases: false,

//   pool: {
//     max: dbConfig.pool.max,
//     min: dbConfig.pool.min,
//     acquire: dbConfig.pool.acquire,
//     idle: dbConfig.pool.idle
//   }
// });

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: 'mysql',
    port: dbConfig.PORT,
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false
    //   }
    // }
  }
);
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.users = require("./users.model.js")(sequelize, Sequelize);

db.affiliate = require('./affiliate.model.js')(sequelize, Sequelize)
db.affiliateAssign = require('./affiliateAssign.model.js')(sequelize, Sequelize)
db.ClickAndPurchases = require('./clicksAndPurchases.model.js')(sequelize, Sequelize)
db.invoice = require('./invoice.model.js')(sequelize, Sequelize)

db.users.hasMany(db.affiliateAssign);
db.affiliateAssign.belongsTo(db.users);

db.users.hasMany(db.invoice)
db.invoice.belongsTo(db.users)


db.affiliate.hasMany(db.ClickAndPurchases)
db.ClickAndPurchases.belongsTo(db.affiliate)

db.affiliate.hasMany(db.affiliateAssign)
db.affiliateAssign.belongsTo(db.affiliate)

db.users.hasMany(db.ClickAndPurchases)
db.ClickAndPurchases.belongsTo(db.users)


// Users.hasMany(sequelize.models.affiliateAssign, { foreignKey: 'userId' });
// AffiliateAssign.belongsTo(sequelize.models.users, { foreignKey: 'userId' });


module.exports = db;
