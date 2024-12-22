const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require('../controllers/authController');
const { authRateLimit } = require('../middleware/rateLimitMiddleware');
const { body } = require('express-validator');


router.post('/register', authRateLimit,
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    , registerUser);
router.post('/login', authRateLimit, loginUser);
router.post('/logout', logoutUser);

module.exports = router;