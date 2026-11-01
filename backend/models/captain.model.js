import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


const captainSchema = new mongoose.Schema({
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
    },
    status: {
        type: String,
        enum: ['available', 'unavailable'],
        default: 'unavailable' 
    },
    vehicle: {
        color: {
            type: String,
            required: true
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, 'Plate number must be at least 3 characters long']
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Capacity must be at least 1']
        },
        vehicleType: {
            type: String,
            enum: ['car', 'bike', 'auto'],
            required: true
        }
    },
    location: {
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        }
    }
}, { timestamps: true });


// Generate JWT token for the user
captainSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

captainSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}





//Export the model
const captainModel = mongoose.model('captain', captainSchema);
export default captainModel;