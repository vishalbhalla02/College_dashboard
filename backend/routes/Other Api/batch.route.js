const express = require("express");
const router = express.Router();
const {
  getBatch,
  addBatch,
  deleteBatch,
} = require("../../controllers/Other/batch.controller.js");

// Route to get all batches
router.get("/getBatch", getBatch);

// Route to add a new batch
router.post("/addBatch", addBatch);

// Route to delete a batch by its ID
router.delete("/deleteBatch/:id", deleteBatch);

module.exports = router;
