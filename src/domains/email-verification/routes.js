const express = require('express');
const router = express.Router();
const { sendVerificationOTPEmail, verifyUserEmail } = require('./controller');

//verify otp
router.post("/verify", async (req,res) => {
    try{
        let { email, otp } = req.body;

        if(!(email && otp)) throw Error("Empty otp details are not allowed");

        await verifyUserEmail({ email, otp });

        res.status(200).json({ email, verified: true});


    }catch (e) {
        res.status(400).send(e.message);
    }
});


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