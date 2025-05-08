const studentDetails = require("../../models/Students/details.model.js");
const facultyDetails = require("../../models/Faculty/details.model.js"); // Assuming you have this model

// Get student details
const getDetails = async (req, res) => {
  try {
    let user = await studentDetails.find(req.body);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "No Student Found" });
    }
    const data = {
      success: true,
      message: "Student Details Found!",
      user,
    };
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Add student details
const addDetails = async (req, res) => {
  try {
    let user = await studentDetails.findOne({
      enrollmentNo: req.body.enrollmentNo,
    });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Student With This Enrollment Already Exists",
      });
    }
    user = await studentDetails.create({
      ...req.body,
    });

    const data = {
      success: true,
      message: "Student Details Added!",
      user,
    };
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Update student details
const updateDetails = async (req, res) => {
  try {
    let user;
    if (req.file) {
      user = await studentDetails.findByIdAndUpdate(req.params.id, {
        ...req.body,
        profile: req.file.filename,
      });
    } else {
      user = await studentDetails.findByIdAndUpdate(req.params.id, req.body);
    }
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No Student Found",
      });
    }

    // If a new facultyId is provided, update the student's assigned faculty
    if (req.body.facultyId) {
      const faculty = await facultyDetails.findById(req.body.facultyId);
      if (faculty) {
        // Ensure the student is added to the faculty's list (only if not already there)
        if (!faculty.students.includes(user._id)) {
          faculty.students.push(user._id);
          await faculty.save();
        }
      } else {
        return res.status(400).json({
          success: false,
          message: "Faculty Not Found",
        });
      }
    }

    const data = {
      success: true,
      message: "Updated Successfully!",
    };
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Delete student details
const deleteDetails = async (req, res) => {
  let { id } = req.body;
  try {
    let user = await studentDetails.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No Student Found",
      });
    }

    // Remove the student from the assigned faculty's student list
    const faculty = await facultyDetails.findOne({ students: user._id });
    if (faculty) {
      // Remove student from the faculty's student list
      faculty.students.pull(user._id);
      await faculty.save();
    }

    const data = {
      success: true,
      message: "Deleted Successfully!",
    };
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get the count of students based on query criteria
const getCount = async (req, res) => {
  try {
    let user = await studentDetails.count(req.body);
    const data = {
      success: true,
      message: "Count Successful!",
      user,
    };
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};

module.exports = {
  getDetails,
  addDetails,
  updateDetails,
  deleteDetails,
  getCount,
};
