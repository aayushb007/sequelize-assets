const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../auth/auth');
// User login
router.post('/login', userController.loginUser);
//User Register
router.post('/register', userController.registerUser);
// Change Password
router.post('/change-password',authMiddleware, userController.changePassword);
// reset password
router.post('/reset-password', userController.resetPassword);
module.exports = router;
