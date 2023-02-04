const express = require('express');
const router = express.Router();
const { sendOTP, verifyOTP } = require("./controller");


router.post("/verify" , async (req, res) => {
    try{
        let { email, otp } = req.body;

        const validOTP = await verifyOTP({ email, otp });
        res.status(200).json({ valid: validOTP });
    }catch (e) {
        res.status(400).send(e.message);
    }
});

// request new verification OTP
router.post("/", async (req,res) => {
    try{
        const { email, subject, message, duration } = req.body;

        const createdOTP = await sendOTP({
            email,
            subject,
            message,
            duration
        });

        res.status(200).json(createdOTP);

    }catch (e) {
        res.status(400).send(e.message);
    }
});

module.exports = router;