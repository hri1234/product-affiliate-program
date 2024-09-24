const express = require("express");
const authRoutes = require("./auth.routes.js");
const affiliateRoutes = require("./affiliate.routes.js");
const adminRoutes = require("./admin.routes.js");
const clickAndPurchasesRoutes = require('./clicksAndPurchases.routes.js')
const overViewRoutes = require('./overview.routes.js')
const invoice = require('./invoice.routes.js')

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/affiliate", affiliateRoutes);
router.use("/admin",adminRoutes)
router.use('/click-and-purchases',clickAndPurchasesRoutes)
router.use('/overview',overViewRoutes)
router.use('/invoice',invoice)


module.exports = router;
 