const express = require('express');
const { loginAdmin, forgotPassword, logout, resetPassword, refreshToken } = require('../controllers/login.controller');
const validate = require('../middleware/validate');
const loginValidation = require('../validation/login.validation');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', validate(loginValidation.login), loginAdmin);
router.post('/forgotpassword', validate(loginValidation.forgotpassword), forgotPassword);
router.post('/resetpassword', validate(loginValidation.resetpassword), resetPassword);
router.post('/logout', auth, validate(loginValidation.logout), logout);
router.post('/refreshToken', auth, validate(loginValidation.logout), refreshToken);

module.exports = router;
