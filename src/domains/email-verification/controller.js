const USER = require("./../user/model");
const { sendOTP } = require("./../otp/controller");


const sendVerificationOTPEmail = async (email) => {
    try{
        // check if an account exists
        const existUser = await User.findOne({ email });
        if(!existUser) throw Error("There's no account for provided email");

        const otpDetails = {
            email,
            subject: "Email Verification",
            message:  "Verify your email with the code below.",
            duration: 1,
        };


    }catch (e) {

    }
};