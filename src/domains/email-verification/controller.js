const User = require("./../user/model");
const { sendOTP, verifyOTP, deleteOTP } = require("./../otp/controller");


const verifyUserEmail = async ({ email, otp }) => {
    try{
        const validOTP = await verifyOTP({ email, otp });
        if(!validOTP) throw Error("Invalid code passed. Check your inbox.");

        // update user record to show verified
        await User.updateOne({ email }, { verified: true });

        await deleteOTP(email);
        return;
    }catch (e) {
        throw e;
    }
}

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

        const createdOTP = await sendOTP(otpDetails)
        return createdOTP
    }catch (e) {
        throw e;
    }
};

module.exports = { sendVerificationOTPEmail, verifyUserEmail };