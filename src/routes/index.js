const express = require('express');
const router = express.Router();

const userRoutes = require('./../domains/user');
const OTPRoutes = require('./../domains/otp');

router.use('/user', userRoutes);
router.use('/otp', OTPRoutes);


module.exports = router;