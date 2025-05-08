// const multer = require("multer");
// const path = require("path");

// const excelStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/excels/"); // Make sure this folder exists
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const uploadExcel = multer({
//   storage: excelStorage,
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = [".xlsx", ".xls"];
//     const ext = path.extname(file.originalname).toLowerCase();
//     if (allowedTypes.includes(ext)) {
//       cb(null, true);
//     } else {
//       cb(new Error("Only Excel files are allowed"));
//     }
//   },
// });

// module.exports = uploadExcel;
