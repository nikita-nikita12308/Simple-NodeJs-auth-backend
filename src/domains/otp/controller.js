const OTP = require('./model');
const generateOTP = require('./../../util/generateOTP');

const sendOTP = async ({ email, subject, message, duration = 1 }) => {
  try{
      if(!(email && subject && message)){
          throw Error("Provide values for email, subject, message");
      }

      // clear any old record
      await OTP.deleteOne({ email });

      // generate pin
      const generatedOTP = await generateOTP();

      // send email

  }catch (e) {

  }
};