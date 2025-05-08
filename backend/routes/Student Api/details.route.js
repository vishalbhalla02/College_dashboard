const express = require("express");
const router = express.Router();
const {
  getDetails,
  addDetails,
  updateDetails,
  deleteDetails,
  getCount,
} = require("../../controllers/Student/details.controller.js");
const upload = require("../../middlewares/multer.middleware.js");

router.post("/getDetails", getDetails);

router.post("/addDetails", addDetails);

router.put("/updateDetails/:id", updateDetails);

router.delete("/deleteDetails/:id", deleteDetails);

router.get("/count", getCount);

module.exports = router;
