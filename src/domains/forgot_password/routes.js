const express = require('express');
const router = express.Router();
const { sendPasswordResetOTPEmail } = require("./controller");

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