import express from 'express';
import { body } from 'express-validator';
import { registerUser, loginUser, getUserProfile, logoutUser } from '../controllers/user.controller.js';
import { authUser } from '../middlewares/auth.middleware.js';



const router = express.Router();

router.post('/register', [
    body('fullname.firstname').notEmpty().withMessage('Firstname is required').isLength({ min: 3 }).withMessage('Firstname must be at least 3 characters long'),
    body('fullname.lastname').optional().isLength({ min: 3 }).withMessage('Lastname must be at least 3 characters long'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email is invalid'),
    body('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], registerUser);

//login route
router.post('/login', [
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email is invalid'),
    body('password').notEmpty().withMessage('Password is required')
], loginUser);

//Get User Profile route
router.get('/profile', authUser, getUserProfile);

//logout route
router.get('/logout', authUser, logoutUser);

export default router;