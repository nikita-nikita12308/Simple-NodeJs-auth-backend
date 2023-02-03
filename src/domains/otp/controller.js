const OTP = require('./model');
const generateOTP = require('./../../util/generateOTP');
const sendEmail = require('./../../util/sendEmail');
const { hashData } = require('./../../util/hashData');
const { AUTH_EMAIL } = process.env;

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
      const mailOptions = {
          from: AUTH_EMAIL,
          to: email,
          subject,
          html: `<p>${message}</p>
                 <p style="color: tomato; font-size:25px; letter-spacing: 2px;"><b>${generatedOTP}</b></p>
                 <p>This code <b>expires in ${duration} hour(s)</b>.</p>`,
      };
      await sendEmail(mailOptions);

      // save OTP record
      const hashedOTP = await hashData(generatedOTP)
      const newOTP = await new OTP({
          email,
          otp: hashedOTP,
          createdAt: Date.now(),
          expiresAt: Date.now() + 3600000 * +duration,
      })

      const createdOTPRecord = await newOTP.save();
      return createdOTPRecord;

  }catch (e) {
      throw e;
  }
};

module.exports = { sendOTP };