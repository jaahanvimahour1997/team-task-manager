const express = require('express');
const router = express.Router();

const {
  createTask,
  getTasks,
  updateTaskStatus,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

const protect = require('../middleware/authMiddleware');
const allowRoles = require('../middleware/roleMiddleware');


// CREATE TASK (ADMIN ONLY)
router.post('/', protect, allowRoles('admin'), createTask);

// GET ALL TASKS (LOGGED USERS)
router.get('/', protect, getTasks);

// UPDATE TASK STATUS (MEMBER OR ADMIN)
router.patch('/:id/status', protect, updateTaskStatus);

// UPDATE FULL TASK (ADMIN ONLY)
router.put('/:id', protect, allowRoles('admin'), updateTask);

// DELETE TASK (ADMIN ONLY)
router.delete('/:id', protect, allowRoles('admin'), deleteTask);

module.exports = router;