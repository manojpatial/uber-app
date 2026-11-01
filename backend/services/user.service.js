import userModel from '../models/user.model.js';


export const createUser = async ({
    firstname,
    lastname,
    email,
    password

}) => {
    if (!firstname || !email || !password) {
        throw new Error('Firstname, email, and password are required');
    }

    const user = new userModel({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    });

    return await user.save();
};