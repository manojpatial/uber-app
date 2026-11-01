import express from 'express';
import { body } from 'express-validator';
import { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain } from '../controllers/captain.controller.js';
import { authCaptain } from '../middlewares/auth.middleware.js';


//set up router variable
const router = express.Router();

router.post('/register', [
    body('fullname.firstname').notEmpty().withMessage('Firstname is required').isLength({ min: 3 }).withMessage('Firstname must be at least 3 characters long'),
    body('fullname.lastname').optional().isLength({ min: 3 }).withMessage('Lastname must be at least 3 characters long'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email is invalid'),
    body('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').notEmpty().withMessage('Vehicle color is required'),
    body('vehicle.plate').notEmpty().withMessage('Vehicle plate is required').isLength({ min: 3 }).withMessage('Plate number must be at least 3 characters long'),
    body('vehicle.capacity').notEmpty().withMessage('Vehicle capacity is required').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').notEmpty().withMessage('Vehicle type is required').isIn(['car', 'bike', 'auto']).withMessage('Vehicle type must be either car, bike, or auto')
], registerCaptain);

//login route
router.post('/login', [
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email is invalid'),
    body('password').notEmpty().withMessage('Password is required')
], loginCaptain);

//Get Captain Profile route
router.get('/profile', authCaptain, getCaptainProfile);

//logout route
router.get('/logout', authCaptain, logoutCaptain);


//export the router
export default router;