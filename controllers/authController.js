const User = require('../models/User');
const { generateToken } = require('../utils/jwtUtil');
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

// @desc Register a new user
// @route POST /api/auth/register
// @access Public
const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { username, email, password } = req.body;

    try {
        // Check if user exists
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create user
        user = new User({
            username,
            email,
            password,
        });

        user.password = await bcrypt.hash(password, 10);
        await user.save();

        // Send confirmation email
        if (process.env.SEND_CONFIRMATION_EMAIL === 'true') {
            sendConfirmationEmail(email, username);
        }


        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            roles: user.roles,
            token: generateToken(user._id)
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const sendConfirmationEmail = async (email, username) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Welcome to Task Manager!',
            text: `Dear ${username}, Thank you for registering in our task management application!`
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        })
    } catch (error) {
        console.error(error);
    }
}


// @desc Login user
// @route POST /api/auth/login
// @access Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.status(200).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                roles: user.roles,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc Logout user
// @route POST /api/auth/logout
// @access Private
const logoutUser = (req, res) => {
    res.json({ message: 'User logged out successfully' });

    // Token invalidation can be done on client side by deleting token

    // res.cookie('token', '', {
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: 'none',
    //     maxAge: 0
    // });

};

module.exports = { registerUser, loginUser, logoutUser };