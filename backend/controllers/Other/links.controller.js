// controllers/classroomController.js
const ClassroomLink = require("../../models/Other/links.model.js");

exports.addLink = async (req, res) => {
  try {
    const { subject, semester, link, faculty } = req.body;
    const newLink = new ClassroomLink({ subject, semester, link, faculty });
    await newLink.save();
    res.status(201).json(newLink);
  } catch (err) {
    res.status(500).json({ error: "Failed to add link" });
  }
};

exports.getAllLinks = async (req, res) => {
  try {
    const links = await ClassroomLink.find();
    res.json(links);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch links" });
  }
};

exports.getBySemester = async (req, res) => {
  try {
    const { semester } = req.params;
    const links = await ClassroomLink.find({ semester });
    res.json(links);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch links by semester" });
  }
};

exports.updateLink = async (req, res) => {
  try {
    const updated = await ClassroomLink.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update link" });
  }
};

exports.deleteLink = async (req, res) => {
  try {
    await ClassroomLink.findByIdAndDelete(req.params.id);
    res.json({ message: "Link deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete link" });
  }
};
