// models/ClassroomLink.js
const mongoose = require("mongoose");

const ClassroomLinkSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    semester: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    faculty: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ClassroomLink", ClassroomLinkSchema);
