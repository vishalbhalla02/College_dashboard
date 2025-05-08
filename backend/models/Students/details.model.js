const mongoose = require("mongoose");

const studentDetailsSchema = new mongoose.Schema(
  {
    enrollmentNo: {
      type: Number,
      required: true,
      unique: true, // Ensures no two students can have the same enrollment number
    },
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String, // Optional
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures no two students can have the same email
      // match: [
      //   /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      //   "Please enter a valid email",
      // ], // Email validation regex
    },
    phoneNumber: {
      type: Number,
      required: true,
      // match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"], // Phone number validation (example for Indian phone numbers)
    },
    semester: {
      type: Number,
      required: true,
      min: 1, // Minimum value is 1 (Semester 1)
      max: 8, // Maximum value is 8 (Assuming max 8 semesters)
    },
    branch: {
      type: String,
      required: true,
    },
    labGroup: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    batch: {
      type: String, // Batch as a string (e.g., "2021-2025")
      required: true, // Ensure that the batch field is always provided
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student Detail", studentDetailsSchema);
