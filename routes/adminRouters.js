const express = require('express');
const router = express.Router();
const { adminLogin, setRoleOfUser } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/login', adminLogin);
router.post('/set-role', protect, authorize('admin'), setRoleOfUser);

module.exports = router;