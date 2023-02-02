const User = require("./model");
const { hashData, verifyHashData } = require('./../../util/hashData');
const createToken = require('./../../util/createToken');

const authenticateUser = async (data) => {
    try{
        const { email, password } = data;

        const fetchedUser = await User.findOne({ email })

        if(!fetchedUser){
            throw Error("Invalid email entered");
        }

        const hashedPassword = await fetchedUser.password;
        const passwordMatch = await verifyHashData(password, hashedPassword);

        if(!passwordMatch) {
            throw Error("Invalid password entered");
        }

        // create user token
        const tokenData = { userId: fetchedUser._id, email};
        const token = await createToken(tokenData);

        fetchedUser.token = token;
        return fetchedUser

    }catch (e) {
        throw  e;
    }
};


const createNewUser = async (data) => {
    try{
        const { name, email, password } = data;

        //Checking if user already exists

        const existingUser = await User.findOne({ email })

        if(existingUser){
            throw Error("User already exists");
        }

        //hash password
        const hashedPassword = await hashData(password);
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });
        //save user
        const createdUser = await newUser.save();
        return createdUser;

    }catch (e) {
        throw  e;
    }
};

module.exports = { createNewUser, authenticateUser };