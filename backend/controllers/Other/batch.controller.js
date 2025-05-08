const Batch = require("../../models/Other/batch.model"); // Make sure to import the Batch model

// Controller to get all batches
const getBatch = async (req, res) => {
  try {
    const batches = await Batch.find();
    res.json({
      success: true,
      batches: batches,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve batches",
    });
  }
};

// Controller to add a new batch
const addBatch = async (req, res) => {
  try {
    const { batch } = req.body;

    // Ensure batch name is provided
    if (!batch) {
      return res.status(400).json({
        success: false,
        message: "Batch name is required",
      });
    }

    // Create new batch
    const newBatch = new Batch({
      batch,
    });

    await newBatch.save();
    res.json({
      success: true,
      message: "Batch added successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add batch",
    });
  }
};

// Controller to delete a batch by ID
const deleteBatch = async (req, res) => {
  try {
    const batchId = req.params.id;

    // Find and delete the batch
    const batch = await Batch.findByIdAndDelete(batchId);

    if (!batch) {
      return res.status(404).json({
        success: false,
        message: "Batch not found",
      });
    }

    res.json({
      success: true,
      message: "Batch deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete batch",
    });
  }
};

module.exports = {
  getBatch,
  addBatch,
  deleteBatch,
};
