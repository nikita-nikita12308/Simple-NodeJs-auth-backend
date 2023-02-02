const express = require('express');
const router = express.Router();

// request new verification OTP
router.post("/", async (req,res) => {
    try{
        const { email, subject, message, duration } = req.body;
    }catch (e) {

    }
});