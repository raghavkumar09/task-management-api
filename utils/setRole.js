const UserModel = require('../models/User');

const setRole = async (userId, role) => {
    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            throw new Error('Please provide a valid user id');
        }
        user.role = role;
        await user.save();
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

module.exports = setRole;