const express = require('express');
const router = express.Router();

const userRoutes = require('./../domains/user');
const OTPRoutes = require('./../domains/otp');
const EmailVereficationRoutes = require('./../domains/email-verification');
const ForgotPasswordRoutes = require('./../domains/forgot_password');

router.use('/user', userRoutes);
router.use('/otp', OTPRoutes);
router.use('/email-verification', EmailVereficationRoutes);
router.use('/forgot_password', ForgotPasswordRoutes);


module.exports = router;