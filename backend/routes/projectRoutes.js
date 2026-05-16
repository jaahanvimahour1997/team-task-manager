const express = require('express');
const router = express.Router();

const {
  createProject,
  getProjects,
  updateProject,
  deleteProject
} = require('../controllers/projectController');

const protect = require('../middleware/authMiddleware');
const allowRoles = require('../middleware/roleMiddleware');


// CREATE PROJECT (ONLY ADMIN)
router.post('/', protect, allowRoles('admin'), createProject);

// GET ALL PROJECTS (ANY LOGGED USER)
router.get('/', protect, getProjects);

// UPDATE PROJECT (ADMIN ONLY)
router.put('/:id', protect, allowRoles('admin'), updateProject);

// DELETE PROJECT (ADMIN ONLY)
router.delete('/:id', protect, allowRoles('admin'), deleteProject);

module.exports = router;