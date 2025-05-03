// routes/classroomLinks.js

const express = require("express");
const router = express.Router();
const classroomController = require("../../controllers/Other/links.controller.js");

// Add link
router.post("/", classroomController.addLink);

// Get all links
router.get("/", classroomController.getAllLinks);

// Get links by semester
router.get("/semester/:semester", classroomController.getBySemester);

// Update link
router.put("/:id", classroomController.updateLink);

// Delete link
router.delete("/:id", classroomController.deleteLink);

module.exports = router;
