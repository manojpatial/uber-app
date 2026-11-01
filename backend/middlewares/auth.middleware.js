import userModel from '../models/user.model.js';
import captainModel from '../models/captain.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import blacklistTokenModel from '../models/blacklistToken.model.js';



//Get and decode tokan and find user in database and attach it to req.user
export const authUser = async (req, res, next) => {
    const tokan = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!tokan) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const isBlacklistedToken = await blacklistTokenModel.findOne({ token: tokan });
    if (isBlacklistedToken) {
        return res.status(401).json({ message: 'Token is blacklisted' });
    }

    try {
        const decoded = jwt.verify(tokan, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }

}

export const authCaptain = async (req, res, next) => {
    const tokan = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!tokan) {
        return res.status(401).json({ message: 'No token provided' });
    }
    const isBlacklistedToken = await blacklistTokenModel.findOne({ token: tokan });
    if (isBlacklistedToken) {
        return res.status(401).json({ message: 'Token is blacklisted' });
    }

    try {
        const decoded = jwt.verify(tokan, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id).select('-password');
        if (!captain) {
            return res.status(404).json({ message: 'Captain not found' });
        }
        req.captain = captain;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}
