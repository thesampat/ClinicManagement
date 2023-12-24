const express = require('express');
const router = express.Router();
const feedbackController = require('../Controllers/feedbackController');
console.log("routes");

// Define the route for submitting feedback
router.post('/', feedbackController.createFeedback);
router.get('/', feedbackController.getAllFeedback);
router.get('/:id', feedbackController.getFeedbackById);
router.delete('/:id', feedbackController.deleteFeedback);

module.exports = router;
