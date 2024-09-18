const express = require("express");
const controllers = require("../controllers/clicksAndPurchases.controller.js");
const router = express.Router();
const validations=require('../validations/clickPurchase.validation.js')

//add click and purchases
router.post('/add/:id',validations.addClickAndPurchases, controllers.addClickAndPurchases);
router.post('/list/:id',validations.getClickAndPurchasesList, controllers.getClickAndPurchasesList)

module.exports = router;

