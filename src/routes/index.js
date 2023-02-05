const express = require('express');
const router = express.Router();

const userRoutes = require('./../domains/user');
const OTPRoutes = require('./../domains/otp');
const EmailVereficationRoutes = require('./../domains/email-verification');

router.use('/user', userRoutes);
router.use('/otp', OTPRoutes);
router.use('/email-verification', EmailVereficationRoutes);


module.exports = router;