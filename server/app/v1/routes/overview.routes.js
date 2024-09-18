const express = require("express");
const overviewControllers = require("../controllers/overview.controller");
const { authenticate } = require('../middleware/authentication.js')
const router = express.Router();

//add click and purchases
router.post('/get/:id', authenticate, overviewControllers.getOverviews);


module.exports = router;

