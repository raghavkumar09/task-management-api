const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
} = require('../controllers/taskController');

router.post('/', protect, authorize('manager', 'admin'), createTask);
router.get('/', protect, authorize('manager', 'admin'), getAllTasks);
router.get('/:id', protect, getTaskById);
router.put('/:id', protect, authorize('manager', 'admin'), updateTask);
router.delete('/:id', protect, authorize('admin'), deleteTask);

module.exports = router;