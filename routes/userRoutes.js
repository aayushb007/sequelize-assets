const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../auth/auth');
// User login
router.post('/login', userController.loginUser);
router.post('/register', userController.registerUser);
router.post('/change-password',authMiddleware, userController.changePassword);
router.post('/reset-password', userController.resetPassword);
module.exports = router;
