const User = require("./../user/model");
const { sendOTP, verifyOTP, deleteOTP } = require('./../otp/controller');
const { hashData } = require('./../../util/hashData');

const resetPassword = async ({ email, otp, newPassword}) => {
    try{
        const validOTP = await verifyOTP({email, otp});
        if(!validOTP) throw Error('Invalid code passed. Check your inbox.')

        // update user record with new password
        if(newPassword.length < 8) throw Error('Too short password');
        const hashedPassword = await hashData(newPassword);
        await User.updateOne({email}, { password: hashedPassword });
        await deleteOTP(email);
        return
    }catch (e) {
        throw e;
    }
};

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

module.exports = { sendPasswordResetOTPEmail, resetPassword };