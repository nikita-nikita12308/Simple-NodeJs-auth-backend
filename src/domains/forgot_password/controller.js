const User = require("./../user/model");
const { sendOTP } = require('./../otp/controller');


const sendPasswordResetOTPEmail = async (email) => {
  try{
      // check if an account exists
      const existingUser = await User.findOne({ email });

      if(!existingUser) throw Error("You have no account.");
      if(!existingUser.verified) throw Error("Your account is not verified.");

      const otpDetails = {
          email,
          subject: "Password Reset",
          message: "Enter the code below to reset your password.",
          duration: 1
      };

      const createdOTP = await sendOTP(otpDetails);
      return createdOTP;


  }catch (e) {
      throw e;
  }
};

module.exports = { sendPasswordResetOTPEmail };