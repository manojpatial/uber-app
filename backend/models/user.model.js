/*const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('dotenv');*/

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
    
dotenv.config();

const userSchema = new mongoose.Schema({

    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'Firstname must be at least 3 characters long']
        },
        lastname: {
            type: String,
            minlength: [3, 'Lastname must be at least 3 characters long']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be at least 5 characters long'],
        match: [/\S+@\S+\.\S+/, 'Email is invalid']
    },
    password: {
        type: String,
        required: true,
        select: false, // Exclude password from query results by default
    },
    socketId: {
        type: String,
        default: null
    }
}, { timestamps: true });


// Generate JWT token for the user
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

//compare password

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

// Hash password before saving the user
userSchema.statics.hashPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

const userModel = mongoose.model('user', userSchema);

//module.exports = userModel;
export default userModel;