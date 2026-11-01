//const userModel = require('../models/user.model');
import userModel from '../models/user.model.js';
import {createUser} from '../services/user.service.js';
import { validationResult } from 'express-validator';
import blacklistTokenModel from '../models/blacklistToken.model.js';

// Register a new user
export const registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
   
    
    const {fullname , email, password} = req.body;
    //check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await userModel.hashPassword(password);
   
    const user = await createUser({ //from user.service.js
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });
    const token = user.generateAuthToken();
    
    res.status(201).json({ user, token });
}

//login user

export const loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = user.generateAuthToken();
    res.cookie('token', token);
    res.status(200).json({ user, token });


}

//Get User Profile
export const getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user);// //data coming from auth middleware
};


//Logout user
export const logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    await blacklistTokenModel.create({ token });
    res.status(200).json({ message: 'Logged out successfully' });
};