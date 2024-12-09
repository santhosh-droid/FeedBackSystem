const express = require('express');
const Feedback = require('../models/Feedback');
const router = express.Router();

// Create Feedback
router.post('/', async (req, res) => {
    try {
        const { user, rating, comment } = req.body;
        const feedback = new Feedback({ user, rating, comment });
        await feedback.save();
        res.status(201).json(feedback);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Approved Feedback and Average Rating
router.get('/', async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        const averageRating = feedbacks.reduce((acc, cur) => acc + cur.rating, 0) / feedbacks.length || 0;
        res.status(200).json({ feedbacks, averageRating });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Approve Feedback
router.put('/:id/approve', async (req, res) => {
    try {
        const feedback = await Feedback.findByIdAndUpdate(
            req.params.id,
            { approved: true },
            { new: true }
        );
        res.status(200).json(feedback);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete Feedback
router.delete('/:id', async (req, res) => {
    try {
        await Feedback.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Feedback deleted successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
