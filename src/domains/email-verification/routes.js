const express = require('express');
const router = express.Router();
const { sendVerificationOTPEmail } = require('./controller');


// request new verification otp
router.post("/", async (req, res) => {
    try{
        const { email } = req.body
        if(!email) throw Error("An email is required");

        const createdEmailVerificationOTP = await sendVerificationOTPEmail(email);

        res.status(200).json(createdEmailVerificationOTP);

    }catch (e) {
        res.status(400).send(e.message);
    }
});

module.exports = router;