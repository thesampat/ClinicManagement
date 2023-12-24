const Feedback = require('../Models/Feedback');

const createFeedback = async (req, res) => {
    try {
        const newFeedback = new Feedback(req.body);
        const savedFeedback = await newFeedback.save();
        console.log("controleer");
        res.status(201).json(savedFeedback);
    } catch (error) {
        res.status(500).json({ error: "Error creating feedback" });
    }
}
//kljfdghkjsdfjhkgvsdasjdsfhvxbgvds
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

module.exports = {
    createFeedback,
    getAllFeedback,
    getFeedbackById,
    deleteFeedback
};
