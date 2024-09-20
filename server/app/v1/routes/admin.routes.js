const express = require("express");
const controllers = require("../controllers/admin.controller.js");
const router = express.Router();
const validation = require("../validations/auth.validation.js");
const { authAdmin } = require('../middleware/authentication.js')

router.post('/allUsers', authAdmin, controllers.allUsers);
router.post('/affiliate/not-assigned-customers-list/:id', controllers.notAssignedCustomers)
router.post('/affiliate/user/:id', controllers.userAffiliates)
router.post('/assigned-customers-list/:id', controllers.affiliateListAssign)
router.delete('/affiliate/:id', authAdmin, controllers.deleteAffiliate)
router.get('/user-details/:id', authAdmin, controllers.userDetails)

module.exports = router;