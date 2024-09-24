const express = require("express");
const controllers = require("../controllers/affiliate.controller.js");
const router = express.Router();
const validation = require("../validations/affiliate.validation.js");
const upload = require('../middleware/uploadMiddleware.js')

const multer = require("multer");
const storage = multer.memoryStorage(); // Save the file as a buffer
const uploads = multer({ storage: storage });



const { authenticate } = require('../middleware/authentication.js')

router.post('/add', authenticate, controllers.addAffiliate);
router.put('/updateAffiliate/:id',controllers.updateAffiliate)
router.post('/getAffiliateById/:id',controllers.getAffiliateById)
router.post("/upload", uploads.single("file"), controllers.fileUpload);
router.post('/list', authenticate, controllers.getAffiliate)
// router.get('/:id', controllers.redirectShortLink);
router.post('/assign-affiliate/add/:id',controllers.addAssignAffiliate)
// router.get('/assigned-affiliate/get',controllers) //get affiliate customer

module.exports = router;

