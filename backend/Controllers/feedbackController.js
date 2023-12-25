const Feedback = require('../Models/Feedback');

const createFeedback = async (req, res) => {
    try {
        const newFeedback = new Feedback(req.body);
        const savedFeedback = await newFeedback.save();
        res.status(201).json(savedFeedback);
    } catch (error) {
        res.status(500).json({ error: "Error creating feedback" });
    }
}

const getAllFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.find();
        res.status(200).json(feedback);
    } catch (error) {
        res.status(500).json({ error: "Error fetching feedback" });
    }
}

const getFeedbackById = async (req, res) => {
    const { id } = req.params;
    try {
        const feedback = await Feedback.findById(id);
        if (!feedback) {
            return res.status(404).json({ error: "Feedback not found" });
        }
        res.status(200).json(feedback);
    } catch (error) {
        res.status(500).json({ error: "Error fetching feedback" });
    }
}

const deleteFeedback = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedFeedback = await Feedback.findByIdAndRemove(id);
        if (!deletedFeedback) {
            return res.status(404).json({ error: "Feedback not found" });
        }
        res.status(200).json({ message: "Feedback deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting feedback" });
    }
}
const updateFeedbackById = async (req, res) => {
    console.log("uuu")
    try {
        console.log("update")
      const updateFeedback = await Feedback.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updateFeedback) {
        return res.status(404).json({ message: "Feedback not found" });
      }
      res.json(updateFeedback);
    } catch (error) {
        console.error('Error updating feedback:', error);
      res.status(400).json({ message: error.message });
    }
  }
  
module.exports = {
    createFeedback,
    getAllFeedback,
    getFeedbackById,
    deleteFeedback,
    updateFeedbackById
};
