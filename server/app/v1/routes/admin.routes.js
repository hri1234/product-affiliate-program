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
router.post('/user-details/:id', authAdmin, controllers.userDetails)
router.delete('/affiliate/assign-delete/:id', controllers.deleteAffiliateAssign)
router.put('/user-status/:id', authAdmin, controllers.updateUserStatus) //update user status and commision as well
router.put('/commission/:id', authAdmin, controllers.updateCommission) //update user status and commision as well
router.post('/affiliate/assignedUsers/:id', authAdmin, controllers.assignedUsers)
router.put('/update-type/:id',authAdmin,controllers.updateAffiliateType) //update  affilaite type 
router.delete('/delete-assign',authAdmin,controllers.bulkDeleteAffiliateAssign)

module.exports = router;