/*const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');*/

import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './db/db.js';
import userRoutes from './routes/user.routes.js';
import captainRoutes from './routes/captain.routes.js';
import bcrypt from 'bcryptjs';

dotenv.config();
//Declare express app
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
connectDB();


app.get('/', (req, res) => {
    res.send('Hello World');
})

//Set up routes
app.use('/users', userRoutes); //default route for user routes
app.use('/captains', captainRoutes); //default route for captain routes



//module.exports = app;

export default app;