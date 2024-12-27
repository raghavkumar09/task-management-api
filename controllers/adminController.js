const UserModel = require('../models/User');
const setRole = require('../utils/setRole');
const { generateToken } = require('../utils/jwtUtil');
const bcrypt = require('bcryptjs');

const adminLogin = async (req, res) => {
    // email = 'admin123@admin.com', password = 'admin@123'
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await UserModel.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.status(200).json({
                _id: user._id,
                username: user.username,
                email: user.email,
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

const setRoleOfUser = async (req, res) => {
    const { userId, role } = req.body;
    console.log(userId, role);
    const result = await setRole(userId, role);
    console.log(result);
    if (result) {
        res.status(200).json({ message: 'Role set successfully' });
    } else {
        res.status(500).json({ message: 'Failed to set role' });
    }
};

module.exports = {
    adminLogin,
    setRoleOfUser
};