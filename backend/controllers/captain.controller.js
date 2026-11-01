import captainModel from '../models/captain.model.js';
import {createCaptain} from '../services/captain.service.js';
import { validationResult } from 'express-validator';
import blacklistTokenModel from '../models/blacklistToken.model.js';

export const registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {fullname , email, password, vehicle} = req.body;
    //check if user already exists
    const existingCaptain = await captainModel.findOne({ email });
    if (existingCaptain) {
        return res.status(400).json({ message: 'Captain already exists' });
    }
    //hash password
    const hashedPassword = await captainModel.hashPassword(password);
    const captain = await createCaptain({ //from captain.service.js
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });

    const token = captain.generateAuthToken();
    res.status(201).json({ captain, token });
}

//login captain

export const loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const captain = await captainModel.findOne({ email }).select('+password');
    if (!captain) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = captain.generateAuthToken();
    res.cookie('token', token);
    res.json({ token, captain });
}


//Get Captain Profile
export const getCaptainProfile = async (req, res, next) => {
    res.status(200).json(req.captain); //data coming from auth middleware
};

//Logout Captain
export const logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    await blacklistTokenModel.create({ token });
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
};