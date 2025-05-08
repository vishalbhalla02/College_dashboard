const Timetable = require("../../models/Other/timetable.model");

const getTimetable = async (req, res) => {
  try {
    const timetable = await Timetable.find(); // Get all timetables
    if (timetable.length > 0) {
      res.status(200).json(timetable);
    } else {
      res.status(200).json([]); // Send empty array
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const addTimetable = async (req, res) => {
  let { semester, branch, batch } = req.body; // Destructure batch

  try {
    let timetable = await Timetable.findOne({ semester, branch, batch }); // Include batch in query

    if (timetable) {
      await Timetable.findByIdAndUpdate(timetable._id, {
        semester,
        branch,
        batch,
        link: req.file.filename,
      });
      return res.json({
        success: true,
        message: "Timetable Updated!",
      });
    } else {
      await Timetable.create({
        semester,
        branch,
        batch,
        link: req.file.filename,
      });
      return res.json({
        success: true,
        message: "Timetable Added!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const deleteTimetable = async (req, res) => {
  try {
    let timetable = await Timetable.findByIdAndDelete(req.params.id);
    if (!timetable) {
      return res
        .status(400)
        .json({ success: false, message: "No Timetable Exists!" });
    }
    return res.json({
      success: true,
      message: "Timetable Deleted!",
    });
  } catch (error) {
    console.error(error.message);
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { getTimetable, addTimetable, deleteTimetable };
