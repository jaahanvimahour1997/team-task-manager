const Task = require('../models/Task');
const Project = require('../models/Project');

// ---------------- DASHBOARD STATS ----------------
exports.getDashboardStats = async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments();

    const completedTasks = await Task.countDocuments({
      status: 'Completed'
    });

    const pendingTasks = await Task.countDocuments({
      status: 'Todo'
    });

    const inProgressTasks = await Task.countDocuments({
      status: 'In Progress'
    });

    // Overdue tasks (dueDate < today AND not completed)
    const overdueTasks = await Task.countDocuments({
      dueDate: { $lt: new Date() },
      status: { $ne: 'Completed' }
    });

    const totalProjects = await Project.countDocuments();

    res.status(200).json({
      totalTasks,
      completedTasks,
      pendingTasks,
      inProgressTasks,
      overdueTasks,
      totalProjects
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};