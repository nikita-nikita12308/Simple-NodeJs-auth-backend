const express = require('express');
const router = express.Router();

// request new verification otp
router.post("/", async (req, res) => {
    try{
        const { email } = req.body
        if(!email) throw Error("An email is requirede");

    }catch (e) {

    }
});