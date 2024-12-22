const Task = require('../models/Task');

// @desc Create a new task
// @route POST /api/tasks
// @access Private (manager and admin)
const createTask = async (req, res) => {
    const { title, description, dueDate, priority, status, assignedTo } = req.body;

    try {
        const task = new Task({
            title,
            description,
            dueDate,
            priority,
            status,
            assignedTo,
            team: req.user.team
        });

        const createdTask = await task.save();
        res.status(201).json(createdTask);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc Get all tasks
// @route GET /api/tasks
// @access Private (user, manager and admin)
const getAllTasks = async (req, res) => {
    try {
        let filter = {};
        if (req.user.roles[0] !== 'admin') {
            filter = { team: req.user.team };
        }
        const tasks = await Task.find(filter).populate('assignedTo', 'username email');
        res.status(200).json(tasks);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc Get a task by id
// @route GET /api/tasks/:id
// @access Private (user, manager and admin)
const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate('assignedTo', 'username email');
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        if (req.user.roles[0] !== 'admin' && task.team !== req.user.team) {
            return res.status(403).json({ message: 'Not authorized, task not assigned to user team' });
        }
        res.status(200).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


// @desc Update a task
// @route PUT /api/tasks/:id
// @access Private (manager and admin)
const updateTask = async (req, res) => {
    const { title, description, dueDate, priority, status, assignedTo } = req.body;
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        if (req.user.roles[0] !== 'admin' && task.team !== req.user.team) {
            return res.status(403).json({ message: 'Not authorized, task not assigned to user team' });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.dueDate = dueDate || task.dueDate;
        task.priority = priority || task.priority;
        task.status = status || task.status;
        task.assignedTo = assignedTo || task.assignedTo;


        const updatedTask = await task.save();
        res.status(200).json(updatedTask);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc Delete a task
// @route DELETE /api/tasks/:id
// @access Private (manager and admin)
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (req.user.roles[0] !== 'admin' && task.team !== req.user.team) {
            return res.status(403).json({ message: 'Not authorized, task not assigned to user team' });
        }

        await Task.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Task deleted successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
}