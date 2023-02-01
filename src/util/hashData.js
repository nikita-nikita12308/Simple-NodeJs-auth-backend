const  bcrypt = require('bcrypt');

const hashData = async (data, saltRounds = 10) => {
    try{
        const hashedData = await bcrypt.hash(data, saltRounds);
        return hashedData;
    }catch (e) {
        throw e;
    }
};

module.exports = { hashData };