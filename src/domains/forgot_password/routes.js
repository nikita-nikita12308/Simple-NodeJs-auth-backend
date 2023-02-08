const express = require('express');
const router = express.Router();
const { sendPasswordResetOTPEmail, resetPassword } = require("./controller");

router.post('/reset', async (req,res) => {
    try{

        let { email, otp, newPassword } = req.body;
        if(!(email && otp && newPassword)) throw Error("Empty credentials are not provided");
        await resetPassword({ email, otp, newPassword });
        res.status(200).json({email, passwordreset: true })

    }catch (e) {
        res.status(400).send(e.message);
    }
});

router.post("/", async (req, res) => {
    try{
        const { email } = req.body;
        if(!email) throw Error("Provide an email address");
        const createdPasswordReset = await sendPasswordResetOTPEmail(email);
        res.status(200).json(createdPasswordReset);
    }catch (e) {
        res.status(400).send(e.message);
    }
});


module.exports = router;