const express = require("express");
const controllers = require("../controllers/auth.controller.js");
const router = express.Router();
const validation = require("../validations/auth.validation.js");
const { authenticate } = require('../middleware/authentication.js')

router.post('/login', validation.login, controllers.login);
router.post('/register', validation.register, controllers.register);
router.put('/updatePassword', validation.updatePassword, authenticate, controllers.updatePassword)
router.post('/forget-password', validation.forgotPassword, controllers.forgetPassword)
router.post('/reset-password/:id', validation.resetPassword, controllers.resetPassword)
router.post('/profile', authenticate, controllers.getProfile);
router.put('/profile-update', validation.updateProfile, authenticate, controllers.updateProfile);

module.exports = router;

