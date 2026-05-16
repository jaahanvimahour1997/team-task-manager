const Task = require('../models/Task');


// ---------------- CREATE TASK (ADMIN ONLY) ----------------
exports.createTask = async (req, res) => {
  try {
    const { title, description, project, assignedTo, priority, dueDate } = req.body;

    const task = await Task.create({
      title,
      description,
      project,
      assignedTo,
      priority,
      dueDate
    });

    res.status(201).json({
      message: 'Task created successfully',
      task
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ---------------- GET ALL TASKS ----------------
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate('project', 'title')
      .populate('assignedTo', 'name email');

    res.status(200).json(tasks);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ---------------- UPDATE TASK STATUS ----------------
exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).json({
      message: 'Task updated successfully',
      task
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ---------------- UPDATE TASK (ADMIN OR ASSIGNED USER) ----------------
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ---------------- DELETE TASK ----------------
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: 'Task deleted successfully'
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};