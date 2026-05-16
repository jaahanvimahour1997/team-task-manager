const Project = require('../models/Project');

// ---------------- CREATE PROJECT (ADMIN ONLY) ----------------
exports.createProject = async (req, res) => {
  try {
    const { title, description, members } = req.body;

    const project = await Project.create({
      title,
      description,
      members,
      createdBy: req.user.id
    });

    res.status(201).json({
      message: 'Project created successfully',
      project
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ---------------- GET ALL PROJECTS ----------------
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate('members', 'name email role')
      .populate('createdBy', 'name email');

    res.status(200).json(projects);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ---------------- UPDATE PROJECT ----------------
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ---------------- DELETE PROJECT ----------------
exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};