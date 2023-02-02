const generateOTP = async () => {
    try{
        return (otp = `${Math.floor(1000 + Math.random() * 9000 )}`)
    }catch (e) {
        throw e;
    }
};

module.exports = generateOTP;