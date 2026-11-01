//const mongoose = require('mongoose');
import mongoose from 'mongoose';

function connectDB() {
    mongoose.connect(process.env.MONGO_URI
    ).then(() => console.log('MongoDB connected'))
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });
}

//module.exports = connectDB;

export default connectDB;