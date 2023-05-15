const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const protect = require('../auth/protect');

//register
router.get('/register', accountController.register.get);
router.post('/register', accountController.register.post);

//login
router.get('/login', accountController.login.get);
router.post('/login', accountController.login.post);

//logout
router.get('/logout', accountController.logout);

//forgot password
router.get('/forgotPassword', accountController.forgotPassword.get);
router.post('/forgotPassword', accountController.forgotPassword.post);
router.get('/resetPassword/:token', accountController.forgotPassword.resetPassword.get);
router.post('/resetPassword/', accountController.forgotPassword.resetPassword.post);

//profile
router.get('/profile', protect.protectRoute, accountController.profile.get);
router.post('/profile', protect.protectRoute, accountController.profile.post);

module.exports = router;